# backend/api/detection.py
import os

from flask import Blueprint, jsonify, request
from backend.python.src.services.ml.asl_service import ASLService

# Get model path from environment variable or use default
model_path = os.environ.get("ASL_MODEL_PATH", "models/asl_model.pt")

# Initialize service with model path
asl_service = ASLService(model_path)

detection_bp = Blueprint("detection", __name__)


@detection_bp.route("/detect", methods=["POST"])
def detect_sign():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    if "image" not in request.json:
        return jsonify({"error": "No image provided"}), 400

    image_data = request.json["image"]
    result = asl_service.process_image(image_data)

    if "error" in result:
        return jsonify(result), 400

    return jsonify(result)
