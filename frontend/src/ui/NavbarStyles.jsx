import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavbarContainer = styled.nav`
  position: fixed;
  overflow-x: hidden;
  z-index: 9999;
  width: 100%;
  height: ${(props) => (props.extendNavbar ? "100vh" : "70px")};
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.showSidebar ? "rgb(127, 127, 127)" : "var(--color-stone-900)"};
  /* transition: background-color 0.3s ease; */

  @media (min-width: 700px) {
    height: 70px;
  }
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;

  @media (max-width: 350px) {
  }
`;

export const LeftContainer = styled.div`
  flex: 30%;
  padding-left: 2rem;
  margin: 10px;
  display: flex;
  align-items: center;
`;

export const RightContainer = styled.div`
  flex: 70%;
  display: flex;
  justify-content: flex-end;
  padding-right: 4rem;

  @media (max-width: 400px) {
    /* margin-bottom: 10rem; */
  }
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
`;

export const NavbarLink = styled(Link)`
  color: var(--color-stone-200);
  font-weight: 600;
  padding: 15px;
  margin-top: 15px;
  text-decoration: none;
  &:hover {
    border-bottom: 4px solid var(--color-stone-200);
    transition: border-bottom 0.075s ease-in;
  }

  @media (max-width: 700px) {
    display: none;
  }

  @media (max-width: 400px) {
    width: 10px;
  }
`;
export const NavbarLinkCart = styled.button`
  color: var(--color-stone-200);
  font-size: 25px;
  margin-top: -10px;
  padding: 15px;
  padding-bottom: 35px;
  margin-top: 15px;
  background-color: var(--color-stone-900);
  border: none;
  &:hover {
    border-bottom: 4px solid var(--color-stone-200);
    transition: border-bottom 0.075s ease-in;
  }

  @media (max-width: 400px) {
    margin-top: -5px;
  }

  @media (min-width: 401px) and (max-width: 700px) {
    margin-top: -2px;
  }
`;

export const LogBtn = styled(Link)`
  color: var(--color-stone-900);
  font-weight: 600;
  padding: 15px;
  margin-top: 15px;
  text-decoration: none;
  &:hover {
    border-bottom: 4px solid var(--color-stone-900);
    transition: border-bottom 0.075s ease-in;
  }

  @media (max-width: 700px) {
    display: none;
  }

  @media (max-width: 400px) {
    width: 10px;
  }
`;
export const NavbarProfLink = styled(Link)`
  color: var(--color-grey-900);
  font-size: 25px;
  margin-top: -10px;
  padding: 15px;
  padding-bottom: 35px;
  margin-top: 15px;
  background-color: white;
  border: none;
  &:hover {
    border-bottom: 4px solid var(--color-grey-900);
    transition: border-bottom 0.075s ease-in;
  }

  @media (max-width: 400px) {
    margin-top: -5px;
  }

  @media (min-width: 401px) and (max-width: 700px) {
    margin-top: -2px;
  }
`;

export const NavbarBtn = styled.button`
  color: var(--color-stone-200);
  font-size: 25px;
  margin-top: -10px;
  padding: 15px;
  padding-bottom: 35px;
  margin-top: 15px;
  background-color: var(--color-stone-900);
  border: none;
  &:hover {
    border-bottom: 4px solid var(--color-stone-200);
    transition: border-bottom 0.075s ease-in;
  }

  @media (max-width: 400px) {
    margin-top: -5px;
  }

  @media (min-width: 401px) and (max-width: 700px) {
    margin-top: -2px;
  }
`;

export const CartNum = styled.div`
  /* border-radius: 25px; */
  color: var(--color-stone-900);
  font-weight: 600;
  margin-top: -27.5px;
  margin-left: 4px;
  font-size: 10px;
  /* padding: 5px; */
  /* border: 0.2px solid var(--color-grey-900); */
`;

export const Logo = styled.img`
  margin: 10px;
  height: 3rem;
  opacity: ${(props) => (props.showSidebar ? "0.2" : "1")};

  cursor: pointer;

  @media (max-width: 350px) {
    width: 10rem;
  }
  @media (max-width: 400px) {
    margin: auto;
    width: 9rem;
  }

  @media (min-width: 401px) and(max-width: 700px) {
    justify-content: center;
  }
`;

export const OpenLinksButton = styled.button`
  margin-top: 0.5rem;
  color: var(--color-stone-200);
  background: none;
  border: none;
  margin-right: 1rem;
  font-size: 20px;
  cursor: pointer;

  @media (min-width: 700px) {
    display: none;
  }
`;

export const NavbarExtendedContainer = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  height: calc(100vh - 70px);
  z-index: 1000;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem 1rem;

  /* Slide-in animation */
  transform: translateX(${(props) => (props.extend ? "0" : "-100%")});
  transition: transform 0.3s ease-in-out;

  @media (min-width: 700px) {
    display: none;
  }
`;

export const NavbarLinkExtended = styled(Link)`
  color: var(--color-grey-900);
  font-weight: 600;
  padding: 1rem 0;
  width: 100%;
  text-decoration: none;
  font-size: 1.5rem;

  &:hover {
    border-bottom: 2px solid var(--color-grey-900);
  }

  @media (max-width: 700px) {
    font-size: 22px;
  }
`;
