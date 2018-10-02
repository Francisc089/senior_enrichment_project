import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSchool } from '../store.js'

class School extends Component {
  componentDidMount() {
    
    const schoolId = this.props.id
    this.props.fetchSchool(schoolId)
  }

  render () {
    const school = this.props.school;
    const students = school.students || []
    
    return (
      <div>
        <h3>{school.name} - {school.description}</h3>
        <ul>
          { students.map(student => {
            return <li key={student.id}>{student.firstName} {student.lastName}</li>
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { school : state.school }
};

const mapDispatchToProps = dispatch => {
  return { fetchSchool : (id) => dispatch(fetchSchool(id)) }
};

export default connect(mapStateToProps, mapDispatchToProps)(School)