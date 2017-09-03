import React from "react";
import { connect } from 'react-redux';
import { Input, Menu, Segment, Icon } from 'semantic-ui-react';


class Header extends React.Component {

    render() {
        const { deslogar } = this.props;
        var userinfo = this.props.userinfo || {};

        return (
            <div>
                <nav className="navbar navbar-transparent navbar-absolute">
                    <div className="container-fluid">
                       
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;
