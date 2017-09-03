import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import { Dropdown, Menu, Icon } from 'semantic-ui-react';

class Sidebar extends Component {

    constructor(props) {

        super(props);

        this.state = { activeItem: null };
    }

    handleNodeClick(action) {
        this.props.router.push(action);
        this.setState({ activeItem: action });
    }

    render() {

        const { activeItem } = this.state;

        return (
            <div className="sidebar-inner">

                <div className="navegacao-text-div"> HackAthon </div>

                <div className="sidebar" data-active-color="rose" data-background-color="black" data-image="/sidebar-1.jpg">

                    <div className="logo">
                        <a href="/" className="simple-text">
                            HackAthon
                        </a>
                    </div>
                    <div className="logo logo-mini">
                        <a href="/" className="simple-text">
                            HA
                        </a>
                    </div>
                    <div className="sidebar-wrapper">
                        <div className="user">
                            <div className="photo">
                                <img src="http://goiotronix.com/images/user-mobile.png" />
                            </div>
                            <div className="info">
                                <a data-toggle="collapse" href="/" className="collapsed">
                                    Usuario da Silva
                                </a>
                            </div>
                        </div>
                        <ul className="nav">
                            <li className={activeItem == '/' ? 'active' : ''} onClick={() => this.handleNodeClick('/')}>
                                <a>
                                    <p>
                                        <i className="mdi mdi-view-dashboard"></i> Página Inicial
                                    </p>
                                </a>
                            </li>
                            <li className={activeItem == '/avaliacao' ? 'active' : ''} onClick={() => this.handleNodeClick('/avaliacao')}>
                                <a>
                                    <p>
                                        <i className="mdi mdi-file"></i> Avaliações
                                    </p>    
                                </a>
                            </li>
                            <li className={activeItem == '/avaliadores' ? 'active' : ''} onClick={() => this.handleNodeClick('/avaliadores')}>
                                <a>
                                    <p>
                                        <i className="mdi mdi-account-multiple"></i> Avaliadores
                                    </p>    
                                </a>
                            </li>
                            <li className={activeItem == '/pagamento' ? 'active' : ''} onClick={() => this.handleNodeClick('/pagamento')}>
                                <a>
                                    <p>
                                        <i className="mdi mdi-alarm-check"></i> Pagamento
                                    </p>    
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Sidebar);
