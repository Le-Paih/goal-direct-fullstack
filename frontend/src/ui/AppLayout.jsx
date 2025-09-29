import styled from "styled-components";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const StyledAppLayout = styled.div`
  display: grid;
  /* grid-template-rows: 4rem 10rem; */
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  overflow: scroll;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
