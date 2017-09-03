import React from 'react';
import '../dashboard.scss';
import { List, Segment, Button, Card, Image, Icon, Table } from 'semantic-ui-react';
import { Accordion } from 'semantic-ui-react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import AvaliacaoApi from "service/api/avaliacao.api";
import { Chart } from 'react-google-charts';


class Listagem extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            openModal: false,
            avaliacao: {},
            tipo: localStorage.getItem('tipo') || 1,
            avaliacoesPendentes: []
        };

        if (!localStorage.getItem('tipo')) {
            this.props.router.push('/login');
        }
    }


    componentWillMount() {

        AvaliacaoApi.getAll().then((data) => {
            this.setState({ avaliacoesPendentes: data.data });
        });
    }


    rejeitar() {
        let {
            avaliacao,
            avaliacoesPendentes
        } = this.state;

        avaliacoesPendentes = avaliacoesPendentes.filter(x => x.codigo != avaliacao.codigo);

        this.setState({ avaliacoesPendentes, avaliacao: {} });
    }

    analisar() {
        this.props.router.push('/avaliacao/' + this.state.avaliacao.codigo);
    }

    get getModal() {

        const {
            avaliacao
        } = this.state;

        if (!avaliacao.codigo) return;

        const actions = [
            <Button primary content="Analisar" onClick={() => this.analisar()} />,
            <Button color="red" content="Rejeitar" onClick={() => this.rejeitar()} />,
            <Button content="Fechar" secondary onClick={() => this.setState({ openModal: false })} />,
        ];

        return (
            <Dialog
                title={"#" + avaliacao.codigo}
                actions={actions}
                open={this.state.openModal}>

                <Table celled striped stackable structured>

                    <Table.Body>

                        <Table.Row>
                            <Table.Cell>
                                {avaliacao.data}
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <b>Produtor:</b> {avaliacao.produtor}
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <b>Comprador:</b> {avaliacao.comprador}
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <b> Classificador:</b> {avaliacao.classificador}
                            </Table.Cell>
                        </Table.Row>

                    </Table.Body>

                </Table>

            </Dialog>
        );
    }

    verAvaliacao(avaliacao) {

        this.setState({
            openModal: true,
            avaliacao
        })
    }

    render() {

        const verAvaliacao = this.verAvaliacao.bind(this);

        const {
            avaliacoesPendentes,
            tipo
        } = this.state;

        const props = {
            "chartType": "ComboChart",
            "data": [
                ["Month", "Aproveitamento", "Perca"],
                ["2014", { v: 938, f: '87%' }, { v: 165, f: '13%' }],
                ["2015", { v: 1120, f: '88%' }, { v: 135, f: '12%' }],
                ["2016", { v: 1167, f: '84%' }, { v: 157, f: '16%' }],
                ["2017", { v: 1110, f: '90%' }, { v: 139, f: '10%' }]
            ],
            "width": "100%",
            "options": {
                "title": "",
                'legend': 'bottom',
                "hAxis": { "title": "Anual" },
                "seriesType": "bars",
                "series": {
                    "2": { "type": "line" }
                }
            }
        };

        const mensal = {
            "chartType": "BarChart",
            "data": [
                ["Month", "Avaliações"],
                ["Junho", 938],
                ["Julho", 780],
                ["Agosto", 767],
                ["Setembro", 310]
            ],
            "width": "100%",
            "options": {
                "title": "",
                'legend': 'bottom',
                "hAxis": { "title": "Mensal" }
            }
        };

        return (
            <div>

                {this.getModal}
                
                {
                    tipo == 2 ?
                        <div className="row">

                            <div className="col-md-6">

                                <Card fluid style={{ height: '370px' }}>
                                    <Card.Content style={{ height: '40px' }}>
                                        <Card.Header> <i className={'fa fa-clock-o text-warning'} /> Avaliações Pendente </Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        <List divided selection verticalAlign='middle'>
                                            {
                                                avaliacoesPendentes.map((item, key) => (
                                                    <List.Item key={key}>
                                                        <List.Content floated='right'>
                                                            <Button primary onClick={() => verAvaliacao(item)}>Ver</Button>
                                                        </List.Content>
                                                        <List.Icon name='tag' size='large' verticalAlign='middle' />
                                                        <List.Content>
                                                            <p>
                                                                <strong>#{item.codigo}</strong> - {item.data} (<strong>{item.comprador}</strong>)
                                                        </p>
                                                        </List.Content>
                                                    </List.Item>
                                                ))
                                            }
                                        </List>
                                    </Card.Content>

                                </Card>

                            </div>
                            <div className="col-md-6">

                                <Card fluid>

                                    <Card.Content>
                                        <Card.Header> <i className={'fa fa-bar-chart'} /> Total de Avaliações Através do Sistema </Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        <Chart {...mensal} />
                                    </Card.Content>
                                </Card>
                            </div>
                        </div> : null}

                <br />

                {tipo == 1 ?

                    <div className="row">

                        <div className="col-md-12">

                            <Card fluid>

                                <Card.Content>
                                    <Card.Header> <i className={'fa fa-pie-chart'} /> Índice de Avaliação </Card.Header>
                                </Card.Content>
                                <Card.Content>
                                    <Chart {...props} />
                                </Card.Content>
                            </Card>
                        </div>
                    </div> : null}

            </div>
        )
    }
}

export default Listagem;
