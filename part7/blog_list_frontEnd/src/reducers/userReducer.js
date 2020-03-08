import blogServices from '../services/blogs';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN': {
      return action.data.user; }
    case 'LOG_OUT': {
      return action.data.user; }
    default: {
      return state; }
  }
};

export const initUser = () => {
  const user = JSON.parse(window.localStorage.getItem('blogListUser')) || null;
  if (user) blogServices.getToken(user.token);
  return {
    type: 'LOG_IN',
    data: { user },
  };
};

export const logIn = (userToLog) => async (disptach) => {
  try {
    const user = await blogServices.logIn(userToLog);
    window.localStorage.setItem('blogListUser', JSON.stringify(user));
    return disptach({
      type: 'LOG_IN',
      data: { user },
    });
  } catch (error) {
    return Promise.resolve(false);
  }
};

export const logOut = () => {
  window.localStorage.removeItem('blogListUser');
  blogServices.logOut();
  return {
    type: 'LOG_OUT',
    data: { user: null },
  };
};

export default reducer;
