import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import styled from "styled-components";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const StyledPagination = styled.div`
  width: 14rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const P = styled.p`
  font-size: 15px;
  text-align: center;
  font-weight: 500;

  & span {
    font-weight: 600;
  }
`;

const BtnDiv = styled.div`
  display: flex;
  width: 70%;
  flex-direction: row;
  justify-content: space-between;
`;
const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-green-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-green-50)" : "inherit")};
  border: none;
  border-radius: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  padding: 0.5rem 1.3rem;
  transition: all 0.3s;

  & svg {
    height: 1.5rem;
    width: 1.5rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-green-500);
    color: var(--color-grey-50);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const nPage = Math.ceil(count / PAGE_SIZE);

  if (nPage <= 1) return null;

  function prevPage() {
    // const prev = currentPage === 1 ? currentPage : currentPage - 1;
    const prev = Math.max(currentPage - 1, 1);

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  function nextPage() {
    // const next = currentPage === nPage ? currentPage : currentPage + 1;
    const next = Math.min(currentPage + 1, nPage);

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  if (nPage <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>{currentPage === nPage ? count : currentPage * PAGE_SIZE}</span>{" "}
        of <span>{count}</span> results
      </P>

      <BtnDiv>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <FiChevronLeft />
        </PaginationButton>
        <PaginationButton onClick={nextPage} disabled={currentPage === nPage}>
          <FiChevronRight />
        </PaginationButton>
      </BtnDiv>
    </StyledPagination>
  );
}

export default Pagination;
