import { PUT_FORM_FAILED, PUT_FORM_PASSED } from "../actions/accountActions";

const initialState = {
  formPassed: {
    date: [''],
    successfullySent: []
  },
  formFailed: {
    date: [''],
    failed: []
  }
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_FORM_PASSED:
      return { ...state, formPassed: action.payload }
    case PUT_FORM_FAILED:
      return { ...state, formFailed: action.payload }
    default:
      return state;
  }
}

export default userReducer;