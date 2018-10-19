const INITIAL_STATE = {
    list: [{
        id: 1,
        description: 'task 1',
        status: 'pendente',
        user_id: 1,
    },
    {
        id: 2,
        description: 'task 2',
        status: 'resolvida',
        user_id: 1,
    },
    {
        id: 3,
        description: 'task 3',
        status: 'emProducao',
        user_id: 2,
    },
    {
        id: 4,
        description: 'task 4',
        status: 'resolvida',
        user_id: 3,
    },
    {
        id: 5,
        description: 'task 5',
        status: 'pendente',
        user_id: 3,
    },
    {
        id: 6,
        description: 'task 6',
        status: 'resolvida',
        user_id: 4,
    },
    {
        id: 7,
        description: 'task 7',
        status: 'pendente',
        user_id: 5,
    },
    {
        id: 8,
        description: 'task 8',
        status: 'resolvida',
        user_id: 6,
    }]
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return { ...state, list: [...state.list, action.payload] }
        case 'EDIT_TASK':
            return {
                ...state, 
                list: state.list.map((task) => task.id === action.payload.id
                    ? { ...task, status: action.payload.status }
                    : task)
            }
        case 'DELETE_TASK':
            return { ...state, list: state.list.filter(t => t.id !== action.payload) }
        default:
            return state
    }
}
