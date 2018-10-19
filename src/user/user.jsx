import React, { Component } from 'react'
import { connect } from 'react-redux'
import iconActive from '../common/icons/icon-user-active.png'
import Modal from './modal'

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    showModal() {
        this.setState({ show: true })
    }

    hideModal() {
        this.setState({ show: false })
    }

    render() {
        const { users, tasks } = this.props
        const selectedUser = users.filter(u => u.selected)[0]
        
        const pendentes = tasks.filter(t => t.user_id === selectedUser.id && t.status === 'pendente').length
        const emProducao = tasks.filter(t => t.user_id === selectedUser.id && t.status === 'emProducao').length
        const resolvidas = tasks.filter(t => t.user_id === selectedUser.id && t.status === 'resolvida').length
        return (
            <div className="row user-container mb-user">
                <div className="col-sm-2">
                    <div className="image-container">
                        <img alt="user" src={selectedUser.image} className="user-image thumbnail img-responsive" />
                    </div>
                </div>
                <div className="col-sm-1">
                    <img alt="user" src={iconActive} className="float-right mt-5" />
                </div>
                <div className="col-sm-3">
                    <span className="d-block user-title mt-5">{selectedUser.name}</span>
                    <span className="d-block value-span mt-2 mb-5">{selectedUser.role}</span>
                    <hr></hr>
                    <h1 className="value-span">Você possui:</h1>
                    <div className="row no-gutters">
                        <div className="col">
                            <span className="value-number">{pendentes < 10 ? "0"+pendentes : pendentes}</span>
                            <span className="value-span">pendentes</span>
                        </div>
                        <div className="col">
                            <span className="value-number">{emProducao < 10 ? "0"+emProducao : emProducao}</span>
                            <span className="value-span">em producão</span>
                        </div>
                        <div className="col">
                            <span className="value-number">{resolvidas < 10 ? "0"+resolvidas : resolvidas}</span>
                            <span className="value-span">resolvidas</span>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 button-container">
                    <button type="button" className="btn btn-primary btn-lg btn-plus" onClick={() => this.showModal()}>
                        <span className="icon-Add icon-plus"></span>
                        <span>Adicionar Task</span></button>
                </div>
                <Modal title="Adicionar Task" user_id={selectedUser.id} edit={false} oldTask={false} show={this.state.show} handleClose={() => this.hideModal()} />
            </div>

        );
    }
}

const mapStateToProps = state => ({
    tasks: state.tasks.list,
    users: state.users.list
})

export default connect(mapStateToProps, null)(User)