import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSchools } from '../store.js'
import { Link } from 'react-router-dom'

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
          return (
            <Link key={school.id} to={`/schools/${school.id}`}>
              <li key={school.id}>{school.name} - {studentCount} </li>
            </Link>
          )}) }
        </ul>
      </div>
    
    )
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