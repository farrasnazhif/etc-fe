import Cookies from "universal-cookie";

const TOKEN_KEY = "@next-starter/token";

export function getToken(): string | undefined {
  const cookies = new Cookies();
  const token = cookies.get(TOKEN_KEY);
  return typeof token === "string" ? token : undefined;
}
