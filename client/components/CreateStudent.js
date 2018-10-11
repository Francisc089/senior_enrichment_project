import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postStudent } from '../store.js';

class CreateStudent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName : '',
      lastName : '',
      gpa : '',
      schoolId : this.props.schoolId || 3
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name] : event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    const student = {...this.state, gpa : this.state.gpa * 1}
    console.log('student: ', student)
    this.props.postStudent(student)
    this.props.history.push('/students')
  }

  render () {
    const { firstName, lastName, gpa, schoolId } = this.state
    const {handleChange, handleSubmit} = this
    const { schools } = this.props;
    return (
      <div>
        <h2>Enter Student Info</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              First Name: <input type='text' id='firstName' name='firstName' value={firstName} onChange={handleChange}/>
            </label>
            
          </div>
          <div>
            <label>
              Last Name: <input id ='lastName' name='lastName' type='text' value={lastName} onChange={handleChange}/>
            </label>
          </div>
          <div>
            <label>
              GPA: <input id='gpa' name='gpa' type='text' value={gpa} onChange={handleChange}/>
            </label>
          </div>
          <div>
            <label>
              School: 
              <select name='schoolId' value={schoolId} onChange={handleChange}>
                <option>----</option>
                {
                  schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)
                }
              </select>
            </label>
          </div>
          <button type='submit'>Save</button>
        </form>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    schools : state.schools
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postStudent : (student) => dispatch(postStudent(student))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent)