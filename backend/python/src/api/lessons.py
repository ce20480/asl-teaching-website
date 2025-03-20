# backend/api/lessons.py
from flask import Blueprint, jsonify, request

lessons_bp = Blueprint("lessons", __name__)

# Sample lesson data (in a real app, this would come from a database)
LESSONS = [
    {
        "id": 1,
        "title": "Basic Alphabet: A-E",
        "description": "Learn the ASL signs for letters A through E",
        "level": "Beginner",
        "signs": ["A", "B", "C", "D", "E"],
    },
    {
        "id": 2,
        "title": "Basic Alphabet: F-J",
        "description": "Learn the ASL signs for letters F through J",
        "level": "Beginner",
        "signs": ["F", "G", "H", "I", "J"],
    },
]


@lessons_bp.route("/", methods=["GET"])
def get_lessons():
    return jsonify(LESSONS)


@lessons_bp.route("/<int:lesson_id>", methods=["GET"])
def get_lesson(lesson_id):
    lesson = next((l for l in LESSONS if l["id"] == lesson_id), None)
    if not lesson:
        return jsonify({"error": "Lesson not found"}), 404
    return jsonify(lesson)
