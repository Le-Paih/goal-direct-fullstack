import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SlideDiv = styled.div`
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
  max-width: 400px;
  height: 16em;
  margin: 3rem 1rem;
  text-align: center;
  cursor: pointer;
`;

const SlideImg = styled.img`
  width: 100%;
  height: 8.5em;
  object-fit: cover;
`;

const Name = styled.h2`
  padding: auto;
  margin: 5px;
  font-weight: 800;
  font-size: 15px;
  height: 40px;
`;

const StyledPrice = styled.p`
  font-size: 25px;
  font-weight: 700;
  color: black;
`;

function Product(props) {
  const navigate = useNavigate();

  return (
    <>
      {props.popular ? (
        <SlideDiv onClick={() => navigate(`/boots/${props.id}`)}>
          <SlideImg src={`http://127.0.0.1:3000${props.img}`} />
          <Name>{props.name}</Name>
          <StyledPrice>£{props.price}</StyledPrice>
        </SlideDiv>
      ) : null}
    </>
  );
}

export default Product;
