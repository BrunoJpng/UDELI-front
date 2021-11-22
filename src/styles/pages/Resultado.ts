import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 2rem 0;
  
  main {
    width: 95%;
    max-width: 1100px;
    
    display: grid;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    gap: 1rem;

    @media(min-width: 700px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .custom-tooltip {
    background: #fff;
    padding: 2rem;
    text-align: initial;
    border: 1px solid #cccccc;
  }
`;

export const ChartContainer = styled.div`
  width: 100%;
  background: #FFF;
  text-align: center;

  padding: 1rem;
  border: 1px solid #bbb;
  border-radius: 8px;

  overflow-x: auto;
  overflow-y: hidden;

  &.landscape {
    grid-column-end: span 2;
  }

  h2 {
    margin-bottom: 1.5rem;
  }
`;