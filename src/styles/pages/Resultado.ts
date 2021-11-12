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

      > div.landscape {
        grid-column-end: span 2;
      }
    }
  }

  /* @media(min-width: 1100px) {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
  
    > div {
      display: flex;
      margin-bottom: 1rem;
      break-inside: avoid;
  
      &.landscape1 {
        grid-column-end: span 2;
      }
      
      &.landscape2 {
        grid-column-end: span 3;
      }
    } 
  } */
`;