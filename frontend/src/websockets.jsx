import React from 'react';
import ActionCable from 'actioncable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as Actions from './constants'
import Alert from 'react-s-alert';

import {
  setActiveQuestion,
  addValidAnswer,
  addInvalidAnswer,
  clearInvalidAnswers,
  assignPoints
} from './game_actions'

class Websockets extends React.Component {
  constructor(props) {
    super(props);
    window._this = this
    this.performAction = this.performAction.bind(this)
  }

  componentDidMount() {
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    cable.subscriptions.create('QuestionChannel',  {
      connected() {
        console.log('connected:');
      },
      received: (data) => {
        console.log('received:', data);
        this.performAction(data)
      },
    });
  }
  addCustomNotification(content) {
    Alert.info(content, { html: true });
  }
  performAction = (data) => {
    switch (data.action) {
      case Actions.SET_ACTIVE_QUESTION:
        return this.props.setActiveQuestion(data.question, data.answers)
      case Actions.ADD_VALID_ANSWER:
        return this.props.addValidAnswer(data.answerId)
      case Actions.ADD_INVALID_ANSWER:
        return this.props.addInvalidAnswer(data.team)
      case Actions.CLEAR_INVALID_ANSWERS:
        return this.props.clearInvalidAnswers()
      case Actions.ASSIGN_POINTS:
        return this.props.assignPoints(data.team, data.points)
      case 'ADD_CUSTOM_NOTIFICATION':
        return this.addCustomNotification(data.content)
      default:
        return console.log('invalid action from controller', data.type);
   }
  }

  render() {
    return (
      <div className="container">
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
   setActiveQuestion,
   addValidAnswer,
   addInvalidAnswer,
   clearInvalidAnswers,
   assignPoints
 }, dispatch)
}
export default connect(null, mapDispatchToProps)(Websockets);