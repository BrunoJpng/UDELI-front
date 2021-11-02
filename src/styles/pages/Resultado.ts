import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  max-width: 1100px;
  
  /* display: grid;
  grid-template-columns: 1fr 1fr; */
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  justify-content: space-between;
  
  margin: 0 auto;
  gap: 1rem;

  /* > div {
    flex-basis: 100%;
  } */

`;