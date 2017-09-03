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
                    <Table celled striped stackable structured>

                        <Table.Header>
                            <Table.Row>
                                {/* <Table.HeaderCell style={{ width: '35px' }} textAlign='center'> <Checkbox checked={selecionados == items.length} onChange={() => selectedAll()} /> </Table.HeaderCell> */}
                                <Table.HeaderCell style={{ width: '70px' }} >Código</Table.HeaderCell>
                                <Table.HeaderCell style={{ width: '150px' }} >Data</Table.HeaderCell>
                                <Table.HeaderCell>Produtor</Table.HeaderCell>
                                <Table.HeaderCell>Comprador</Table.HeaderCell>
                                <Table.HeaderCell>Classificador</Table.HeaderCell>
                                <Table.HeaderCell style={{ width: '35px' }} >Status</Table.HeaderCell>
                                <Table.HeaderCell style={{ width: '185px' }} >Ações</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>

                            {
                                items.map((item, key) => (

                                    <Table.Row key={key} className={'link ' + (item.selected ? 'selecionado' : '')}>
                                        {/* <Table.Cell textAlign='center'>
                                            <Checkbox checked={item.selected} onChange={() => selected(item)} />
                                        </Table.Cell> */}
                                        <Table.Cell onDoubleClick={() => editar(item)}>
                                            {item.codigo}
                                        </Table.Cell>
                                        <Table.Cell onDoubleClick={() => editar(item)}>
                                            {item.data}
                                        </Table.Cell>
                                        <Table.Cell onDoubleClick={() => editar(item)}>
                                            {item.produtor}
                                        </Table.Cell>
                                        <Table.Cell onDoubleClick={() => editar(item)}>
                                            {item.comprador}
                                        </Table.Cell>
                                        <Table.Cell onDoubleClick={() => editar(item)}>
                                            {item.classificador}
                                        </Table.Cell>
                                        <Table.Cell textAlign="center" onDoubleClick={() => editar(item)}>
                                            <i title={item.status} className={'fa ' + (item.status_id == 2 ? 'fa-check-circle text-success' : (item.status_id == 1 ? 'fa-clock-o text-warning' : 'fa-ban text-danger'))} />
                                        </Table.Cell>
                                        <Table.Cell textAlign="center" onDoubleClick={() => editar(item)} >
                                            {item.status_id != 2 ? <Button color="blue" size="small" onClick={() => editar(item)} > <span> Avaliar </span>  </Button> : null}
                                            {item.status_id != 2 ? <Button color="red" size="small" onClick={() => rejeitar(item)}> <span> Rejeitar </span>  </Button> : null}
                                            {item.status_id != 1 ? <Button color="blue" size="small" onClick={() => verAvaliadores(item)} title="Ver Avaliadores"> <span className="fa fa-users"> </span>  </Button> : null}
                                            {item.status_id != 1 ? <Button color="green" size="small" onClick={() => editar(item)}> <span> Ver Laudo </span>  </Button> : null}
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            }

                        </Table.Body>

                    </Table>
                </Segment>

            </div>
        )
    }
}

export default Listagem;
