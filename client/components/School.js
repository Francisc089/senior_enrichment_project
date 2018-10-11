import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchSchool, deleteSchool, updateSchool, _updateSchool, updateStudent, findAndUpdateStudent } from '../store.js'

class School extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSchoolChange = this.handleSchoolChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleStudentUnenrollment = this.handleStudentUnenrollment.bind(this)
    this.handleStudentEnlist = this.handleStudentEnlist.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const newSchool = {...this.props.school}
    this.props.updateSchool(newSchool)
  }

  handleSchoolChange (event) {
    const school = {...this.props.school, [ event.target.name ] : event.target.value}
    this.props.handleSchoolChange(school)
  }

  handleDelete (event) {
    event.preventDefault()
    console.log(this.props.school)
    this.props.deleteSchool(this.props.school)
    this.props.history.push('/schools')
  }

  handleStudentEnlist(event) {
    event.preventDefault()
    const { school } = this.props;
    console.log([event.target.name], event.target.value );
    this.props.handleStudentChange(event.target.value, school.id);
  }

  handleStudentUnenrollment(student) {
    const studentUpdate = {...student, schoolId : null}
    this.props.updateStudent(studentUpdate)
  }

  componentDidMount() {
    const schoolId = this.props.id
    this.props.fetchSchool(schoolId)
  }

  render () {
    const { school, students } = this.props;
    school.students = school.students || [];
    const { handleDelete, handleSchoolChange, handleSubmit, handleStudentUnenrollment, handleStudentEnlist } = this;
    
    return (
      <div>
        <h3>School Information</h3>
        <p>{school.name} - {school.description}</p>
        <div>
          <h4>Student List</h4>
          <ul>
            { school.students.map(student => {
              return (
                <li key={student.id}>
                  {student.firstName} {student.lastName} 
                  <button type='button' onClick={() => handleStudentUnenrollment(student)}>Delete</button>
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <h4>Add Student</h4>
          <div>
            <form onSubmit={handleSubmit}>
              <label>
              Add From Student List:
              <select name='student' value={''} onChange={handleStudentEnlist}>
                {
                  students.map(student => <option name={student} key={student.id} value={student.id}>{student.firstName} {student.lastName}</option>)
                }
              </select>
              </label>
              <button type='submit'>Save</button>
            </form> 
          </div>
          <div>
            <Link to={`/students/create/${school.id}`}>Add New Student</Link>
          </div>
        </div>
        <div>
          <h3>Update School</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                School Name: <input name='name' type='text' value={school.name} onChange={handleSchoolChange}/>
              </label>
            </div>
            <div>
              <label>
                Address: <input name='address' type='text' value={school.address} onChange={handleSchoolChange}/>
              </label>
            </div>
            <div>
              <label>
                Description: <input name='description' type='text' value={school.description} onChange={handleSchoolChange}/>
              </label>
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
        <div>
          <h3>Delete School</h3>
          <button type='button' onClick={handleDelete}>Delete</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    school : state.school,
    students : state.students 
  };
};

const mapDispatchToProps = dispatch => {
  return { 
    fetchSchool : (id) => dispatch(fetchSchool(id)),
    deleteSchool : (school) => dispatch(deleteSchool(school)),
    updateSchool : (school) => dispatch(updateSchool(school)),
    handleSchoolChange : (school) => dispatch(_updateSchool(school)),
    updateStudent : (student) => dispatch(updateStudent(student)),
    handleStudentChange : (studentId, schoolId) => dispatch(findAndUpdateStudent(studentId, schoolId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(School)