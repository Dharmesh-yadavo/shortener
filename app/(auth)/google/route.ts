import { google } from "@/lib/google";
import { generateState, generateCodeVerifier } from "arctic";
import { cookies } from "next/headers";

export async function GET() {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = google.createAuthorizationURL(state, codeVerifier, [
    "openid",
    "profile",
    "email",
  ]);

  const cookieStore = await cookies();

  // Store state and verifier in cookies to verify later
  const cookieOptions = {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10,
    sameSite: "lax" as const,
  };

  cookieStore.set("google_oauth_state", state, cookieOptions);
  cookieStore.set("google_code_verifier", codeVerifier, cookieOptions);

  return Response.redirect(url.toString());
}
