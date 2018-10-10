import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postStudent } from '../store.js';

class CreateStudent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName : '',
      lastName : '',
      gpa : ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const student = {...this.state, gpa : this.state.gpa * 1}
    console.log('student: ', student)
    this.props.postStudent(student)
    this.props.history.push('/students')
  }

  render () {
    const {firstName, lastName, gpa} = this.state
    const {handleChange, handleSubmit} = this
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
          <button type='submit'>Save</button>
        </form>
      </div>
    )
  }
}

/* const mapStateToProps = state => {
  return {
  
  }
} */

const mapDispatchToProps = dispatch => {
  return {
    postStudent : (student) => dispatch(postStudent(student))
  }
};

export default connect(null, mapDispatchToProps)(CreateStudent)