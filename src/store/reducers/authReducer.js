// reducers/authReducer.js
const initialState = {
  token: null,
  userType: null,
  googleToken: null,
  userId: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AUTH_INFO':
      return {
        ...state,
        token: action.payload.token,
        userType: action.payload.userType,
        userId:action.payload.userId,
      };
      case 'SET_GOOGLE_TOKEN':
      return { 
        ...state, 
        googleToken: action.payload };
      // case 'SET_USER_ID':
      // return {
      //   ...state,
      //   userId: action.payload
      // };
      case 'SET_USER_TYPE':
        return {
          ...state,
          userType: action.payload,
        };
    default:
      return state;
  }
};

export default authReducer;
