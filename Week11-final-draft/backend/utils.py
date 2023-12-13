import cv2
import numpy as np
import numpy as np
import matplotlib.pyplot as plt
import torch
from torch.nn.functional import softmax
from sklearn.preprocessing import LabelEncoder
import pandas as pd
import os
import tensorflow as tf
import cv2


face_cascade = cv2.CascadeClassifier(cv2.samples.findFile(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'))

def pre_process_image(image_bytes, target_size=(48, 48)):
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    if len(faces) > 0:
        x, y, w, h = faces[0]
        face = img[y:y+h, x:x+w]
        face_resized = cv2.resize(face, target_size)

        print("Data type before conversion:", face_resized.dtype)

        if face_resized.dtype != np.uint8:
            face_resized = face_resized.astype(np.uint8)

        face_normalized = face_resized.astype('float32') / 255.0

        return (face_normalized, (x, y, w, h))
    else:
        return (None, None)
    

df = pd.read_pickle('./model/artemis_df.pkl')
NOISE_DIM = 128
label_encoder = LabelEncoder()
encoded_labels = label_encoder.fit_transform(df['emotion'])

labels_mapping = {
    0: "happy",
    1: "angry",
    2: "surprised",
    3: "neutral",
    4: "disgusted",
    5: "happy",
    6: "fearful",
    7: "sad",
    8: "neutral"
}

def load_and_generate_images_with_specific_label(model_folder, num_examples, noise_dim, label, label_encoder):
    # Load the saved generator model
    folder_path = './model/'
    generator_path = os.path.join(folder_path, model_folder)
    generator = tf.keras.models.load_model(generator_path)

    # Generate random noise
    noise = tf.random.normal([num_examples, noise_dim])
    label_idx = label_encoder.transform([label])[0]
    labels = np.full(num_examples, label_idx)

    generated_images = generator([noise, labels], training=False)

    # Rescale images to [0, 1] range
    generated_images = 0.5 * generated_images + 0.5

    return generated_images


def group_duplicate_classes(labels_mapping):
    grouped_classes = {}
    for encoded_label, class_name in labels_mapping.items():
        if class_name not in grouped_classes:
            grouped_classes[class_name] = [encoded_label]
        else:
            grouped_classes[class_name].append(encoded_label)
    return grouped_classes


def save_generated_images(generated_images, folder_name='static/generated_images'):
    if not os.path.exists(folder_name):
        os.makedirs(folder_name)

    saved_images_paths = []
    for i, image in enumerate(generated_images):
        normalized_image = (image * 255).astype(np.uint8)
        file_name = f"generated_image_{i}.png"
        file_path = os.path.join(folder_name, file_name)
        cv2.imwrite(file_path, cv2.cvtColor(normalized_image, cv2.COLOR_RGB2BGR))
        saved_images_paths.append(file_path)
    return saved_images_paths

def plot_generated_images_with_predictions(model_folder, artemis_model, num_examples, noise_dim, class_name, label_encoder, labels_mapping):
    # Load and generate images with a specific label
    generated_images = load_and_generate_images_with_specific_label(model_folder, num_examples, noise_dim, class_name, label_encoder)

    # Prepare images for prediction
    generated_images = generated_images.numpy()
    generated_images_tensor = torch.from_numpy(generated_images).permute(0, 3, 1, 2).cuda()

    # Predict labels using the artemis_model
    predicted_classes = artemis_model(generated_images_tensor)
    pred_probs = softmax(predicted_classes, dim=1).detach().cpu().numpy()


    # Decode predicted labels
    decoded_predictions = [labels_mapping[predicted_class.item()] for predicted_class in torch.argmax(predicted_classes, dim=1)]

    # Group duplicate class names with their corresponding encoded labels
    grouped_classes = group_duplicate_classes(labels_mapping)

    # Calculate the combined probabilities for the specified class_name
    combined_probs = np.sum(pred_probs[:, grouped_classes[class_name]], axis=1)

    # Sort images and probabilities based on the combined_probs
    sorted_indices = np.argsort(combined_probs)[::-1]
    sorted_images = generated_images[sorted_indices][:3]  # Select the top 3 images
    sorted_pred_probs = combined_probs[sorted_indices][:3]  # Select the top 3 probabilities

    # save the generated images
    save_generated_images(sorted_images)
    saved_images_path = save_generated_images(sorted_images)
    
    return saved_images_path