import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box; 
  }

  body {
    align-items: center;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    // display: flex;
    // flex-direction: column;
<<<<<<< HEAD
    // justify-content: center;
=======
    // justify-content: between;
>>>>>>> fa87ea4c491b3fcae5c154cba792cc92c54cf8e8
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }

  footer {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
  }
  small {
    display: block;
  }
  button {
    display: block;
  }
  a {
    color: ${({ theme }) => theme.text};
  }
`;
