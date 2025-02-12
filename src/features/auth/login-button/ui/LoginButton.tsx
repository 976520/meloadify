"use client";

import { SPOTIFY_ICON_PATH } from "../model/constants";
import { StyledButton } from "./styles";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export function LoginButton() {
  const handleLogin = async () => {
    try {
      const result = await signIn("spotify", { callbackUrl: "/", redirect: false });
      if (result?.error) {
        toast.error("로그인에 실패했어요");
      } else {
        toast.success("로그인 성공!");
        window.location.href = result?.url || "/";
      }
    } catch (error) {
      toast.error("로그인에 실패했어요");
    }
  };

  return (
    <StyledButton onClick={handleLogin}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={SPOTIFY_ICON_PATH} />
      </svg>
      Login with Spotify
    </StyledButton>
  );
}
