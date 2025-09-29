import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";
import styled from "styled-components";
import { useContext } from "react";
import { DataContext } from "../../context/dataContext";
import FullscreenSpinner from "../../ui/Spinner";

const PopTitle = styled.h1`
  text-align: center;
  margin: 2rem;
  margin-bottom: -0.5rem;
  font-size: 35px;
  font-weight: 700;
`;

function PopularProducts() {
  const { bootData, loading, error } = useContext(DataContext);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (loading) return <FullscreenSpinner />;
  if (error) return <p>{error}</p>;

  const popularBoots = bootData?.filter((pop) => pop.popular) || [];

  if (!popularBoots.length) return <p>No popular products found.</p>;

  return (
    <div>
      <PopTitle>Popular Products</PopTitle>
      <Carousel responsive={responsive}>
        {popularBoots.map((pop) => (
          <Product
            key={pop._id}
            name={pop.name}
            img={pop.image.image1}
            price={pop.price}
            popular={pop.popular}
            brand={pop.brand}
            id={pop._id}
          />
        ))}
      </Carousel>
    </div>
  );
}

export default PopularProducts;
