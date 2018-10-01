import React, { Component} from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Students from './Students'
import Schools from './Schools'

export default class Main extends Component {
  render () {
    return (
      <HashRouter>
        <Switch>
          <Route exact path='/students' component={Students}/>
          <Route exact path='/schools' component={Schools} />
        </Switch>
      </HashRouter>
    )
  }
}