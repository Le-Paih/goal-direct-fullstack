import styled from "styled-components";

function KitsIntro() {
  const Intro = styled.div`
    margin: 80px 4rem 4rem 4rem;

    @media (max-width: 700px) {
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
    font-weight: 400;
    font-size: 13px;
    line-height: 19px;
    letter-spacing: 0.5px;
  `;

  return (
    <Intro>
      <IntroH1>Football Kits</IntroH1>
      <IntroP>
        At Goal Direct, we&apos;re dedicated to providing football enthusiasts
        with access to the most advanced and stylish football kits available.
        Our commitment to excellence means that we continuously update our
        inventory with the latest designs and innovations from top brands in the
        industry. Whether you&apos;re looking for the iconic jerseys of your
        favorite club or cutting-edge training gear, our extensive collection
        ensures that you&apos;ll find exactly what you need to look and perform
        your best on the pitch. With Goal Direct, you can trust that you&apos;re
        getting access to the newest trends and technologies in football
        apparel, helping you to showcase your passion for the game in style.
      </IntroP>
    </Intro>
  );
}

export default KitsIntro;
