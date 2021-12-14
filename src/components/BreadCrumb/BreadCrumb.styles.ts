import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  background: var(--medGrey);
  color: var(--white);
`;

export const Content = styled.div`
  display: flex;
  max-width: var(--maxWidth);
  width: 100%;

  span {
    font-size: var(--fontMed);
    color: var(--white);
    padding-right: 10px;

    @media (max-width: 768px) {
      font-size: var(--fontSmall);
    }
  }
`;
