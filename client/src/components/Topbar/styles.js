import styled from "styled-components";
import { Link } from "react-router-dom";

export const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  width: 100%;
  height: 5rem;
  padding: 0 3rem;
  span {
    font-weight: 100;
    transition: 0.3s;
    font-size: 1.5rem;
    font-family: sans-serif;
    color: white;
  }
  span:hover {
    transform: scale(1.1) rotate(1deg);
    color: rgba(255, 255, 255, 0.8);
  }
`;

export const Button = styled(Link)`
  color: white;
  background-color: transparent;
  margin: 0 0.5rem;
  padding: 0.5rem 2.5rem;
  border: 1px solid #666666;
  border-radius: 25px;
  transition: 0.3s;
  font-size: 0.9rem;
  font-family: sans-serif;
  font-weight: 100;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 5px;
    color: white;
  }
`;

export const ButtonContainer = styled.div`
  display: ${(props) => (props.dash ? "none" : null)};
`;
