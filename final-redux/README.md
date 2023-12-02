# [VAHA - Visual Artwork For Human Affections](https://github.com/zxxwxyyy/VAHA/) Demo Page

## Description
A react project demos VAHA - an innovative model designed to explore the intersection of creativity, human emotions, and artificial intelligence to revolutionize the way we understand and express our emotions.

## Features

- **Webcam Image Capture:** Allows users to take photos using their webcam.
- **Upload Image:** User may also upload images for using the model. 
- **Emotion Detection:** Analyzes captured/uploaded images to detect emotions.
- **Image Generation:** Generates images based on the detected emotion.
- **Responsive UI:** A user-friendly interface that is responsive across various devices.

## Built With

- **FrontEnd**
    - **React** - Web framework for building the user interface.
    - **Redux** - State management to manage application state
- **BackEnd** 
    - **Flask** - Backend framework to handle requests and serve the model.
    - **Tensorflow** - Use for emotion detection and image generation.
    - **Pytorch** - Use `artemis` pretrained model to filter top 3 generated images that correspond to the emotion. 

## Frontend Overview

The frontend part is built using React and Redux. It provides a dynamic and responsive user interface. Key components included are: 

- **WebcamCapture.js**: This component is responsible for handling capture images or uploaded images with the help of custom hooks. It uses `useRef` to manage webcam interations and Redux's `useDispatch` and `useSelector` for state management. 
- **GenerateImage.js**: After an emotion is detected, this component handles the generation of images based on the detected emotion. It leverages custom hooks for generating and re-generating images.
- **Custom Hooks**:
    - `useCapture`: Handles capturing image from the webcam, and also the process of sending the images to the backend for emotion predictions. 
    - `useHandleImageUpload`: Handles upload images from user's device and sending to the backend for emotion predictions. 
    - `useHandleGeneration`: Handles the logic of requesting image generation from the backend, managing progress and update redux state. 
    - `useDataURItoBlob`: Converts Data URI to Blob format, an essential process for sending images to the backend in the correct format.

## Backend Overview

Using Python's Flask app to serve as the backend. It handles image processing, emotion detection and image generation. More information about the model [Here](https://github.com/zxxwxyyy/VAHA/)

**Routes**: 
- `./predict`: Receives images for emotion prediction, returns predicted emotion in json format
- `./generated_images`: Recieves predicted emotion label and generates correspond artwork based on it. Return the generated images' url in json format. 

