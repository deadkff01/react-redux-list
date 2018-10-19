import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Control, Form } from 'react-redux-form';
import { reduxForm } from 'redux-form'
import { addTask, editTask } from '../actions/tasksActions'

const initialState = {
    description: '',
    status: 'pendente'
};

class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    handleChange(e) {
        this.setState({ ...this.state, [e.target.name]: e.target.value })

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.oldTask !== false) {
            this.setState({
                description: nextProps.oldTask.description,
                status: nextProps.oldTask.status
            })
        }
    }

    handleSubmit() {
        const { addTask, editTask, edit, user_id, handleClose, oldTask } = this.props
        const taskToSave = {
            id: !edit ? Date.now() : oldTask.id,
            description: this.state.description,
            status: this.state.status,
            user_id: !edit ? user_id : oldTask.user_id,
        }
        if (!edit) {
            addTask(taskToSave)
        } else {
            editTask(taskToSave)
        }
        this.setState(initialState)
        handleClose()
    }

    closeModal() {
        const { handleClose } = this.props
        this.setState(initialState)
        handleClose()
    }

    render() {
        const { title, handleClose, show } = this.props
        const showHideClassName = show ? "modal show display-block" : "modal display-none";
        return (
            <div className={showHideClassName} id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <Form model="task"
                            onSubmit={() => this.handleSubmit()}>
                            <div className="modal-header">
                                <h4 className="modal-title">{title}</h4>
                                <button type="button" className="close" onClick={handleClose} data-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="descricaoDaTask">Descricao da Task:</label>
                                    <Control.text
                                        model="task.description"
                                        name="description"
                                        value={this.state.description || ''}
                                        onChange={(e) => this.handleChange(e)}
                                        className="form-control"
                                        id="descricaoDaTask"
                                        placeholder="Descrição Task" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Status:</label>

                                    <Control.select model="task.status" name="status" onChange={(e) => this.handleChange(e)} value={this.state.status || 'pendente'} className="form-control form-control-lg">
                                        <option value="pendente">Pendente</option>
                                        <option value="emProducao">Em produção</option>
                                        <option value="resolvida">Resolvida</option>
                                    </Control.select>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success">Salvar</button>
                                <button type="button" onClick={() => this.closeModal()} className="btn btn-light" data-dismiss="modal">Cancelar</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
};
const mapStateToProps = state => ({ tasks: state.tasks.list })
const mapDispatchToProps = dispatch =>
    bindActionCreators({ addTask, editTask }, dispatch)
Modal = connect(mapStateToProps, mapDispatchToProps)(Modal)

export default reduxForm({
    form: 'modalForm',
    enableReinitialize: true
})(Modal)