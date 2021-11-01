import React from "react";
import { SignInButton } from "../SignInButton";
import { HeaderContainer, HeaderContent } from "./style";
import { ActiveLink } from "../ActiveLink";

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src="/images/logo.svg" alt="ig-news" />
        <nav>
          <ActiveLink activeClassName={"active"} href="/"><a>Home</a></ActiveLink>
          <ActiveLink activeClassName={"active"} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </HeaderContent>
    </HeaderContainer>
  );
};
