import {
  RESTORETEXT,
  UPDATETEXT
} from "../utils/Constant";

export const clearText = text => {
  return {
    type: RESTORETEXT,
    payload: text
  };
};

export const updateText = text => {
  return {
    type: UPDATETEXT,
    payload: text
  };
};

