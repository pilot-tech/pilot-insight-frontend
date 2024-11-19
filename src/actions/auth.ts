"use server"
import { cookies } from "next/headers";

export default async function getCookie() {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("access_token");
  return jwtToken;
}
