"use client";

import { SPOTIFY_ICON_PATH } from "../model/constants";
import { StyledButton } from "./styles";
import { signIn } from "next-auth/react";

export function LoginButton() {
  const handleLogin = () => signIn("spotify", { callbackUrl: "/" });

  return (
    <StyledButton onClick={handleLogin}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={SPOTIFY_ICON_PATH} />
      </svg>
      Login with Spotify
    </StyledButton>
  );
}
