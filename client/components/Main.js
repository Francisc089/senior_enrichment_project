import React, { Component} from 'react'
import { HashRouter, Route, Switch, Link } from 'react-router-dom'
import Students from './Students'
import Schools from './Schools'
import Student from './Student'
import School from './School'
import CreateSchool from './CreateSchool'
import CreateStudent from './CreateStudent'

export default class Main extends Component {

  render () {
    return (
      <HashRouter>
        <div>
          <ul>
            <li><Link to='/students'>Students</Link></li>
            <li><Link to='/schools'>Schools</Link></li>
            <li><Link to='/schools/create'>Create School</Link></li>
            <li><Link to='/students/create'>Create Student</Link></li>
          </ul>
          <Switch>
            <Route exact path='/schools/create' render={({ history }) => <CreateSchool history={history}/>} />
            <Route exact path='/students/create' render={({ history }) => <CreateStudent history={history}/>} />
            <Route path='/students/:id' render={({ match, history }) => <Student id={match.params.id * 1} history={history}/>} />
            <Route path='/schools/:id' render={({ match, history }) => <School id={match.params.id * 1} history={history}/>}/> 
            <Route exact path='/students' component={Students}/>
            <Route exact path='/schools' render={()=>  <Schools />} />
          </Switch>
        </div>
      </HashRouter>
    )
  }
}