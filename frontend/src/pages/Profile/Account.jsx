import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/authContext";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { clearCart } from "../../slice/cartSlice";
import { CgProfile } from "react-icons/cg";

function Account() {
  const Main = styled.div`
    margin-top: 10rem;
    margin-bottom: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const ProfileCard = styled.div`
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 400px;
    width: 100%;
  `;

  const ActionButton = styled.button`
    background-color: black;
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: bold;
    margin-top: 1rem;
    &:hover {
      opacity: 0.8;
    }
  `;

  const dispatch = useDispatch();

  const { user, logout, isLoggedIn } = useContext(AuthContext);

  const handleLogout = async () => {
    toast.success("Logged out successfully");
    setTimeout(() => {
      dispatch(clearCart());
      logout();
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div>
      {isLoggedIn ? (
        <Main>
          <ProfileCard>
            <CgProfile size={40} color="black" />

            <h2>{user.name}</h2>
            <p>{user.email}</p>

            <ActionButton onClick={handleLogout}>Logout</ActionButton>
          </ProfileCard>
        </Main>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Account;
