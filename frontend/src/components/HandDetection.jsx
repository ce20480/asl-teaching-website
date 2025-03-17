// frontend/src/components/HandDetection.js
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import { detectSign } from "../services/api";

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Prediction = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 24px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

const HandDetection = ({ onDetection }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  // Colors for different fingers
  const colors = [
    [255, 0, 0], // Thumb - Blue
    [0, 255, 0], // Index - Green
    [0, 255, 255], // Middle - Yellow
    [0, 165, 255], // Ring - Orange
    [128, 0, 255], // Pinky - Purple
  ];

  // Connections between landmarks
  const connections = [
    // Thumb
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    // Index finger
    [0, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    // Middle finger
    [0, 9],
    [9, 10],
    [10, 11],
    [11, 12],
    // Ring finger
    [0, 13],
    [13, 14],
    [14, 15],
    [15, 16],
    // Pinky
    [0, 17],
    [17, 18],
    [18, 19],
    [19, 20],
    // Palm
    [0, 5],
    [5, 9],
    [9, 13],
    [13, 17],
  ];

  const drawLandmarks = (ctx, landmarks, width, height) => {
    if (!landmarks) return;

    // Draw points
    landmarks.forEach((point, i) => {
      const [x, y, z] = point;
      const px = x * width;
      const py = y * height;

      // Determine color based on which finger the landmark belongs to
      let color;
      if (i === 0) {
        color = [255, 255, 255]; // Wrist - white
      } else {
        const fingerIdx = Math.floor((i - 1) / 4);
        color = fingerIdx < colors.length ? colors[fingerIdx] : [200, 200, 200];
      }

      // Draw circle
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, 2 * Math.PI);
      ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      ctx.fill();

      // Draw landmark index and coordinates for key points
      if (i % 4 === 0) {
        ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        ctx.font = "10px Arial";
        ctx.fillText(
          `${i}: (${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})`,
          px + 10,
          py,
        );
      }
    });

    // Draw connections
    connections.forEach(([start, end]) => {
      const [startX, startY] = [
        landmarks[start][0] * width,
        landmarks[start][1] * height,
      ];
      const [endX, endY] = [
        landmarks[end][0] * width,
        landmarks[end][1] * height,
      ];

      // Determine color
      let color;
      if (start === 0 && end >= 5) {
        color = [255, 255, 255]; // Palm - white
      } else {
        const fingerIdx = end <= 4 ? 0 : Math.floor((end - 1) / 4);
        color = fingerIdx < colors.length ? colors[fingerIdx] : [200, 200, 200];
      }

      // Draw line
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  };

  const captureFrame = async () => {
    if (!isCapturing || !webcamRef.current || !canvasRef.current) return;

    const webcam = webcamRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Check if webcam is ready
    if (webcam.video.readyState !== 4) {
      requestAnimationFrame(captureFrame);
      return;
    }

    // Get video properties
    const videoWidth = webcam.video.videoWidth;
    const videoHeight = webcam.video.videoHeight;

    // Set canvas size to match video
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    try {
      // Capture image as base64
      const imageSrc = webcam.getScreenshot();
      if (!imageSrc) {
        requestAnimationFrame(captureFrame);
        return;
      }

      // Extract base64 data
      const imageData = imageSrc.split(",")[1];

      // Send to API
      const result = await detectSign(imageData);

      // Update prediction
      setPrediction(result);

      // Call callback if provided
      if (onDetection) {
        onDetection(result);
      }

      // Draw landmarks
      if (result.detected && result.landmarks) {
        drawLandmarks(ctx, result.landmarks, canvas.width, canvas.height);
      }

      setError(null);
    } catch (err) {
      console.error("Error detecting sign:", err);
      setError("Failed to detect sign");
    }

    // Continue capturing
    requestAnimationFrame(captureFrame);
  };

  // Start/stop capturing
  useEffect(() => {
    if (isCapturing) {
      requestAnimationFrame(captureFrame);
    }
  }, [isCapturing]);

  const toggleCapturing = () => {
    setIsCapturing((prev) => !prev);
  };

  return (
    <div>
      <Container>
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          width="100%"
          height="100%"
          mirrored={true}
        />
        <Canvas ref={canvasRef} />

        {prediction && prediction.detected && (
          <Prediction>
            <div>Letter: {prediction.letter}</div>
            <div>Confidence: {(prediction.confidence * 100).toFixed(1)}%</div>
          </Prediction>
        )}

        {error && (
          <Prediction style={{ backgroundColor: "rgba(255, 0, 0, 0.7)" }}>
            {error}
          </Prediction>
        )}
      </Container>

      <Button onClick={toggleCapturing}>
        {isCapturing ? "Stop Detection" : "Start Detection"}
      </Button>
    </div>
  );
};

export default HandDetection;
