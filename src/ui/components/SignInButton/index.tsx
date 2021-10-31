import React from "react";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { SignInContainer } from "./style";

export const SignInButton = () => {
  const isUserLoggedIn = true;

  return isUserLoggedIn ? (
    <SignInContainer>
      <FaGithub color="#04d361" />
      username
      <FiX color="#737380" />
    </SignInContainer>
  ) : (
    <SignInContainer>
      <FaGithub color="#eba417" />
      Sign in with GitHub
    </SignInContainer>
  );
};
