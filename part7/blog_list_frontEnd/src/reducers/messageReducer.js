const reducer = (state = null, action) => {
  switch (action.type) {
    case 'START_MESSAGE':
      return {
        text: action.data.text,
        type: action.data.type,
      };
    case 'END_MESSAGE':
      return null;
    default:
      return state;
  }
};

export const notify = (text, type, time) => (dispatch) => {
  dispatch({
    type: 'START_MESSAGE',
    data: { text, type },
  });
  const timer = window.setTimeout(() => {
    dispatch({
      type: 'END_MESSAGE',
    });
  }, time * 1000);

  window.clearTimeout(timer - 1);
};

export default reducer;
