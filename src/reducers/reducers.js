import { combineReducers } from 'redux'
import tasksReducer from './tasksReducer'
import usersReducer from './usersReducer'
import { createForms } from 'react-redux-form'

const initialTaskState = {
    id: '',
    description: '',
    status: 'pendente',
    user_id: '',
}
  
const rootReducer = combineReducers({
    tasks: tasksReducer,
    users: usersReducer,
    ...createForms({
        task: initialTaskState,
    }),
})

export default rootReducer