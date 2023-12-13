from flask import Flask, request, jsonify, send_from_directory
import tensorflow as tf
from utils import pre_process_image, plot_generated_images_with_predictions
import numpy as np
from flask_cors import CORS
import torch
from sklearn.preprocessing import LabelEncoder
import pandas as pd
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
model = tf.keras.models.load_model('./model/Emotion_Detector/emotion_detector.h5')
artemis_path = './model/Artemis_model/best_model.pt'
artemis_model = torch.load(artemis_path, map_location = torch.device('cuda'))
artemis_model.eval()

NOISE_DIM = 128

df = pd.read_pickle('./model/artemis_df.pkl')

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

@app.route('/predict', methods=['POST'])
def predict():
    try:
        image = request.files['image']
        processed_image, face_coords = pre_process_image(image.read())
        face_coords = tuple(int(coord) for coord in face_coords)

        if processed_image is not None:
            processed_image = np.expand_dims(processed_image, axis=0)
            prediction = model.predict(processed_image)
            emo_class_names = np.array(['angry', 'disgusted', 'fearful', 'happy', 'neutral', 'sad', 'surprised'])
            emotion_label = emo_class_names[np.argmax(prediction)]
            print(emotion_label, face_coords)
            return jsonify(emotion=emotion_label, face_coords = face_coords)
        else:
            return jsonify(error="No face detected"), 400
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify(error=str(e)), 500
    
@app.route('/generated_images', methods=["POST"])
def generated_images():
    try:
        data = request.json
        emotion_label = data['emotion']
        num_examples = 3

        image_paths = plot_generated_images_with_predictions(
            'Best_Generator',
            artemis_model,
            num_examples,
            NOISE_DIM,
            emotion_label,
            label_encoder,
            labels_mapping
        )
        print("image path", image_paths)
        base_url = request.url_root.rstrip('/')
        image_urls = [f'{base_url}/static/generated_images/{os.path.basename(path)}' for path in image_paths]
        print("url",image_urls)
        return jsonify(images=image_urls)
    except Exception as e:
        app.logger.error(f"Error during image generation: {str(e)}")
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True)
