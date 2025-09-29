import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Tile = styled.div`
  width: 17rem;
  height: 13rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;
const TileImg = styled.img`
  width: 100%;
  height: 10rem;

  object-fit: cover;
`;
const TileName = styled.h3`
  font-size: 12.46px;
  font-weight: 900;
  margin-top: 15px;
  margin-bottom: 0;
`;
const TilePrice = styled.p`
  font-weight: 600;
  margin-top: 3px;
  font-size: 13px;
`;

function BootCard({ image, name, price, id }) {
  const navigate = useNavigate();

  return (
    <Tile onClick={() => navigate(`/boots/${id}`)}>
      <TileImg src={`http://127.0.0.1:3000${image}`} />
      <TileName>{name}</TileName>
      <TilePrice>£{price}</TilePrice>
    </Tile>
  );
}

export default BootCard;
