// frontend/src/pages/Practice.js
import React, { useState } from "react";
import styled from "styled-components";
import HandDetection from "../components/HandDetection";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 30px;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const DetectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TargetLetter = styled.div`
  font-size: 5rem;
  font-weight: bold;
  margin: 20px 0;
  color: ${(props) => (props.correct ? "#4CAF50" : "#333")};
  transition: color 0.3s ease;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
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

const Practice = () => {
  const [targetLetter, setTargetLetter] = useState("A");
  const [isCorrect, setIsCorrect] = useState(false);

  // Generate a random letter
  const generateRandomLetter = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * letters.length);
    setTargetLetter(letters[randomIndex]);
    setIsCorrect(false);
  };

  // Handle detection results
  const handleDetection = (result) => {
    if (result.detected) {
      const detectedLetter = result.letter;
      setIsCorrect(detectedLetter === targetLetter);
    }
  };

  return (
    <Container>
      <Title>Practice ASL Signs</Title>
      <Description>
        Show the sign for the letter below using your hand. The system will
        detect your sign and provide feedback.
      </Description>

      <ButtonGroup>
        <Button onClick={generateRandomLetter}>New Random Letter</Button>
      </ButtonGroup>

      <TargetLetter correct={isCorrect}>{targetLetter}</TargetLetter>

      <DetectionContainer>
        <HandDetection onDetection={handleDetection} />
      </DetectionContainer>
    </Container>
  );
};

export default Practice;
