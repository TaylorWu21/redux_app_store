import { GET_APPS, ADD_APP, UPDATE_APP, DELETE_APP } from '../actions/apps';

const apps = ( state = { apps: [], pagination: {} }, action ) => {
  switch(action.type) {
    case GET_APPS:
      return { apps: [...state.apps, ...action.apps], pagination: action.pagination }
    case ADD_APP:
      return { apps: [action.app, ...state], pagination: state.pagination }
    case UPDATE_APP:
      let apps = state.map( a => {
        if (a.id === action.app.id)
          return action.app
        return a
      });
      return { apps, pagination: state.pagination }
    case DELETE_APP:
      return { apps: state.filter( a => a.id !== action.id ), pagination: state.pagination }
    default:
      return state;
  }
}

export default apps;