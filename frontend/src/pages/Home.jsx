// frontend/src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Hero = styled.div`
  background-color: #f5f5f5;
  padding: 60px 20px;
  border-radius: 10px;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto 30px;
`;

const Button = styled(Link)`
  display: inline-block;
  background-color: #4caf50;
  color: white;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 4px;
  font-size: 1.1rem;
  margin: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const FeatureSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
`;

const Feature = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 350px;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FeatureTitle = styled.h3`
  color: #333;
`;

const FeatureDescription = styled.p`
  color: #666;
`;

const Home = () => {
  return (
    <Container>
      <Hero>
        <Title>Learn American Sign Language</Title>
        <Subtitle>
          Master ASL with our interactive lessons and real-time feedback using
          advanced hand tracking technology.
        </Subtitle>
        <Button to="/lessons">Browse Lessons</Button>
        <Button to="/practice">Practice Now</Button>
      </Hero>

      <FeatureSection>
        <Feature>
          <FeatureTitle>Interactive Learning</FeatureTitle>
          <FeatureDescription>
            Learn ASL through interactive lessons with step-by-step instructions
            and visual guides.
          </FeatureDescription>
        </Feature>

        <Feature>
          <FeatureTitle>Real-time Feedback</FeatureTitle>
          <FeatureDescription>
            Get instant feedback on your signs using our advanced hand tracking
            technology.
          </FeatureDescription>
        </Feature>

        <Feature>
          <FeatureTitle>Track Your Progress</FeatureTitle>
          <FeatureDescription>
            Monitor your learning journey and see your improvement over time.
          </FeatureDescription>
        </Feature>
      </FeatureSection>
    </Container>
  );
};

export default Home;
