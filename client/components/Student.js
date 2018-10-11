import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStudent, deleteStudent, updateStudent, _updateStudent } from '../store.js'

class Student extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    event.preventDefault()
    const student = {...this.props.student, [event.target.name]: event.target.value}
    this.props.handleChange(student)
  }

  handleSubmit(event) {
    event.preventDefault()
    const newStudent = {...this.props.student, gpa : this.props.student.gpa *1}
    this.props.updateStudent(newStudent)
  }

  handleDelete(event) {
    event.preventDefault()
    this.props.deleteStudent(this.props.student)
    this.props.history.push('/students')
  }

  componentDidMount() {
    const studentId = this.props.id
    this.props.fetchStudent(studentId)
  }

  render () {
    const { student, schools } = this.props;
    const school = student.school || {};
    const { handleDelete, handleChange, handleSubmit } = this;
    return (
      <div>
        <h2>Student Information</h2>
          <p>Name: {student.firstName} {student.lastName}</p> 
          <p>School: {school.name} GPA: {student.gpa}</p>
        <h4>Update Student</h4>
        <div>
          <form onSubmit={handleSubmit}> 
            <div>
              <label>
                First Name: <input type='text' id='firstName' name='firstName' value={student.firstName} onChange={handleChange}/>
              </label>
                
            </div>
            <div>
              <label>
                Last Name: <input id ='lastName' name='lastName' type='text' value={student.lastName} onChange={handleChange}/>
              </label>
            </div>
            <div>
              <label>
                GPA: <input id='gpa' name='gpa' type='text' value={student.gpa} onChange={handleChange}/>
              </label>
            </div>
            <div>
              <label> School: 
                <select name='schoolId' onChange={handleChange} value={student.schoolId ? student.schoolId : 'null'}>
                  <option value={''}>None</option>
                  {
                    schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)
                  }
                </select>
              </label>
            </div>
            <button type='submit'>Save</button>
            <div>
              <h4>Delete Student</h4>
              <button type='button' onClick={handleDelete}>Click here</button>
            </div>
          </form>
        </div>
      </div>
      
    )
  }
}

const mapStateToProps = state => {
  console.log('MSTP: ', state)
  return { 
    student : state.student,
    schools : state.schools 
  }
};

const mapDispatchToProps = dispatch => {
  return { 
    fetchStudent : (id) => dispatch(fetchStudent(id)),
    deleteStudent : (student) => dispatch(deleteStudent(student)),
    handleChange : (student) => dispatch(_updateStudent(student)),
    updateStudent : (student) => dispatch(updateStudent(student))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student)