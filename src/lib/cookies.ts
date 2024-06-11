import Cookies from 'js-cookie';

export const setAuthCookies = (accessToken: string, refreshToken: string) => {
  Cookies.set("accessToken", accessToken, { expires: 1 });
  Cookies.set("refreshToken", refreshToken, { expires: 30 });
};

export const getAuthCookies = (): { accessToken: string | undefined; refreshToken: string | undefined } => {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  return { accessToken, refreshToken };
};

export const clearAuthCookies = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};
