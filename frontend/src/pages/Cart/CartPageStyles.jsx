import styled from "styled-components";

export const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 4rem auto 0 auto;

  @media (max-width: 950px) {
    grid-template-columns: 1fr;
    margin-top: 4rem;
  }
`;

export const CartLeft = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: auto;
  max-width: 600px;
  width: 100%;
  margin-top: 1rem;
  margin-left: 2rem;

  @media (max-width: 950px) {
    margin: 0;
    margin-right: 2rem;
    width: 90%;
    padding: 1.5rem;
    order: 2;
  }

  @media (max-width: 600px) {
    max-width: 100%;
    padding-right: 2rem;
    padding: 1rem;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const CartRight = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: 13rem;
  max-width: 300px;
  width: 100%;
  margin-top: 1rem;
  margin-left: 10rem;

  @media (max-width: 950px) {
    margin: 0;
    width: 90%;
    padding: 1.5rem;
    order: 1;
  }

  @media (max-width: 600px) {
    max-width: 100%;
    padding: 1rem;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const CRInt = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const CheckoutBtn = styled.button`
  background-color: black;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  /* margin-top: 10rem; */
`;

export const MainDiv = styled.div`
  min-height: auto;
  width: 100%;
  display: grid;
  grid-template-columns: 65% 35%;
  background-color: var(--color-stone-100);
  padding: 2rem;
  gap: 2rem;

  @media (max-width: 950px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

export const CartCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: auto;
  max-width: 600px;
  width: 100%;
  margin-top: 6rem;
  margin-left: 2rem;

  @media (max-width: 950px) {
    margin: 0;
    max-width: 90%;
    padding: 1.5rem;
  }

  @media (max-width: 600px) {
    max-width: 100%;
    padding: 1rem;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const SummaryCard = styled.div`
  background-color: #fff;
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: fit-content;
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 950px) {
    margin-top: 1rem;
  }
`;

export const Products = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ProductCard = styled.div`
  margin-top: 3rem;
  /* width: 400px; */
  display: grid;
  grid-template-columns: 30% 70%;
  border-bottom: 1.5px solid var(--color-stone-200);
  padding-bottom: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 40% 60%;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
`;

export const ProdLeft = styled.div`
  display: flex;
`;

export const Img = styled.img`
  object-position: center;
  margin: auto;
  width: ${({ $type }) =>
    $type === "Boot" ? "10rem" : $type === "Kit" ? "8rem" : "12rem"};
  height: ${({ $type }) =>
    $type === "Boot" ? "5.3rem" : $type === "Kit" ? "8rem" : "6rem"};

  object-fit: cover;

  @media (max-width: 600px) {
    width: 7rem;
    height: auto;
  }
`;

export const ProdRight = styled.div`
  margin-left: 10px;
  display: grid;
  grid-template-columns: 60% 20% 20%;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    justify-items: center;
    row-gap: 0.5rem;
  }
`;

export const SizeP = styled.span`
  color: var(--color-stone-800);
  font-weight: bold;
`;

export const RmvBtn = styled.button`
  background-color: transparent;
  border: none;
  color: oklch(54.6% 0.245 262.881);
`;

export const KlarnaDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  width: 16rem;
`;

export const KlIcon = styled.img`
  width: 70px;
`;

export const KlTextDiv = styled.div`
  display: flex;
  margin-left: 1rem;
`;

export const KlText = styled.p`
  font-size: 12px;
  color: #202020;
`;
