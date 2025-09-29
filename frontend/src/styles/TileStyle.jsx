import styled from "styled-components";

export const Tile = styled.div`
  width: 17rem;
  height: 13rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  /* align-items: center; */
`;

export const TileImg = styled.img`
  width: 100%;
  height: 10rem;
  /* height: 8.5em; */
  object-fit: cover;
`;

export const TileName = styled.h3`
  font-size: 13px;
  font-weight: 900;
  margin-top: 15px;
  margin-bottom: 0;
`;

export const TilePrice = styled.p`
  font-weight: 600;
  margin-top: 3px;
  font-size: 13px;
`;
