import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSchool, deleteSchool } from '../store.js'

class School extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete (event) {
    event.preventDefault()
    console.log(this.props.school)
    this.props.deleteSchool(this.props.school)
    this.props.history.push('/schools')
  }

  componentDidMount() {
    const schoolId = this.props.id
    this.props.fetchSchool(schoolId)
  }

  render () {
    const school = this.props.school;
    const students = school.students || [];
    const { handleDelete } = this;
    
    return (
      <div>
        <h3>{school.name} - {school.description}</h3>
        <ul>
          { students.map(student => {
            return <li key={student.id}>{student.firstName} {student.lastName}</li>
          })}
        </ul>
        <div>
          <button type='button' onClick={handleDelete}>Delete School</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { school : state.school }
};

const mapDispatchToProps = dispatch => {
  return { 
    fetchSchool : (id) => dispatch(fetchSchool(id)),
    deleteSchool : (school) => dispatch(deleteSchool(school)) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(School)