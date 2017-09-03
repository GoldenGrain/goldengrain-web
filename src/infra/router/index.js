import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import React from 'react';
import App from '../../App';
import Dashboard from 'ui/app/Dashboard';
import Avaliacao from 'ui/app/Avaliacao';
import authGuard from 'service/shared/auth-guard'

import LoginPage from 'ui/app/Login/LoginPage';

export default (

    <Router history={hashHistory}>

        <Route path="/login" component={LoginPage} onEnter={authGuard.handleNoAuth} />

        <Route path="/" name="HackAthon" component={App} onChange={authGuard.handleNoAuth}>

            <Route path="" name="Dashboard" onChange={authGuard.handleNoAuth}>
                <IndexRoute component={Dashboard.DashboardPages.Listagem} />
            </Route>

            <Route path="avaliacao" name="Avaliacao" onChange={authGuard.handleNoAuth}>

                <Route path="" name="Avaliacao" onChange={authGuard.handleNoAuth}>

                    <IndexRoute component={Avaliacao.AvaliacaoPages.Listagem} />

                    <Route path="novo" name="Cadastrar" component={Avaliacao.AvaliacaoPages.Cadastro} onChange={authGuard.handleNoAuth} />

                    <Route path=":id" name="Editar" onChange={authGuard.handleNoAuth}>

                        <IndexRoute name="Editar" component={Avaliacao.AvaliacaoPages.Cadastro} />

                    </Route>

                </Route>

            </Route>

            <Route path="avaliadores" name="Avaliador" onChange={authGuard.handleNoAuth}>

                <Route path="" name="Avaliador" onChange={authGuard.handleNoAuth}>

                    <IndexRoute component={Avaliacao.AvaliadorPages.Listagem} />

                    <Route path="novo" name="Cadastrar" component={Avaliacao.AvaliadorPages.Cadastro} onChange={authGuard.handleNoAuth} />

                    <Route path=":id" name="Editar" onChange={authGuard.handleNoAuth}>

                        <IndexRoute name="Editar" component={Avaliacao.AvaliadorPages.Cadastro} />

                    </Route>

                </Route>

            </Route>

        </Route>

    </Router>
);