import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import toast from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SizeSquare from "./SizeSquare";
import {
  ATCBTN,
  AccDiv,
  BootName,
  ColorWay,
  DesDiv,
  DesTitle,
  Description,
  Img,
  LeftDiv,
  MainDiv,
  NotFound,
  Price,
  RightDiv,
  SecondDiv,
  SelectText,
  SizeDiv,
} from "./BootItemStyles";
import styled from "styled-components";

import Accordion2 from "../../ui/Accordion2";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../slice/cartSlice";
import { AuthContext } from "../../context/authContext";
import FullscreenSpinner from "../../ui/Spinner";

const KlarnaDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
`;

const KlIcon = styled.img`
  width: 55px;
`;

const KlTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const KlText = styled.p`
  margin-top: 15px;
  font-size: 13px;
  margin-bottom: 5px;
  color: #202020;
`;
const KlText2 = styled.p`
  margin-top: 0px;
  font-size: 13px;
  color: #202020;
`;

function BootItem() {
  const { bootId } = useParams();
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(null);
  const slider = React.useRef(null);
  const [boot, setBoot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${api}/${bootId}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setBoot(data.data.boot);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [api, bootId]);

  if (loading) return <FullscreenSpinner />;
  if (error) return <p>Error: {error}</p>;

  function handleSizeClick(size) {
    setSelectedSize(size === selectedSize ? null : size);
  }

  if (!boot) {
    return <NotFound>Boot not found</NotFound>;
  }

  const isSizeSelected = selectedSize !== null;

  const sizeSquares = boot.sizes.map((sizeObj) => (
    <SizeSquare
      key={sizeObj.size}
      size={sizeObj.size}
      available={sizeObj.quantity > 0}
      selected={sizeObj.size === selectedSize}
      onClick={() => handleSizeClick(sizeObj.size)}
    >
      {sizeObj.size}
    </SizeSquare>
  ));

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 250,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleAddToCart = () => {
    const payload = {
      itemId: boot._id,
      itemType: "Boot",
      size: selectedSize,
      quantity: 1,
    };
    toast.success("Item added to cart");
    dispatch(addItemToCart(payload));
  };

  return (
    <>
      <MainDiv>
        <LeftDiv>
          <Slider ref={slider} {...sliderSettings}>
            {Object.values(boot.image).map((image, index) => (
              <div key={index}>
                <Img
                  src={`https://goal-direct-fullstack-4.onrender.com${image}`}
                  alt={`Boot ${index + 1}`}
                />
              </div>
            ))}
          </Slider>
        </LeftDiv>
        <RightDiv>
          <BootName>{boot.name}</BootName>
          <ColorWay>{boot.colorway}</ColorWay>
          <Price>£{boot.price}.00</Price>
          <SelectText>Select a size (UK)</SelectText>
          <SizeDiv>{sizeSquares}</SizeDiv>
          {user ? (
            <ATCBTN disabled={!isSizeSelected} onClick={handleAddToCart}>
              Add to cart
            </ATCBTN>
          ) : (
            <ATCBTN disabled={true}>Login to add to cart</ATCBTN>
          )}

          <KlarnaDiv>
            <KlIcon src="/svg/klarna-svgrepo-com.svg" />
            <KlTextDiv>
              <KlText>Make 3 payments of £{(boot.price / 3).toFixed(2)}</KlText>
              <KlText2>18+, T&C apply, Credit subject to status</KlText2>
            </KlTextDiv>
          </KlarnaDiv>
        </RightDiv>
      </MainDiv>
      <SecondDiv>
        <DesDiv>
          <DesTitle>{boot.name}</DesTitle>
          <Description
            dangerouslySetInnerHTML={{ __html: boot.description }}
          ></Description>
        </DesDiv>
        <AccDiv>
          <Accordion2 />
        </AccDiv>
      </SecondDiv>
    </>
  );
}

export default BootItem;
