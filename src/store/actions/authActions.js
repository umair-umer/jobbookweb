export const setAuthInfo = (token, userType,userId) => {
  return {
    type: 'SET_AUTH_INFO',
    payload: { token, userType, userId },
  };
};

export const setUserType = (userType) => {
  return {
    type: 'SET_USER_TYPE',
    payload: userType,
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