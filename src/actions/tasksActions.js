export const addTask = (task) => {
    return { type: 'ADD_TASK', payload: task }
}

export const editTask = (task) => {
    return { type: 'EDIT_TASK', payload: task }
}

export const deleteTask = (id) => {
    return { type: 'DELETE_TASK', payload: id }
}