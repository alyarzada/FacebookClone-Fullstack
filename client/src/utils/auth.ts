function setTokenCookie(token: string) {
  localStorage.setItem("token", token);
}

function getTokenCookie() {
  return localStorage.getItem("token");
}

export { setTokenCookie, getTokenCookie };
