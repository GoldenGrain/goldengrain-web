import React from 'react';
import { Link } from 'react-router';
import { Table, Loader, Button, Message, Dimmer, Icon, Header, Grid, Checkbox, Modal, Segment } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastr';
import BreadcrumbCustom from 'ui/shared/BreadcrumbCustom';
import AvaliacaoApi from 'service/api/avaliacao.api';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

class Listagem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selecionados: 0,
            openModalExcluir: false,
            loading: false,
            items: [],
            item: {}
        }
    }

    componentWillMount() {
        AvaliacaoApi.getAll().then((res) => this.setState({ items: res.data }));
    }

    editar(itemEdit = null) {

        let item = itemEdit && itemEdit.codigo ? itemEdit : this.props.data.data.filter(x => x.selected)[0];

        this.props.router.push('/avaliacao/' + item.codigo);
    }

    rejeitar(item) {

        let {
            items
        } = this.state;

        items = items.filter(x => x.codigo != item.codigo);

        this.setState({ items });
    }

    verAvaliadores(item) {

        this.setState({ openModalAvaliadores: true, item });
    }

    get getModalAvaliadores() {

        const {
            openModalAvaliadores
        } = this.state;

        if (!openModalAvaliadores) return;

        const actions = [
            <Button content="Sair" color="red" onClick={() => this.setState({ openModalAvaliadores: false })} />
        ];

        return (<div>
            <Dialog
                title="Avaliadores Remotos"
                actions={actions}
                open={true}>

                <List>
                    <ListItem
                        primaryText="João da Cruz"
                        leftAvatar={<Avatar src="http://goiotronix.com/images/user-mobile.png" />}
                    />
                    <ListItem
                        primaryText="João Augusto"
                        leftAvatar={<Avatar src="http://goiotronix.com/images/user-mobile.png" />}
                    />
                    <ListItem
                        primaryText="Leonardo Pinheiro"
                        leftAvatar={<Avatar src="http://goiotronix.com/images/user-mobile.png" />}
                    />

                </List>
            </Dialog>

        </div>);
    }

    render() {

        let { selecionados, items, loading } = this.state;
        const editar = this.editar.bind(this);
        const rejeitar = this.rejeitar.bind(this);
        const verAvaliadores = this.verAvaliadores.bind(this);

        return (
            <div>

                {loading ? <Dimmer active inverted>
                    <Loader inverted />
                </Dimmer> : null}

                {this.getModalAvaliadores}

                <Grid divided='vertically'>
                    <Grid.Row>
                        <Grid.Column>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Segment>
                    <List>
                        <ListItem
                            primaryText="João da Cruz"
                            secondaryText="Poconé - MT"
                            leftAvatar={<Avatar src="http://goiotronix.com/images/user-mobile.png" />}
                        />
                        <ListItem
                            primaryText="João Augusto"
                            secondaryText="Várzea Grande - MT"
                            leftAvatar={<Avatar src="http://goiotronix.com/images/user-mobile.png" />}
                        />
                        <ListItem
                            primaryText="Leonardo Pinheiro"
                            secondaryText="Barra dos Bugres - MT"
                            leftAvatar={<Avatar src="http://goiotronix.com/images/user-mobile.png" />}
                        />
                        <ListItem
                            primaryText="Matheus Silva"
                            secondaryText="Cuiabá - MT"
                            leftAvatar={<Avatar src="http://goiotronix.com/images/user-mobile.png" />}
                        />
                        <ListItem
                            primaryText="Anderson Magalhães"
                            secondaryText="Sinop - MT"
                            leftAvatar={<Avatar src="http://goiotronix.com/images/user-mobile.png" />}
                        />

                    </List>
                </Segment>

            </div>
        )
    }
}

export default Listagem;
