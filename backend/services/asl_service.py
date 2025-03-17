# backend/services/asl_service.py
import base64
import os
import string

import cv2
import numpy as np
from asl.data.preprocessor import ASLPreprocessor

# Import from your ASL package
from asl.detection.hand_detector import HandDetector
from asl.models.coords_model import CoordsModel
from asl.pipeline import ASLPipeline


class ASLService:
    def __init__(self, model_path):
        # Check if model exists
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model not found at {model_path}")

        # Initialize components
        self.detector = HandDetector(min_detection_confidence=0.7)
        self.preprocessor = ASLPreprocessor(normalize=True, flatten=True)
        self.model = CoordsModel.load(model_path)
        self.pipeline = ASLPipeline(self.detector, self.preprocessor, self.model)

        # Create letter mapping
        self.letter_mapping = self._create_letter_mapping()

    def _create_letter_mapping(self):
        # Map class indices to letters
        mapping = {0: "0"}  # Class 0 is blank/neutral
        for i, letter in enumerate(string.ascii_uppercase):
            mapping[i + 1] = letter
        return mapping

    def process_image(self, image_data):
        """Process base64 encoded image and return prediction"""
        try:
            # Decode base64 image
            image_bytes = base64.b64decode(image_data)
            image_array = np.frombuffer(image_bytes, dtype=np.uint8)
            image = cv2.imdecode(image_array, flags=cv2.IMREAD_COLOR)

            if image is None:
                return {"error": "Invalid image data"}

            # Process image through pipeline
            prediction, landmarks, _ = self.pipeline.process_image(image)

            if prediction is None:
                return {"detected": False}

            # Get letter from class index
            class_idx = prediction["class_index"]
            letter = self.letter_mapping.get(class_idx, f"Unknown ({class_idx})")

            # Convert landmarks to list for JSON serialization
            landmarks_list = None
            if landmarks is not None:
                landmarks_list = landmarks.tolist()

            return {
                "detected": True,
                "letter": letter,
                "confidence": float(prediction["confidence"]),
                "landmarks": landmarks_list,
            }
        except Exception as e:
            return {"error": str(e)}
