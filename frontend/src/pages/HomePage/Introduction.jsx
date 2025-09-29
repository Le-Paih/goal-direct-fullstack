import styled from "styled-components";

const IntroDiv = styled.div`
  margin: auto 4rem;
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 700px) {
    margin: auto 2rem;
  }
`;

const H1 = styled.h1`
  font-size: 35px;
  font-weight: 900;
`;

const P = styled.p`
  font-size: 13px;
  font-weight: 400;
  line-height: 19px;
`;

function Introduction() {
  return (
    <IntroDiv>
      <H1>Goal Direct</H1>
      <P>
        Welcome to Goal Direct, your ultimate destination for the latest in
        football gear! Step into the world of passion and performance with our
        extensive collection of top-quality football boots and kits. Whether
        you&apos;re a seasoned pro or a budding enthusiast, we&apos;ve got
        everything you need to elevate your game to the next level. Browse
        through our curated selection of cutting-edge designs from leading
        brands, meticulously crafted to enhance your comfort, style, and agility
        on the pitch. At Goal Direct, we&apos;re not just about selling
        products; we&apos;re about fueling your love for the beautiful game. Get
        ready to score big with Goal Direct!
      </P>
    </IntroDiv>
  );
}

export default Introduction;
