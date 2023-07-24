// reducer.js
import { REGISTER_BANQUIER_SUCCESS } from '../actions/actions';

const initialState = {
  banquier: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_BANQUIER_SUCCESS:
      return {
        ...state,
        banquier: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
