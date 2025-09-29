import styled from "styled-components";

export const MainDivList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.4rem;
`;

export const TopMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;

  @media (max-width: 700px) {
    width: 90%;
    flex-direction: column;
  }
`;

export const SelectDiv = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 4rem;
  border-radius: 3px;

  @media (max-width: 700px) {
    margin-top: 25px;
    margin-left: 2rem;
  }
`;

export const StyledSelect = styled.select`
  margin-left: 10px;
  border: none;
`;

export const StyledOption = styled.option`
  border-radius: 15px;
`;
