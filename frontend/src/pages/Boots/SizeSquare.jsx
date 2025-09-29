import styled from "styled-components";

const StyledSizeSquare = styled.div`
  display: grid;
  text-align: center;
  align-items: center;

  width: auto;
  height: 40px;
  border: solid rgba(0, 0, 0, 0.1);
  border-width: 0.5px;
  background-color: ${(props) => (props.available ? "white" : "#f6f6f6")};

  ${(props) =>
    props.selected &&
    `
    background-color: black;
    color: white;
    color
  `}
  color: ${(props) => (props.available ? "var(--color-grey-900)" : "#cecece")};
  cursor: ${(props) => (props.available ? "pointer" : "not-allowed")};

  &:hover {
    background-color: ${(props) => (props.available ? "black" : null)};
    color: ${(props) => (props.available ? "white" : null)};
  }
`;

function SizeSquare({ available, size, onClick, selected }) {
  return (
    <StyledSizeSquare
      available={available}
      onClick={available ? onClick : null}
      selected={selected}
    >
      {size}
    </StyledSizeSquare>
  );
}

export default SizeSquare;
