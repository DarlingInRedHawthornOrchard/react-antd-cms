import dotState from "../states/dotState";
import { DECREMENT_DOTCOUNT } from '../actions/dotActions'


export default function dotReducer(state = dotState, action) {
  switch (action.type) {
    case DECREMENT_DOTCOUNT:
      return { ...state, dotCount: state.dotCount-- }
      break;
  
    default:
      return state
  }
}