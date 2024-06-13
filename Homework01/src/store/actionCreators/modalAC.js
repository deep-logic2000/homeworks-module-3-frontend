import {
  SET_MODAL_OPEN,
  CLOSE_MODAL,
  SET_ACTIVE_ACCOUNT_ID,
  SET_ACTIVE_USER_ID,
} from "../actions/modalActions";

export const openModal = ({ modalText, activeAccountId }) => {
  console.log("openModal AC", modalText, activeAccountId);
  return {
    type: SET_MODAL_OPEN,
    payload: {
      modalText: modalText ? modalText : "Are you sure?",
      activeAccountId,
    },
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};

export const setActiveAccountId = (accountId) => {
  return {
    type: SET_ACTIVE_ACCOUNT_ID,
    payload: accountId,
  };
};

export const setActiveUserId = (userId) => {
  return {
    type: SET_ACTIVE_USER_ID,
    payload: userId,
  };
};
