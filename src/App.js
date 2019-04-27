import React, { Component, Fragment } from "react";
import Contactlist from './components/index'
import Pagination from './pagination/index'

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Contacts</h1>
        {/* <Contactlist /> */}
        <Pagination />
      </div>
    )
  }
 
}
