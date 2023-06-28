const initialState = {
  details: null,
};

export default function detailsReducer(state = initialState, action: { type: any; payload: any; }) {
  switch (action.type) {
    case 'STORE_DETAILS':
      return {
        ...state,
        details: action.payload,
      };

    default:
      return state;
  }
}
