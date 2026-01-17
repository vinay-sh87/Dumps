const TOKEN_KEY = "access_token";
// storing and geting the access_token inside the localstorage
const tokenService = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: () => localStorage.setItem(TOKEN_KEY),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export default tokenService;
