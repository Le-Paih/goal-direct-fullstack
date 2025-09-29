import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
  margin-top: 100px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <Div>
      <h1>The page you are looking for could not be found</h1>
      <button onClick={() => navigate(-1)}>&larr; Go Back</button>
    </Div>
  );
}

export default PageNotFound;
