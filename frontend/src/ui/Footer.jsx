import styled from "styled-components";

const FooterWrapper = styled.div`
  background-color: var(--color-stone-900);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 0;
  padding: 2rem 1rem; /* controls height naturally */
  position: relative;
  left: 0;
`;

const FootLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const FootUl = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin-top: 1.5rem;
  /* margin-left: 0; */
  @media (max-width: 700px) {
    font-size: 10px;
    flex-direction: column;
    /* margin-top: 5px; */
  }

  li {
    text-decoration: none;
    margin-left: 15px;
    cursor: pointer;
    font-size: 12px;
    @media (max-width: 700px) {
      margin-top: 10px;
    }
  }
`;

const FootSub = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1rem;

  input {
    margin-right: 10px;
    border-radius: 8px;
    border: none;

    &::placeholder {
      font-size: 12px;
      padding: 5px 10px;
      color: var(--color-grey-300);
      font-style: italic;
    }
  }

  button {
    border-radius: 8px;
    border: none;
    font-size: 12px;
    font-weight: 600;
    color: #2f2d2e;
    background-color: var(--color-grey-50);
    padding: 5px 10px;
  }
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: center;
  /* margin-top: 1rem; */
  /* margin-bottom: 1rem; */
`;

const IconUl = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin-top: 1.5rem;

  li {
    text-decoration: none;
    /* margin-left: 20px; */
    margin-right: 25px;
    cursor: pointer;
  }

  li img {
    filter: invert(1);
    width: 23px;
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <FootLinks>
        <FootUl>
          <li>Contact</li>
          <li>T&C&apos;s</li>
          <li>Shipping & Returns</li>
        </FootUl>
        <FootUl>
          <li>Privacy Policy</li>
          <li>Payment Methods</li>
          <li>Cookie Policy</li>
        </FootUl>
      </FootLinks>
      <FootSub>
        <input placeholder="Email address" />
        <button>Subscribe Now</button>
      </FootSub>
      <IconDiv>
        <IconUl>
          <li>
            <img src="/svg/icons8-facebook (1).svg" />
          </li>
          <li>
            <img src="/svg/icons8-twitterx.svg" />
          </li>
          <li>
            <img src="/svg/icons8-insta.svg" />
          </li>
        </IconUl>
      </IconDiv>
    </FooterWrapper>
  );
}

export default Footer;
