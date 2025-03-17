// frontend/src/pages/Lessons.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getLessons } from "../services/api";
import LessonCard from "../components/LessonCard";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const LessonsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #f44336;
`;

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getLessons();
        setLessons(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching lessons:", err);
        setError("Failed to load lessons. Please try again later.");
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  if (loading) {
    return <LoadingMessage>Loading lessons...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <Title>ASL Lessons</Title>
      <LessonsGrid>
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </LessonsGrid>
    </Container>
  );
};

export default Lessons;
