import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteTask } from '../actions/tasksActions'
import { selectUser } from '../actions/userActions'
import Modal from './modal'

const TableHead = () => (
    <thead>
        <tr className="d-flex">
            <th className="col-sm-1"></th>
            <th className="col-sm-5"><span className="value-span">Descrição</span></th>
            <th className="col-sm-3"><span className="value-span">Responsável</span></th>
            <th className="col-sm-2"><span className="value-span">Status</span></th>
            <th className="col-sm-1"></th>
        </tr>
    </thead>
)

const ListPendentes = ({ list }) => (
    <div>
        <h1 className="table-title mt-5 mb-5"><span className="circle-title circle-orange"></span>Pendentes</h1>
        <table className='table table-borderless'>
            <TableHead />
            <tbody>
                {list}
            </tbody>
        </table>
    </div>
)

const ListEmProducao = ({ list }) => (
    <div>
        <h1 className="table-title mt-5 mb-5"><span className="circle-title circle-yellow"></span>Em Produção</h1>
        <table  className='wip table table-borderless'>
            <TableHead />
            <tbody>
                {list}
            </tbody>
        </table>
    </div>
)

const ListResolvida = ({ list }) => (
    <div>
        <h1 className="table-title mt-5 mb-5"><span className="circle-title circle-green"></span>Resolvido</h1>
        <table className='table table-borderless'>
            <TableHead />
            <tbody>
                {list}
            </tbody>
        </table>
    </div>
)

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            oldTask: []
        }
    }

    showModal(taskToEdit) {
        this.setState({ show: true, oldTask: taskToEdit })
    }


    hideModal() {
        this.setState({ show: false })
    }

    renderRows(status, color) {
        const { users, tasks, deleteTask, selectUser } = this.props
        const usersList = users || []
        const list = tasks || []
        const filtredList = list.filter(l => l.status === status)

        return filtredList.map(task => {
            const userTask = usersList.find(u => u.id == task.user_id)
            return (
                <tr
                draggable 
                className="table-node" key={task.id}>
                    <td className="col-sm-1"><span className="icon-drag"></span></td>
                    <td className="col-sm-5">
                        <div onClick={() => this.showModal(task)} className="table-node-cell">
                            <span>{task.description}</span>
                        </div>
                        <div className="table-node-cell-line"></div>
                    </td>
                    <td className="col-sm-3" onClick={() => selectUser(userTask.id)}>
                        <div className="table-node-cell">
                            <img src={userTask.image} className="user-img-list" alt="" />
                            <span className={`user-list-name ml-4 ${userTask.selected ? 'font-weight-bold' : ''}`}>{userTask.name}</span>
                        </div>
                        <div className="table-node-cell-line"></div>
                    </td>
                    <td className="col-sm-2">
                        <div className="table-node-cell">
                            <span className="user-list-name text-capitalize "><span className={`circle-node-cell circle-${color}`}></span>{task.status === 'emProducao' ? 'Em Producão' : task.status}</span>
                        </div>
                        <div className="table-node-cell-line"></div>

                    </td>
                    <td className="col-sm-1 text-center" onClick={() => deleteTask(task.id)}>
                        <span className="icon-trash"></span>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <ListPendentes list={this.renderRows('pendente', 'orange' )} />
                <ListEmProducao list={this.renderRows('emProducao', 'yellow')} />
                <ListResolvida list={this.renderRows('resolvida', 'green')} />

                <Modal 
                    title="Editar Task"
                    user_id={false}
                    oldTask={this.state.oldTask}
                    edit={true}
                    show={this.state.show}
                    handleClose={() => this.hideModal()} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    tasks: state.tasks.list,
    users: state.users.list
})
const mapDispatchToProps = dispatch =>
    bindActionCreators({ deleteTask, selectUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(List)