import { createStore } from 'redux';
import rootReducer from "../reducer/index";

export default configureStore  => {
  const store = createStore(rootReducer);
 
  return store;
};