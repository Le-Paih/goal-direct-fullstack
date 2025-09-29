import styled from "styled-components";

export const GridDiv = styled.div`
  margin-top: 2rem;
  margin: 1rem 4rem auto 4rem;
  display: grid;
  grid-template-rows: auto auto auto auto;
  grid-template-columns: auto auto auto auto;
  row-gap: 3rem;
  column-gap: 0.98rem;

  @media (max-width: 550px) {
    grid-template-columns: auto;
  }

  @media (max-width: 800px) and (min-width: 551px) {
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    /* margin-bottom: 10rem; */
  }
  @media (max-width: 1000px) and (min-width: 801px) {
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto auto;
    /* margin-bottom: 10rem; */
  }
`;
