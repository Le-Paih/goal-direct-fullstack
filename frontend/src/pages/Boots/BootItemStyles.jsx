import styled from "styled-components";

export const MainDiv = styled.div`
  margin: 7rem 4rem;
  display: grid;
  grid-template-columns: 60% 40%;

  @media (max-width: 950px) {
    margin: 7rem 3rem;
    display: flex;
    flex-direction: column;
  }
`;

export const LeftDiv = styled.div`
  .slick-prev:before,
  .slick-next:before {
    color: var(--color-red-600);
  }

  @media (max-width: 950px) {
    width: 100%;
    margin-right: 2rem;

    .slick-prev:before,
    .slick-next:before {
      display: none;
    }
  }
`;

export const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 4rem;

  @media (max-width: 950px) {
    margin-left: 0;
    margin-top: 2rem;
  }
`;

export const Img = styled.img`
  /* width: auto;
  height: auto;
  object-fit: contain; */
  object-position: center;
  width: 43rem;
  height: 22.5em;
  object-fit: cover;

  @media (min-width: 300px) and (max-width: 350px) {
    width: 15rem;
    height: 7em;
    object-fit: cover;
  }
  @media (min-width: 351px) and (max-width: 400px) {
    width: 18rem;
    height: 8em;
    object-fit: cover;
  }
  @media (min-width: 401px) and (max-width: 450px) {
    width: 20rem;
    height: 9em;
    object-fit: cover;
  }
  @media (min-width: 451px) and (max-width: 500px) {
    width: 23rem;
    height: 10em;
    object-fit: cover;
  }
  @media (min-width: 501px) and (max-width: 550px) {
    width: 27rem;
    height: 11em;
    object-fit: cover;
  }
  @media (min-width: 551px) and (max-width: 600px) {
    width: 30rem;
    height: 13em;
    object-fit: cover;
  }
  @media (min-width: 601px) and (max-width: 650px) {
    width: 34rem;
    height: 14em;
    object-fit: cover;
  }
  @media (min-width: 651px) and (max-width: 700px) {
    width: 37rem;
    height: 16em;
    object-fit: cover;
  }
  @media (min-width: 701px) and (max-width: 750px) {
    width: 41rem;
    height: 17em;
    object-fit: cover;
  }
  @media (min-width: 751px) and (max-width: 800px) {
    width: 44rem;
    height: 18em;
    object-fit: cover;
  }
  @media (min-width: 850px) and (max-width: 900px) {
    width: 48rem;
    height: 19em;
    object-fit: cover;
  }
  @media (min-width: 901px) and (max-width: 950px) {
    width: 50rem;
    height: 20em;
    object-fit: cover;
  }
  @media (min-width: 951px) and (max-width: 1050px) {
    width: 34rem;
    height: 17em;
    object-fit: cover;
  }
  @media (min-width: 1051px) and (max-width: 1120px) {
    width: 36rem;
    height: 19em;
    object-fit: cover;
  }
  @media (min-width: 1121px) and (max-width: 1140px) {
    width: 38rem;
    height: 20em;
    object-fit: cover;
  }
  @media (min-width: 1141px) and (max-width: 1160px) {
    width: 39rem;
    height: 21em;
    object-fit: cover;
  }
  @media (min-width: 1161px) and (max-width: 1180px) {
    width: 40rem;
    height: 21em;
    object-fit: cover;
  }
  @media (min-width: 1181px) and (max-width: 1200px) {
    width: 41rem;
    height: 21em;
    object-fit: cover;
  }
  @media (min-width: 1201px) and (max-width: 1220px) {
    width: 42rem;
    height: 22em;
    object-fit: cover;
  }
`;

export const SizeDiv = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;

  @media (max-width: 550px) {
    grid-template-columns: auto auto auto auto;
    max-width: 100%;
  }
`;

export const BootName = styled.h1`
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

export const SelectText = styled.h3`
  font-size: 18px;
  font-weight: 700;
`;

export const ATCBTN = styled.button`
  margin-top: 2rem;
  margin-bottom: 0;
  padding: 10px 5px;
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

  @media (max-width: 550px) {
    width: 100%;
  }
`;

export const SecondDiv = styled.div`
  margin: auto 4rem;
  margin-top: -7rem;
  margin-bottom: 4rem;
  display: grid;
  grid-template-columns: 60% 40%;

  @media (max-width: 699px) {
    margin: 1rem 1rem;
    display: flex;
    margin-top: -6rem;
    flex-direction: column;
  }
  @media (min-width: 700px) and (max-width: 950px) {
    margin: 2rem 2rem;
    margin-top: -6rem;
    display: flex;
    flex-direction: column;
  }
`;

export const DesTitle = styled.h1`
  padding-left: 1rem;
  font-weight: 700;
  margin-bottom: 0;
  font-size: 25px;
  /* font-style: normal; */
`;

export const DesDiv = styled.div`
  /* padding: 1rem; */
  margin-right: 1rem;
  width: 100%;
`;

export const Description = styled.p`
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 13px;
  font-weight: 400;

  line-height: 19px;
`;

export const AccDiv = styled.div`
  margin-left: 4rem;

  @media (max-width: 950px) {
    margin-left: 1rem;
    width: 94%;
  }
`;

export const NotFound = styled.div`
  padding-top: 100px;
  padding-bottom: 100px;
`;
