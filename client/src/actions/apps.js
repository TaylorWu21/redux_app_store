import axios from 'axios';

export const GET_APPS = 'GET_APPS';
export const ADD_APP = 'ADD_APP';
export const UPDATE_APP = 'UPDATE_APP';
export const DELETE_APP = 'DELETE_APP';

export const getApps = (page = 1) => {
  return (dispatch) => {
    axios.get(`/api/apps?page=${page}`)
      .then( res => {
        const { data: apps, headers } = res;
        const totalPages = Math.ceil(headers['x-total'] / headers['x-per-page']);
        console.log(totalPages);
        console.log(headers);
        dispatch({ type: GET_APPS, apps, pagination: { totalPages }, headers }) 
      });
  }
}

export const addApp = (app) => {
  return (dispatch) => {
    axios.post('/api/apps', { app } )
     .then( res => {
       const { data: app, headers } = res;
       dispatch({ type: ADD_APP, app, headers }) 
     });
  }
}

export const updateApp = (app) => {
  return (dispatch) => {
    axios.put(`/api/apps/${app.id}`, { app } )
      .then( res => {
        const { data: app, headers } = res;
        dispatch({ type: UPDATE_APP, app, headers });
      });
  }
}

export const deleteApp = (id) => {
  return (dispatch) => {
    axios.delete(`/api/apps/${id}`)
      .then( (res) => {
        const { headers } = res;
        dispatch({ type: DELETE_APP, id, headers }) ;
      });
  }
}