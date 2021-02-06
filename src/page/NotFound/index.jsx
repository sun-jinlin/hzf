import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class NotFound extends Component {
  render() {
    return (
      <div>
        <center>
          <p>迷路了吗</p>
          <Link to="/home">回家看看</Link>
        </center>

      </div>
    )
  }
}
export default NotFound