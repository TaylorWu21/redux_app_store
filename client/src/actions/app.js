import axios from 'axios';

export const GET_APPS = 'GET_APPS';
export const ADD_APP = 'ADD_APP';
export const UPDATE_APP = 'UPDATE_APP';
export const DELETE_APP = 'DELETE_APP';

export const getApps = () => {
  return (dispatch) => {
    axios.get('/api/apps')
      .then( res => dispatch({ type: GET_APPS, apps: res.data }) )
  }
}

export const addApp = (app) => {
  return (dispatch) => {
    axios.post('/api/apps', { app } )
     .then( res => dispatch({ type: ADD_APP, app: res.data }) )
  }
}

export const updateApp = (app) => {
  return (dispatch) => {
    axios.put(`/api/apps/${app.id}`, { app } )
      .then( res => dispatch({ type: UPDATE_APP, app: res.data }) )
  }
}

export const deleteApp = (id) => {
  return (dispatch) => {
    axios.delete(`/api/apps/${id}`)
      .then( () => dispatch({ type: DELETE_APP, id }) )
  }
}