import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSchools } from '../store.js'

class Schools extends Component {
  componentDidMount() {
    this.props.fetchSchools()
  }
  render () {
    const schools = this.props.schools;
    return (
      <div>
        <h2>All Schools</h2>
        <ul>
          { schools.map(school => {
          const studentCount = school.students.length
          return <li>{school.name} - # of students: {studentCount} </li>}) }
        </ul>
      </div>
    
    )
    //return a list of all schools with students
  }
}

const mapStateToProps = state => {
  return {
    schools : state.schools
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSchools : () => dispatch(fetchSchools())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schools)