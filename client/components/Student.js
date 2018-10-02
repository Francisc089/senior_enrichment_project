import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStudent } from '../store.js'

class Student extends Component {
  componentDidMount() {
    const studentId = this.props.id
    this.props.fetchStudent(studentId)
  }

  render () {
    const student = this.props.student;
    const school = student.school || {}
    return (
      <div>
        <h3>{student.firstName} {student.lastName} - {school.name} GPA : {student.gpa}</h3>

      </div>
      
    )
  }
}

const mapStateToProps = state => {
  return { student : state.student }
};

const mapDispatchToProps = dispatch => {
  return { fetchStudent : (id) => dispatch(fetchStudent(id)) }
};

export default connect(mapStateToProps, mapDispatchToProps)(Student)