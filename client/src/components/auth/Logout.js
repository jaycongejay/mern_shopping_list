import React, { Component, Fragment } from 'react';
import {  NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';           // <=== logout
import PropTypes from  'prop-types';

class LogOut extends Component {

    static propTypes = {
        logout: PropTypes.func.isRequired,                        // <=== logout
    }

    render() {
        return (
           <Fragment>
               <NavLink onClick={this.props.logout} href="#">
                   Log Out
               </NavLink>
           </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

// logout
export default connect(mapStateToProps, { logout })(LogOut); 