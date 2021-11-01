import styled from "@emotion/styled";

export const SignInContainer = styled("button")`
  height: 3rem;
  border-radius: 3rem;
  background: var(--gray-850);
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-weight: bold;

  transition: filter 0.4s;

  &:hover {
    filter: brightness(0.8);
  }

  svg {
    width: 20px;
    height: 20px;

    & + svg {
      margin-left: 1rem;
    }
  }

  svg:first-of-type {
    margin-right: 1rem;
  }
`;
