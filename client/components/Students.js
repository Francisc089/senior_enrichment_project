import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStudents } from '../store.js'

class Students extends Component {
  componentDidMount() {
    this.props.fetchStudents()
  }

  render () {
    const students = this.props.students;

    return (
      <div>
        <h2>All Students</h2>
        <ul>
          { students.map(student => {
            return <li>{student.firstName} {student.lastName} - School: {student.school.name}</li>
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    students : state.students
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStudents : () => dispatch(fetchStudents())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Students)