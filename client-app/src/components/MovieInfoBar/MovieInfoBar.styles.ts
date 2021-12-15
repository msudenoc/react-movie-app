import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  background: var(--darkGrey);
`;

export const Content = styled.div`
  display: flex;
  max-width: var(--maxWidth);
  width: 100%;
  padding: 0 20px;
  color: var(--white);

  .col {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--medGrey);
    border-radius: 20px;
    flex: 1;
    padding: 0.75rem 0;

    & + .col {
      margin-left: 20px;
    }
  }

  @media (max-width: 768px) {
    display: block;

    .col {
      margin: 20px 0;

      & + .col {
        margin: 20px 0;
      }
    }
  }
`;
