import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStudent, deleteStudent } from '../store.js'

class Student extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {

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
    const student = this.props.student;
    const school = student.school || {}
    const { handleDelete, handleChange } = this;
    return (
      <div>
        <h3>{student.firstName} {student.lastName} - {school.name} GPA : {student.gpa}</h3> 
        <h2>Update Student</h2>
        <form>
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
          <button type='submit'>Save</button>
          <button type='button' onClick={handleDelete}>Delete</button>
        </form>
      </div>
      
    )
  }
}

const mapStateToProps = state => {
  return { student : state.student }
};

const mapDispatchToProps = dispatch => {
  return { 
    fetchStudent : (id) => dispatch(fetchStudent(id)),
    deleteStudent : (student) => dispatch(deleteStudent(student)) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student)