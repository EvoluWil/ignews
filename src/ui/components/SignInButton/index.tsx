import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { SignInContainer } from "./style";

export const SignInButton = () => {
  const [session] = useSession();

  return session ? (
    <SignInContainer
      onClick={() => {
        signOut();
      }}
    >
      <FaGithub color="#04d361" />
      {session.user?.name}
      <FiX color="#737380" />
    </SignInContainer>
  ) : (
    <SignInContainer onClick={() => signIn("github")}>
      <FaGithub color="#eba417" />
      Sign in with GitHub
    </SignInContainer>
  );
};
