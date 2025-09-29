import styled from "styled-components";

const Intro = styled.div`
  margin: 70px 4rem 4rem 4rem;

  @media (max-width: 400px) {
    margin-left: 2rem;
    margin-right: 2rem;
    margin-bottom: 2rem;
  }
`;

const IntroH1 = styled.h2`
  font-weight: 700;
  font-size: 24px;
  padding-top: 2rem;
`;

const IntroP = styled.p`
  font-size: 13px;
  line-height: 19px;
  letter-spacing: 0.5px;
`;

function BootsIntro() {
  return (
    <Intro>
      <IntroH1>Football Boots</IntroH1>
      <IntroP>
        At Goal Direct, we pride ourselves on providing enthusiasts with the
        pinnacle of sporting gear, particularly when it comes to football boots.
        Our commitment to excellence drives us to consistently offer the latest
        and greatest innovations in footwear technology, ensuring that players
        of all levels can elevate their game to new heights. Whether you&apos;re
        seeking enhanced traction, superior comfort, or cutting-edge design, our
        curated selection boasts top-tier options from renowned brands. With
        Goal Direct, you&apos;re not just purchasing a pair of boots;
        you&apos;re investing in performance, style, and the competitive edge
        needed to dominate on the field.
      </IntroP>
    </Intro>
  );
}

export default BootsIntro;
