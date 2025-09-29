import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BrandSelector = styled.div`
  display: flex;
  margin-left: 4rem;
  flex-direction: row;
  justify-content: center;
  width: 30rem;

  @media (max-width: 700px) {
    flex-wrap: wrap;
    width: 90%;
    margin-left: 2rem;
    padding-right: 2rem;
  }
`;

const BrandBtn = styled.p`
  background-color: white;
  font-weight: 600;
  font-size: 16px;

  margin: auto;
  cursor: pointer;

  &:hover {
    color: var(--color-red-500);
  }

  @media (max-width: 400px) {
    font-size: 11px;
    margin-top: 5px;
    padding: 7px 18px;

    &:nth-child(5) {
      margin-top: 15px;
    }
  }
`;

function BrandSelect() {
  const navigate = useNavigate();

  return (
    <BrandSelector>
      <BrandBtn onClick={() => navigate("/boots")}>All</BrandBtn>
      <BrandBtn onClick={() => navigate("/boots/adidas")}>Adidas</BrandBtn>
      <BrandBtn onClick={() => navigate("/boots/nike")}>Nike</BrandBtn>
      <BrandBtn onClick={() => navigate("/boots/puma")}>Puma</BrandBtn>
      <BrandBtn onClick={() => navigate("/boots/newbalance")}>
        New Balance
      </BrandBtn>
    </BrandSelector>
  );
}

export default BrandSelect;
