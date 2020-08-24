import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { getItems, deleteItem, editItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import './componetsStyle/ShoppingList.css';

class ShoppingList extends Component {


    state = {
        modal: false,
        id: '',
        name: ''
    };

    componentDidMount(){
        this.props.getItems();
    }
    

    
    static propTypes = {
        getItems: PropTypes.func.isRequired,                        
        deleteItem: PropTypes.func.isRequired,  
        editItem: PropTypes.func.isRequired,  
        isAuthenticated: PropTypes.bool,
    }
    
    onDeleteClick = (id) => {
        this.props.deleteItem(id)
    }
   

    onSubmit = e => {
        e.preventDefault();


        const editItem = {
            name: this.state.name
        }

        // Edit the item
        this.props.editItem(this.state.id, editItem);
        
        // // Get all updated items
        // this.props.getItems();


        this.toggle();

        window.location.reload();
    }

    toggle = (id, name) => {
        this.setState({ modal: !this.state.modal});
        this.setState({ id: id, name: name });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { items } = this.props.item;

        return (
        <div>
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                { this.props.isAuthenticated ? 
                                    <><i className="fas fa-edit" onClick={this.toggle.bind(this, _id, name)}></i>&ensp;<i onClick={this.onDeleteClick.bind(this, _id)} className="fas fa-trash-alt" style={{color: 'red'}}></i></>
                                    : null}
                                    &ensp;&ensp;{name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
            {/** Edit item */}
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Modify</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="item">Item</Label>
                            <Input
                                 type="text"
                                 name="id"
                                 id="item_id"
                                 defaultValue={this.state.id}
                                 hidden
                            />
                            <Input
                                type="text"
                                name="name"
                                id="item"
                                onChange={this.onChange}
                                defaultValue={this.state.name}
                            />
                            <Button color='dark' style={{ marginTop: '2rem' }} block>
                                UPDATE
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
        )
  }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getItems, deleteItem, editItem }) (ShoppingList)