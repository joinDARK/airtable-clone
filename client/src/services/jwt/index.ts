import {jwtDecode} from "jwt-decode"

export const decodeToken = (token: string | null) => {
  if (typeof token === "string") {
    const decoded: any = jwtDecode(token);
    return decoded;
  } else {
    return null
  }
}

export const validateToken = (token: string | null) => {
  const decoded = decodeToken(token);
  if (decoded && decoded.exp * 1000 > Date.now()) {
    return true;
  }
  return false;
};