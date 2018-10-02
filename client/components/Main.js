import React, { Component} from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Students from './Students'
import Schools from './Schools'
import Student from './Student'
import School from './School'

export default class Main extends Component {
  render () {
    return (
      <HashRouter>
        <Switch>
          <Route path='/students/:id' render={(routeProps) => <Student id={routeProps.match.params.id}/>} />
          <Route path='/schools/:id' render={(routeProps) => <School id={routeProps.match.params.id}/>}/> 
          <Route exact path='/students' component={Students}/>
          <Route exact path='/schools' component={Schools} />
        </Switch>
      </HashRouter>
    )
  }
}