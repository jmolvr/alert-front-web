export const TOKEN_KEY = "token@alert";
export const ACCESS_TOKEN = "access@alert";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token, access) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ACCESS_TOKEN, access);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ACCESS_TOKEN);
};
