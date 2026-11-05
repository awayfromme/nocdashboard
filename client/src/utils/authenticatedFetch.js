const authenticatedFetch = (url, options = {}) => {
  let token = null;

  try {
    token = JSON.parse(localStorage.getItem("jwtTokenTeams"));
  } catch (error) {
    token = null;
  }

  const headers = { ...(options.headers || {}) };
  if (token) headers.Authorization = token;

  return fetch(url, { ...options, headers });
};

export default authenticatedFetch;
