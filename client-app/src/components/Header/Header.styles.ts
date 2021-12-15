import styled from 'styled-components';

export const Wrapper = styled.div`
  background: var(--darkGrey);
  padding: 0 20px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--maxWidth);
  padding: 20px 0;
  margin: 0 auto;

  .auth {
    margin-left: auto;
    margin-right: 20px;

    & > * {
      color: white;
      text-decoration: none;
    }
  }
`;

export const LogoImg = styled.img`
  width: 200px;

  @media (max-width: 500px) {
    width: 150px;
  }
`;
// uC96uXsYZvhfZ@G
export const TMDBLogoImg = styled.img`
  width: 100px;

  @media (max-width: 500px) {
    width: 80px;
  }
`;
