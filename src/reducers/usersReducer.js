import userImage01 from '../common/avatar/01.jpg'
import userImage02 from '../common/avatar/02.jpg'
import userImage03 from '../common/avatar/03.jpg'
import userImage04 from '../common/avatar/04.jpg'
import userImage05 from '../common/avatar/05.jpg'
import userImage06 from '../common/avatar/06.jpg'

const INITIAL_STATE = {
    list: [{
        id: 1,
        name: "user 01",
        role: 'role user 01',
        image: userImage01,
        selected: true
    },
    {
        id: 2,
        name: "user 02",
        role: 'role user 02',
        image: userImage02,
        selected: false
    },
    {
        id: 3,
        name: "user 03",
        role: 'role user 03',
        image: userImage03,
        selected: false
    },
    {
        id: 4,
        name: "user 04",
        role: 'role user 04',
        image: userImage04,
        selected: false
    },
    {
        id: 5,
        name: "user 05",
        role: 'role user 05',
        image: userImage05,
        selected: false
    },
    {
        id: 6,
        name: "user 06",
        role: 'role user 06',
        image: userImage06,
        selected: false
    }]
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SELECT_USER':
            return {
                ...state, 
                list: state.list.map(u => u.id === action.payload 
                    ? { ...u, selected: true } 
                    : { ...u, selected: false }
                )
            }

        default:
            return state
    }
}
