import React, { useState } from "react";
import styled from "styled-components";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Rating } from "@mui/material";
import { showSuccess, showError } from "../utils/alert";
import API from "../services/api"; 
import { submitFeedback } from "../api/feedback";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1600px;
  display: flex;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 0.3;
  height: fit-content;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
`;

const Right = styled.div`
  flex: 1;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.primary};
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const InfoItem = styled.p`
  margin: 10px 0;
  color: ${({ theme }) => theme.text_primary};
  font-size: 15px;
`;

const SocialLinks = styled.div`
  margin-top: 20px;
  a {
    color: ${({ theme }) => theme.primary};
    margin-right: 10px;
    text-decoration: none;
    font-weight: 500;
    display: flex;
    align-items: center;

    &:hover {
      color: ${({ theme }) => theme.text_secondary};
    }

    svg {
      margin-right: 8px;
      font-size: 20px;
    }
  }
`;

const RatingSection = styled.div`
  margin-top: 20px;
  text-align: center;
  color: ${({ theme }) => theme.primary};
`;

const RatingTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const RatingComponent = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 15px;
  font-family: inherit;
`;

const Textarea = styled.textarea`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 15px;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
`;

const Button = styled.button`
  padding: 12px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.text_primary};
  }
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      rating: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message, rating } = formData;

    if (!name || !email || !message || rating === 0) {
      showError("Missing Fields", "Please fill in all fields and provide a rating.");
      return;
    }

    const fitEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!fitEmailRegex.test(email)) {
      showError("Invalid Email", "Please enter a valid email address.");
      return;
    }
    const API_BASE_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api/contact/feedback"
      : "https://fitrack-aish.onrender.com/api/contact/feedback";
  
    try {
      console.log("Using API Base URL:", API_BASE_URL);
      const res = await fetch(`${API_BASE_URL}/contact/feedback`, 
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        showSuccess("Thank You!", data.message || "Your feedback has been submitted.");
        setFormData({ name: "", email: "", message: "", rating: 0 });
      } else {
        showError("Error", data.message || "Failed to submit feedback.");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      showError("Network Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>About FiTrack</Title>
          <InfoItem>
            FiTrack is an app designed to help users track their fitness
            progress, stay motivated, and reach their health goals by logging
            workouts, setting fitness targets, and reviewing progress over time.
          </InfoItem>

          <Title>Connect With Us</Title>
          <SocialLinks>
            <a
              href="https://www.linkedin.com/in/aishwarya-gupta-73251228b"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin /> LinkedIn
            </a>
            <a
              href="https://github.com/Aishwaryaa-17"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub /> GitHub
            </a>
          </SocialLinks>

          <RatingSection>
            <RatingTitle>Rate Us</RatingTitle>
            <RatingComponent>
              <Rating
                name="rating"
                value={formData.rating}
                onChange={handleRatingChange}
                max={5}
                size="large"
                precision={0.5}
              />
            </RatingComponent>
          </RatingSection>
        </Left>

        <Right>
          <Title>Send Feedback</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button type="submit">Submit</Button>
          </Form>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default ContactPage;
