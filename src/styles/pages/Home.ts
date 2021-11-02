import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 1rem;

  main {
    width: 100%;
    max-width: 700px;
    background: #fff;
    border-radius: 4px;
    padding: 1.25rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;