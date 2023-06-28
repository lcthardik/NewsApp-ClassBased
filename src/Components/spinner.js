import React, { Component } from 'react'
import Loading from './loading.gif'

export default class spinner extends Component {
  render() {
    return (
      <div className="text-center my-2">
        <img src={Loading} alt="loading" />
      </div>
    )
  }
}
