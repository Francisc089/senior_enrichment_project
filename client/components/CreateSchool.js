import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postSchool } from '../store.js'

class CreateSchool extends Component {
  constructor () {
    super()
    this.state = {
      name : '',
      address : '',
      description : ''
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
    const school = {...this.state}
    this.props.postSchool(this.state)
    this.props.history.push('/schools')
  }

  render () {
    const { name, address, description } = this.state
    const {handleChange, handleSubmit} = this
    return (
      <div>
        <h3>Create School</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              School Name: <input name='name' type='text' value={name} onChange={handleChange}/>
            </label>
          </div>
          <div>
            <label>
              Address: <input name='address' type='text' value={address} onChange={handleChange}/>
            </label>
          </div>
          <div>
            <label>
              Description: <input name='description' type='text' value={description} onChange={handleChange}/>
            </label>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

/*
const mapStateToProps = state => {
  return {

  }
} */

const mapDispatchToProps = dispatch => {
  return {
    postSchool : (school) => dispatch(postSchool(school))
  }
};

export default connect(null, mapDispatchToProps)(CreateSchool)