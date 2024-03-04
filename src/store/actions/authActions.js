export const setAuthInfo = (token, userType) => {
  return {
    type: 'SET_AUTH_INFO',
    payload: { token, userType },
  };
};
export const setGoogleToken = (token) => ({
  type: 'SET_GOOGLE_TOKEN',
  payload: token,
});

export const setUser = (userId) => {
  return {
    type: 'SET_USER_ID',
    payload: userId
  };
};