import React, { Component } from 'react'
import '../common/dependencies'
import User from '../user/user'
import List from '../user/list'

export default class App extends Component {
    constructor() {
      super();
      this.state = {
        name: 'React'
      };
    }
  
    render() {
      return (
        <main className="container">
            <User />
            <List />
        </main>
      );
    }
}
  