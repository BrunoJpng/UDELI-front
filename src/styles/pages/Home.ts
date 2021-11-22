import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem 0;

  main {
    width: 90%;
    max-width: 1100px;
    background: #fff;
    border-radius: 8px;
    padding: 1.25rem;
    margin: 0 auto;
  }

  fieldset {
    border: 0;
    padding: 2.4rem;

    legend {
      width: 100%;
      font: 700 2rem Archivo;
      color: #32264d;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e6e6f0;
    }
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2.4rem;
  }
`;

export const PeriodContainer = styled.section`
  display: grid;
  align-items: center;
  margin-top: 1.4rem;
  gap: 1rem;

  label {
    font-size: 1.2rem;
    padding-bottom: 3rem;
  }

  @media(min-width: 780px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Button = styled.button`
  width: 20rem;
  height: 5.6rem;

  background: #04D361;
  color: #FFFFFF;
  font: 700 1.6rem Archivo;

  border: 0;
  border-radius: 0.8rem;

  cursor: pointer;

  transition: background-color 0.2s;

  &:hover {
    background: #04bf58;
  }
`;