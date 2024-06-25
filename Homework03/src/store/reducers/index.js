import { combineReducers } from 'redux';
import customerReducer from './customerReducer';
import modalReducer from './modalReducer';
import snackBarReducer from './snackBarReducer';

const reducer = combineReducers({
  customers: customerReducer,
  modal: modalReducer,
  snackBar: snackBarReducer,
});

export default reducer;