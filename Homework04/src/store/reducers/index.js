import { combineReducers } from 'redux';
import customerReducer from './customerReducer';
import modalReducer from './modalReducer';
import snackBarReducer from './snackBarReducer';
import authReducer from './authReducer';

const reducer = combineReducers({
  customers: customerReducer,
  modal: modalReducer,
  snackBar: snackBarReducer,
  auth: authReducer,
});

export default reducer;