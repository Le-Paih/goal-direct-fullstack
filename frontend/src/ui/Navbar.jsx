import { FaShoppingCart, FaUser } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

import {
  CartNum,
  LeftContainer,
  Logo,
  NavbarContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLink,
  NavbarLinkCart,
  NavbarLinkExtended,
  OpenLinksButton,
  RightContainer,
} from "./NavbarStyles";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useSelector } from "react-redux";

function Navbar() {
  const [extendNavbar, setExtendNavbar] = useState(false);
  const navigate = useNavigate();
  const [showSidebar] = useState(false);

  const cart = useSelector((state) => state.cart);
  const cartItems = cart.items || [];

  const totalItems = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const { isLoggedIn } = useContext(AuthContext);

  function handleLinkClick() {
    setExtendNavbar(false);
  }

  const src = "../svg/Pre-logo.svg";

  return (
    <div>
      <NavbarContainer extendNavbar={extendNavbar}>
        <NavbarInnerContainer>
          <LeftContainer>
            <OpenLinksButton onClick={() => setExtendNavbar((curr) => !curr)}>
              {extendNavbar ? <MdClose /> : <RxHamburgerMenu />}
            </OpenLinksButton>
            <Logo
              src={src}
              onClick={() => navigate("/")}
              alt="Logo"
              style={{ pointerEvents: showSidebar ? "none" : "auto" }}
            />
          </LeftContainer>
          <RightContainer>
            <NavbarLink to="/">Homepage</NavbarLink>
            <NavbarLink to="/boots">Boots</NavbarLink>
            <NavbarLink to="/kits">Kits</NavbarLink>
            <NavbarLink to={isLoggedIn ? "/profile" : "/login"}>
              {isLoggedIn ? <FaUser /> : "Login"}
            </NavbarLink>
            {/* <NavbarBtn onClick={toggleSidebar}> */}
            <NavbarLinkCart onClick={() => navigate("/cart")}>
              <FaShoppingCart />
              {totalItems > 0 && <CartNum>{totalItems}</CartNum>}
              {/* </NavbarBtn> */}
            </NavbarLinkCart>

            {/* <Cart onClick={toggleSidebar} /> */}
          </RightContainer>
        </NavbarInnerContainer>
        {extendNavbar && (
          <NavbarExtendedContainer extend={extendNavbar}>
            <NavbarLinkExtended to="/" onClick={handleLinkClick}>
              Homepage
            </NavbarLinkExtended>
            <NavbarLinkExtended to="/boots" onClick={handleLinkClick}>
              Boots
            </NavbarLinkExtended>
            <NavbarLinkExtended to="/kits" onClick={handleLinkClick}>
              Kits
            </NavbarLinkExtended>
            <NavbarLinkExtended
              to={isLoggedIn ? "/profile" : "/login"}
              onClick={handleLinkClick}
            >
              {isLoggedIn ? "Account" : "Login"}
            </NavbarLinkExtended>
          </NavbarExtendedContainer>
        )}
      </NavbarContainer>
    </div>
  );
}

export default Navbar;
