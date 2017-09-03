import React from 'react';
import { Link } from 'react-router';
import LoadingOverlay from 'ui/shared/Loading';
import './login-page.scss';
import imgLogo from './logo-badge.png';
import imgBG from './bg.png';
import { Button } from 'semantic-ui-react';

class Login extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            tipo: 0
        }
    }

    handleSubmit(e) {

        e.preventDefault();

        this.props.router.push('/');
    }

    selecionarTipoLogin(tipo) {

        this.setState({ tipo });
    }

    render() {

        const { entrar, setCPF, setPassword, loading, cpfErro, passwordErro } = this.props;
        const selecionarTipoLogin = this.selecionarTipoLogin.bind(this);
        const tipo = this.state.tipo;

        var classUsername = "pt-input username pt-large ";
        var usernameGroupClassName = "pt-input-group ";
        var classPassword = "pt-input password pt-large ";
        var errors = [];


        return (
            <div className="container login-page">
                <div className="background" style={{ backgroundImage: 'url(' + imgBG + ')', backgroundSize: '100%' }} >

                    <div className="login pt-elevation-1">

                        <img className="login-logo-image" src={imgLogo} />

                        <div className={tipo == 0 ? "show" : "hide"} style={{ padding: '15px' }}>
                            <Button content="Sou Produtor" fluid primary size={'large'} onClick={() => selecionarTipoLogin(1)} />
                            <hr />
                            <Button content="Sou Classificador" fluid secondary size={'large'} onClick={() => selecionarTipoLogin(2)} />
                        </div>

                        <form onSubmit={e => this.handleSubmit(e)} className={tipo != 0 ? "show" : "hide"}>

                            {/*<ErrorDialog state="login" title="Não foi possivel entrar" />*/}
                            <div className={usernameGroupClassName}>
                                <input className={classUsername} onChange={ev => setCPF(ev.target.value)} type="text" placeholder="USUARIO" dir="auto" />
                            </div>
                            <br />
                            <input className={classPassword} onChange={ev => setPassword(ev.target.value)} type="password" placeholder="SENHA" dir="auto" />
                            <br />
                            <button className="entrar pt-button pt-large pt-intent-warning" type="submit">ENTRAR</button>
                            <br />
                        </form>
                        <LoadingOverlay loading={loading} />
                    </div>
                </div>
            </div>

        )

    }
}

export default Login;
