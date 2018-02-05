import React, { Component } from 'react';

import { connect } from 'react-redux';
import { accessEditing } from '../../actions/todo';

class ShareTodo extends Component {
  accessTrue = (e) => {
    const {
      accessEditing,
      todo
    } = this.props;

    e.preventDefault()
    accessEditing(true, todo._id)
  }

  accessFalse = (e) => {
    const {
      accessEditing,
      todo
    } = this.props;
    
    e.preventDefault()
    accessEditing(false, todo._id)
  }

  render () {
    const {
      todo,
    } = this.props;

    console.log(this.props)

    return <div>
      {todo._id}
      <button onClick={this.accessTrue}>+</button>
      <button onClick={this.accessFalse}>-</button>
    </div>
  }
}

// const mapStateToProps = (state) => {
//   return {
//     todos: state.todos.filter((todo) => {
//       return todo.request === state.user.username;
//     })
//   }
// };

export default connect(null, { accessEditing })(ShareTodo)