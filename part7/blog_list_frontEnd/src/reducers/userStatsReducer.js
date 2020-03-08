import userServices from '../services/users';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_STATS':
      return action.data.stats;
    default:
      return state;
  }
};

export const initStats = () => async (dispatch) => {
  const stats = await userServices.getStats();
  dispatch({
    type: 'INIT_STATS',
    data: { stats },
  });
};

export default reducer;
