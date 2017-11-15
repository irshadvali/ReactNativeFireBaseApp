import {
RESTORETEXT,
UPDATETEXT
} from "../utils/Constant.js";

const chatreducer = (
  state = {
    messagedText: '',
  },
  action
) => {
  switch (action.type) {
    case RESTORETEXT:
     return Object.assign({}, state, {
        messagedText: '',
      });
     case UPDATETEXT:
     return Object.assign({}, state, {
        messagedText: action.payload,
      });
    default:
      return state;
  }
};
export default chatreducer;
