import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  input[type="checkbox"] {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;

    &:checked + label:before {
      background-color: #04D361;
      background-image: url("icons/checked.svg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: 1rem;
      
      border: 2px solid #04D361;
    }
  }

  label {
    font-size: 1.4rem;
    cursor: pointer;
    position: relative;
    padding-left: 3rem;

    &:before {
      content: "";
      width: 1.5rem;
      height: 1.5rem;

      border: 1px solid #e6e6f0;
      border-radius: 8px;

      position: absolute;
      left: 0;
      top: 0.2rem;
    }
  }
`;