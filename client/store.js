import { createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

//ACTION_TYPES
const GOT_STUDENTS = 'GOT_STUDENTS'
const GOT_SCHOOLS = 'GOT_SCHOOLS'
const GOT_STUDENT = 'GOT_STUDENT'
const GOT_SCHOOL = 'GOT_SCHOOL'

//ACTION_CREATORS
const gotStudents = (students) => ({
  type : GOT_STUDENTS,
  students
});

const gotSchools = (schools) => ({
  type : GOT_SCHOOLS,
  schools
});

const gotStudent = (student) => ({
  type : GOT_STUDENT,
  student
});

const gotSchool = (school) => ({
  type : GOT_SCHOOL,
  school
})

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

export const fetchSchool =(id) => {
  return (dispatch) => {
    axios.get(`/api/schools/${id}`)
    .then(school => dispatch(gotSchool(school.data)))
  };
};

export const fetchStudent = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/students/${id}`);
    const student = response.data;
    const action = gotStudent(student);
    dispatch(action);
  }
}

const initialState = {
  students : [],
  student : {},
  schools : [],
  school : {}
};

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case GOT_STUDENTS:
      return {...state, students : action.students}
    case GOT_SCHOOLS:
      return {...state, schools : action.schools}
    case GOT_STUDENT:
      return {...state, student : action.student}
    case GOT_SCHOOL:
      return {...state, school : action.school}
    default :
      return state 
  };
};

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;