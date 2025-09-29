import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SizeSquareKit from "./SizeSquareKit";
import toast from "react-hot-toast";
import Accordion2 from "../../ui/Accordion2";
import {
  ATCBTN,
  ColorWay,
  Img,
  KitName,
  KlarnaDiv,
  KlIcon,
  KlText,
  KlText2,
  KlTextDiv,
  LeftDiv,
  MainDiv,
  Price,
  RightDiv,
  SelectText,
  SizeDiv,
  SliderWrapper,
} from "./KitItemStyle";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../slice/cartSlice";
import { AuthContext } from "../../context/authContext";
import FullscreenSpinner from "../../ui/Spinner";

export const SecondDiv = styled.div`
  margin: auto 4rem;
  margin-top: -5rem;
  margin-bottom: 4rem;
  display: grid;
  grid-template-columns: 50% 50%;

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
  /* letter-spacing: 0.1px; */
  line-height: 19px;
`;

export const AccDiv = styled.div`
  margin-left: 4rem;

  @media (max-width: 950px) {
    margin-left: 1rem;
    width: 94%;
  }
`;

function KitItem() {
  const { kitId } = useParams();
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(null);
  const [kit, setKit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/api/v1/kits/${kitId}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setKit(data.data.kit);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [kitId]);

  if (loading) return <FullscreenSpinner />;
  if (error) return <p>Error: {error}</p>;

  function handleSizeClick(size) {
    setSelectedSize(size === selectedSize ? null : size);
  }

  if (!kit) {
    return <div>Kit not found</div>;
  }

  const isSizeSelected = selectedSize !== null;

  const sizeSquares = kit.sizes.map((sizeObj) => (
    <SizeSquareKit
      key={sizeObj.size}
      size={sizeObj.size}
      available={sizeObj.quantity > 0}
      selected={sizeObj.size === selectedSize}
      onClick={() => handleSizeClick(sizeObj.size)}
    ></SizeSquareKit>
  ));

  const handleAddToCart = () => {
    const payload = {
      itemId: kit._id,
      itemType: "Kit",
      size: selectedSize,
      quantity: 1,
    };
    toast.success("Item added to cart");
    dispatch(addItemToCart(payload));
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
  };

  return (
    <>
      <MainDiv>
        <LeftDiv>
          <SliderWrapper>
            <Slider {...sliderSettings}>
              {Object.values(kit.image).map((image, index) => (
                <div key={index}>
                  <Img
                    src={`http://127.0.0.1:3000${image}`}
                    alt={`Kit ${index + 1}`}
                  />
                </div>
              ))}
            </Slider>
          </SliderWrapper>
        </LeftDiv>
        <RightDiv>
          <KitName>{kit.name}</KitName>
          <ColorWay>{kit.colorway}</ColorWay>
          <Price>Price: £{kit.price}.00</Price>
          <SelectText>Select a size</SelectText>
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
              <KlText>Make 3 payments of £{(kit.price / 3).toFixed(2)}</KlText>
              <KlText2>18+, T&C apply, Credit subject to status</KlText2>
            </KlTextDiv>
          </KlarnaDiv>
        </RightDiv>
      </MainDiv>
      <SecondDiv>
        <DesDiv>
          <DesTitle>{kit.name}</DesTitle>
          <Description
            dangerouslySetInnerHTML={{ __html: kit.description }}
          ></Description>
        </DesDiv>
        <AccDiv>
          <Accordion2 />
        </AccDiv>
      </SecondDiv>
    </>
  );
}

export default KitItem;
