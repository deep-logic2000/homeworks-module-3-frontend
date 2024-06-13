import {
  SET_MODAL_OPEN,
  CLOSE_MODAL,
  SET_MODAL_TEXT,
  SET_ACTIVE_ACCOUNT_ID,
  SET_ACTIVE_USER_ID,
} from "../actions/modalActions";

const initialState = {
  isModalOpen: false,
  config: { modalText: "", activeAccountId: "", activeUserId: "" },
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL_OPEN:
      return {
        ...state,
        isModalOpen: true,
        config: { ...action.payload },
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
        config: { modalText: "", activeAccountId: "", activeUserId: "" },
      };
    case SET_MODAL_TEXT:
      return {
        ...state,
        config: { ...state.config, modalText: action.payload },
      };
    case SET_ACTIVE_ACCOUNT_ID:
      return {
        ...state,
        config: { ...state.config, activeAccountId: action.payload },
      };

    case SET_ACTIVE_USER_ID:
      return {
        ...state,
        config: { ...state.config, activeUserId: action.payload },
      };
    default:
      return state;
  }
};

export default modalReducer;
