import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 700px;

  background-color: #fff;
  margin: 30px;
  padding: 20px;
  border-radius: 4px;
`;

export const Button = styled.button`
  width: 3rem;
  height: 3rem;

  background: #04D361;
  color: #FFFFFF;
  font-size: 0;

  border: 0;
  border-radius: 0.4rem;

  cursor: pointer;

  transition: background-color 0.2s;

  &:hover {
    background: #04bf58;
  }
`;