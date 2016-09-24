import * as Actions from './constants'

const initialState = {
  current_question: {title: 'currentquestion'},
  current_answers: [{id: 1, title: '2', points: '22'}],
  current_score: 0,
  valid_answers: [1],
  invalid: { red: 0, blue: 0 },
  score: { red: 0, blue: 0 }
}

export default function (state = initialState, action) {
  console.log('reducer:', action);
  switch (action.type) {
    case Actions.SET_ACTIVE_QUESTION:
      return (
        Object.assign({}, state, {
          current_question: action.question,
          current_answers: action.answers
        })
      )
    case Actions.ADD_VALID_ANSWER:
      return (
        Object.assign({}, state, {
          valid_answers: state.valid_answers.concat(parseInt(action.answerId))
        })
      )
    case Actions.ADD_INVALID_ANSWER:
      return (
        Object.assign({}, state,
          {
            invalid: Object.assign(
              {},
              state.invalid,
              { [action.team]: state.invalid[action.team] + 1})
          }
        )
        )
    case Actions.ASSIGN_POINTS:
      return (
        Object.assign({}, state,
          {
            score: Object.assign(
              {},
              state.score,
              { [action.team]: parseInt(state.score[action.team]) + parseInt(action.points)})
          }
        )
      )
    case Actions.CLEAR_INVALID_ANSWERS:
      return (
        Object.assign({}, state,
          {
            invalid: {red: 0, blue: 0}
          }
        )
      )
    default:
      return state
  }
}