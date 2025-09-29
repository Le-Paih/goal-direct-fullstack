import styled from "styled-components";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

const TopHome = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;

  @media (max-width: 700px) {
    grid-template-column: row;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const ImageCard = styled.div`
  height: 550px;
  width: 500px;
  margin: 2rem;
  background-image: url(/pictures/Pred-Rot.jpg);

  background-size: cover;
  background-position: center;

  @media (max-width: 700px) {
    height: 500px;
    width: 350px;
    object-fit: fill;
  }
`;
const ImageCard2 = styled.div`
  height: 550px;
  width: 500px;
  background-image: url(/pictures/France.jpg);
  margin: 2rem;
  background-size: cover;

  @media (max-width: 700px) {
    height: 500px;
    width: 350px;
    object-fit: fill;
  }
`;

const ImageTextBoot = styled.div`
  margin-top: 350px;
  text-align: right;
  padding-right: 2rem;

  @media (max-width: 700px) {
    margin-top: 250px;
    text-align: left;
    padding-left: 2rem;
  }
`;
const ImageTextKit = styled.div`
  margin-top: 350px;
  text-align: left;
  padding-left: 2rem;

  @media (max-width: 700px) {
    margin-top: 250px;
    text-align: left;
    padding-left: 2rem;
  }
`;

const TextPhoto = styled.h1`
  font-weight: 700;
  color: var(--color-grey-50);
`;

const TextPara = styled.p`
  font-weight: 300;
  color: var(--color-grey-50);
`;

function HomePageTop() {
  const navigate = useNavigate();

  return (
    <TopHome>
      <ImageCard>
        <ImageTextBoot>
          <TextPhoto>Adidas Predator</TextPhoto>
          <TextPara>Shop latest football boots</TextPara>
          <Button
            size="small"
            variation="primary"
            onClick={() => navigate("/boots")}
          >
            Shop Now
          </Button>
        </ImageTextBoot>
      </ImageCard>
      <ImageCard2>
        <ImageTextKit>
          <TextPhoto>France Home Kit</TextPhoto>
          <TextPara>Shop latest football kits</TextPara>
          <Button
            size="small"
            variation="primary"
            onClick={() => navigate("/kits")}
          >
            Shop Now
          </Button>
        </ImageTextKit>
      </ImageCard2>
    </TopHome>
  );
}

export default HomePageTop;
