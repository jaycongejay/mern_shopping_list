import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import LogOut from './auth/Logout';
import LoginModal from './auth/LoginModal';
import { connect } from 'react-redux';
import PropTypes from  'prop-types';
import './componetsStyle/AppNavbar.css';

class AppNavbar extends Component {
   
    state = {
        isOpen: false
    }


    static propTypes = {
        auth: PropTypes.object.isRequired,
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    
    render() {
        
        const { isAuthenticated, user } = this.props.auth;

        const authAccess = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong style={{color: 'white'}}>{ user ? `${ user.name }`: ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <LogOut/>
                </NavItem>
            </Fragment>
        );

        const guestAccess = (
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        );

        return(
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">ShoppingList</NavbarBrand>
                    <NavLink href="https://github.com/jaycongejay/mern_shopping_list" target="_blank"><i className="fab fa-github fa-2x" style={{color: 'white'}}></i></NavLink>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            { isAuthenticated ? authAccess : guestAccess}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {  })(AppNavbar);