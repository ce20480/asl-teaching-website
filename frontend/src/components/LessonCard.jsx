// frontend/src/components/LessonCard.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 300px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h3`
  margin-top: 0;
  color: #333;
`;

const Description = styled.p`
  color: #666;
`;

const Level = styled.span`
  display: inline-block;
  background-color: #e0f7fa;
  color: #00838f;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  background-color: #4caf50;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const LessonCard = ({ lesson }) => {
  return (
    <Card>
      <Level>{lesson.level}</Level>
      <Title>{lesson.title}</Title>
      <Description>{lesson.description}</Description>
      <StyledLink to={`/lessons/${lesson.id}`}>Start Lesson</StyledLink>
    </Card>
  );
};

export default LessonCard;
