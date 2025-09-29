import styled from "styled-components";

export const MainDiv = styled.div`
  margin: 8rem 4rem;
  display: grid;
  grid-template-columns: 50% 50%;

  @media (max-width: 950px) {
    margin: 7rem 3rem;
    display: flex;
    flex-direction: column;
  }
`;

export const LeftDiv = styled.div``;

export const Img = styled.img`
  align-items: center;
  justify-content: center;
  height: 26em;
  object-fit: cover;

  @media (min-width: 300px) and (max-width: 350px) {
    width: 15rem;
    height: 15em;
    object-fit: cover;
  }
  @media (min-width: 351px) and (max-width: 400px) {
    width: 17rem;
    height: 19em;
    object-fit: cover;
  }
  @media (min-width: 401px) and (max-width: 450px) {
    width: 20rem;
    height: 19em;
    object-fit: cover;
  }
  @media (min-width: 451px) and (max-width: 500px) {
    width: 22rem;
    height: 21em;
    object-fit: cover;
  }
  @media (min-width: 501px) and (max-width: 550px) {
    width: 24rem;
    height: 23em;
    object-fit: cover;
  }
`;

export const SliderWrapper = styled.div`
  width: 26rem;
  margin: 0 auto;

  .slick-prev:before,
  .slick-next:before {
    color: var(--color-red-600);
  }

  @media (max-width: 550px) {
    width: 100%;

    .slick-prev:before,
    .slick-next:before {
      display: none;
    }
  }
`;

export const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 6rem;

  @media (max-width: 950px) {
    margin-left: 0;
    margin-top: 2rem;
  }
`;

export const KitName = styled.h1`
  font-size: 26px;
  font-weight: 900;
  margin-bottom: 0;
`;

export const ColorWay = styled.h4`
  margin-top: 10px;
  color: #767676;
  font-size: 13px;
  font-weight: 500;
`;

export const Price = styled.p`
  font-weight: 800;
  font-size: 18px;
  margin-top: 10px;
`;

export const SizeDiv = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  width: 75%;

  @media (max-width: 950px) {
    width: 100%;
    grid-template-columns: auto auto auto;
  }
`;

export const SelectText = styled.h3`
  font-size: 18px;
  font-weight: 700;
`;

export const ATCBTN = styled.button`
  margin-top: 2rem;
  margin-bottom: 0;
  padding: 10px 5px;
  width: 75%;

  border: none;
  border-radius: 5px;
  background-color: black;
  color: white;
  font-weight: 500;
  font-size: 18px;
  transition: all 0.5s;

  &:disabled {
    background-color: #737373;
    cursor: not-allowed;
  }

  @media (max-width: 950px) {
    width: 100%;
  }
`;

export const KlarnaDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
`;

export const KlIcon = styled.img`
  width: 55px;
`;

export const KlTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

export const KlText = styled.p`
  margin-top: 15px;
  font-size: 13px;
  margin-bottom: 5px;
  color: #202020;
`;

export const KlText2 = styled.p`
  margin-top: 0px;
  font-size: 13px;
  color: #202020;
`;
