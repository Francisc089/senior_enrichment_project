import { createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

//ACTION_TYPES
const GET_STUDENTS = 'GET_STUDENTS'
const GET_SCHOOLS = 'GET_SCHOOLS'
const GET_STUDENT = 'GET_STUDENT'
const GET_SCHOOL = 'GET_SCHOOL'
const POST_STUDENT = 'POST_STUDENT'
const POST_SCHOOL = 'POST_SCHOOL'
const DELETE_STUDENT = 'DELETE_STUDENT'
const DELETE_SCHOOL = 'DELETE_SCHOOL'
const UPDATE_STUDENT = 'UPDATE_STUDENT'
const UPDATE_SCHOOL = 'UPDATE_SCHOOL'


//ACTION_CREATORS
const _getStudents = (students) => ({ type : GET_STUDENTS, students });
const _getSchools = (schools) => ({ type : GET_SCHOOLS, schools });

const _getStudent = (student) => ({ type : GET_STUDENT, student });
const _getSchool = (school) => ({ type : GET_SCHOOL, school });

const _postStudent = (student) => ({ type : POST_STUDENT, student });
const _postSchool = (school) => ({ type : POST_SCHOOL, school });

const _deleteStudent = (student) => ({ type : DELETE_STUDENT , student });
const _deleteSchool = (school) => ({ type : DELETE_SCHOOL, school });

export const _updateStudent = (student) => ({ type : UPDATE_STUDENT, student });
export const _updateSchool = (school) => ({ type : UPDATE_SCHOOL, school });

//THUNKS

export const initialLoad = () => {
  return (dispatch) => {
    axios.get('/api/students')
    .then(students => dispatch(_getStudents(students.data)))
    .then(() => {
      axios.get('/api/schools')
      .then(schools => dispatch(_getSchools(schools.data)))
    })
  };
};

export const fetchSchools = () => {
  //axios request to get data then call the action creator to trigger the reducer and update state
  return (dispatch) => {
    axios.get('/api/schools')
    .then(schools => dispatch(_getSchools(schools.data)))
  };
};

export const fetchStudents = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/students');
    const students = response.data;
    const action = _getStudents(students);
    dispatch(action);
  };
};

export const fetchSchool =(id) => {
  return (dispatch) => {
    axios.get(`/api/schools/${id}`)
    .then(school => dispatch(_getSchool(school.data)))
  };
};

export const fetchStudent = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/students/${id}`);
    const student = response.data;
    const action = _getStudent(student);
    dispatch(action);
  }
};

export const postStudent = (student) => {
  return (dispatch) => {
    console.log('thunk student: ', student);
    axios.post('/api/students', student)
      .then(student => dispatch(_postStudent(student.data)))
  }
};

export const postSchool = (school) => {
  return (dispatch) => {
    console.log('thunk school: ', school)
    axios.post('/api/schools', school)
      .then(school => dispatch(_postSchool(school.data)))
  }
};

export const deleteStudent = (student) => {
  console.log('thunk school: ', student)
  return (dispatch) => {
    axios.delete(`/api/students/${student.id}`)
      .then(() => dispatch(_deleteStudent(student)))
  }
};

export const deleteSchool = (school) => {
  return (dispatch) => {
    axios.delete(`/api/schools/${school.id}`)
      .then(() => dispatch(_deleteSchool(school)))
  }
};

export const updateSchool = (school) => {
  return (dispatch) => {
    axios.put(`/api/schools/${school.id}`, school)
      .then(school => dispatch(_updateSchool(school.data)))
  }
};

export const updateStudent = (student) => {
  return (dispatch) => {
    axios.put(`/api/students/${student.id}`, student)
      .then(student => dispatch(_updateStudent(student.data)))
  };
};

export const findAndUpdateStudent = (studentId,schoolId) => {
  return (dispatch) => {
    axios.get(`/api/students/${studentId}`)
    .then(student => {
      const newStudent = {...student.data, schoolId}
      axios.put(`/api/students/${newStudent.id}`, newStudent)
    })
  };
}

const initialState = {
  students : [],
  student : {},
  schools : [],
  school : {}
};

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case GET_STUDENTS:
      return {...state, students : action.students}
    case GET_SCHOOLS:
      return {...state, schools : action.schools}
    case GET_STUDENT:
      return {...state, student : action.student}
    case GET_SCHOOL:
      return {...state, school : action.school}
    case POST_STUDENT:
      return {...state, students : [...state.students, action.student]}
    case POST_SCHOOL:
      return {...state, schools : [...state.schools, action.school]}
    case DELETE_STUDENT:
      const students = state.students.filter(student => student.id !== action.student.id)
      return {...state, students}
    case DELETE_SCHOOL:
      const schools = state.schools.filter(school => school.id !== action.school.id)
      return {...state, schools}
    case UPDATE_STUDENT:
      return {...state, student : action.student}
    case UPDATE_SCHOOL:
      return {...state, school : action.school}
    default :
      return state 
  };
};

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;