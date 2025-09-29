import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.7); /* light blur overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const Spinner = styled.div`
  border: 6px solid var(--color-grey-200);
  border-top: 6px solid var(--color-stone-900);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 0.9s linear infinite;
`;

function FullscreenSpinner() {
  return (
    <Overlay>
      <Spinner />
    </Overlay>
  );
}

export default FullscreenSpinner;
