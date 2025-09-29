import { clearCart } from "../../slice/cartSlice";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  text-align: center;
  padding: 2rem;
`;

const SuccessTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-stone-900);
`;

const SuccessMessage = styled.p`
  font-size: 1rem;
  color: var(--color-grey-700);
  max-width: 30rem;
  line-height: 1.5;
`;

const BackButton = styled.button`
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-stone-900);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-stone-700);
  }
`;

function Success() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <SuccessWrapper>
      <SuccessTitle>Thank you for your order!</SuccessTitle>
      <SuccessMessage>
        Your purchase has been completed. <br />
        <em>(Demo only — no actual payment processed)</em>
      </SuccessMessage>
      <BackButton onClick={() => (window.location.href = "/")}>
        Back to Homepage
      </BackButton>
    </SuccessWrapper>
  );
}

export default Success;
