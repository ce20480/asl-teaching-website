# backend/app.py
from api.detection import detection_bp
from api.lessons import lessons_bp
from api.users import users_bp
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Register blueprints
app.register_blueprint(detection_bp, url_prefix="/api/detection")
app.register_blueprint(lessons_bp, url_prefix="/api/lessons")
app.register_blueprint(users_bp, url_prefix="/api/users")


@app.route("/")
def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
