// reducer.js
const initialState = {
    // Your initial state here
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CONNECTION_STATUS':
        return {
         ...state,connectionStatus:action.payload
        };
      // Additional cases for other actions
      default:
        return state;
    }
  };
  
  export default reducer;
  