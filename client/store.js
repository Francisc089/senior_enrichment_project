import { createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

//ACTION_TYPES
const GOT_STUDENTS = 'GOT_STUDENTS'
const GOT_SCHOOLS = 'GOT_SCHOOLS'

//ACTION_CREATORS
const gotStudents = (students) => ({
  type : GOT_STUDENTS,
  students
});

const gotSchools = (schools) => ({
  type : GOT_SCHOOLS,
  schools
});

//THUNKS
export const fetchSchools = () => {
  //axios request to get data then call the action creator to trigger the reducer and update state
  return (dispatch) => {
    axios.get('/api/schools')
    .then(schools => dispatch(gotSchools(schools.data)))
  };
};

export const fetchStudents = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/students');
    const students = response.data;
    const action = gotStudents(students);
    dispatch(action);
  };
};

const initialState = {
  students : [],
  schools : []
};

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case GOT_STUDENTS:
      return {...state, students : action.students}
    case GOT_SCHOOLS:
      return {...state, schools : action.schools}
    default :
      return state 
  };
};

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;