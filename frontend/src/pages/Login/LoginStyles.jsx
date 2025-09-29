import styled from "styled-components";
import { Link } from "react-router-dom";

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: #f8f8f8;
  padding: 1rem;
`;

export const LoginCard = styled.div`
  margin-top: 4.5rem;
  background: white;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-left: 5px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  label {
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  &:disabled {
    background: #f0f0f0;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: black;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 0.5rem;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SubText = styled.p`
  font-size: 0.85rem;
  text-align: center;
  margin-top: 1rem;
`;

export const LinkText = styled(Link)`
  color: black;
  font-weight: bold;
  text-decoration: underline;
`;

export const TestCred = styled.p`
  padding-left: 10px;
  margin-top: 5px;
  font-size: 10px;
  font-style: italic;
  font-weight: 500;
`;
