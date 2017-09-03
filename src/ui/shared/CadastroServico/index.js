import React from "react";
import ServicoApi from 'service/api/servico.api';
import Tables from './Tables';
// import Filtro from "shared/components/Filtro";
import Pagination from "ui/shared/Pagination";
import SelectTipoServico from "ui/shared/Selects/SelectTipoServico";
import { Dimmer, Loader } from 'semantic-ui-react';
import { Table, Form, TextArea, Button, Icon, Header, Modal, Grid } from 'semantic-ui-react';
import CurrencyInput from 'react-currency-input';

class CadastroServico extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            loading: true,
            openModalNovo: false,
            servico: null,
            selecteds: [],
            comissao: 0,
            res: {}
        }
    }

    componentWillMount() {

        this.setState({ comissao: 0 });

        this.get();
    }

    novo() {
        this.setState({
            openModalNovo: true,
            servico: {
                preco: (0).toFixed(3)
            }
        });
    }

    setProp(prop, value) {

        let servico = this.state.servico;

        servico[prop] = value;

        this.setState({ servico });
    }

    salvar() {

        this.setState({ loading: true });

        let servico = this.state.servico;

        servico.valor = (servico.valor || 0).toString();

        if (~servico.valor.indexOf(',')) {
            servico.valor = servico.valor.replace(/\./g, '').replace(/\,/g, '.');
        }

        ServicoApi.save(servico).then(() => {

            this.setState({ servico: null, openModalNovo: false });

            this.get();
        })
    }

    editar(servico) {
        this.setState({ openModalNovo: true, servico });
    }

    get getModalServico() {

        let { servico, loading } = this.state;

        servico = servico || {};

        return (
            <Modal open={this.state.openModalNovo} size='large' closeOnDocumentClick={true}>

                <Header icon='archive' content='Novo Serviços' />

                <Modal.Content>

                    <Grid>

                        <Grid.Row>

                            <Grid.Column>

                                <h2> Informações Básicas </h2>

                                <Form>

                                    <Grid columns={3}>

                                        <Grid.Row>

                                            <Grid.Column>
                                                <SelectTipoServico disabled={loading} label="Tipo do Serviço" value={servico.tipo_servico_id} onChange={(e, select) => this.setProp("tipo_servico_id", select.value)} />
                                            </Grid.Column>

                                            <Grid.Column>
                                                <Form.Input disabled={loading} label="Nome" value={servico.nome} onChange={(e, input) => this.setProp("nome", input.value)} />
                                            </Grid.Column>

                                            <Grid.Column>
                                                <Form.Field>
                                                    <label> Preço </label>
                                                    <CurrencyInput disabled={loading} precision="2" thousandSeparator="." value={servico.preco} onChange={e => this.setProp("preco", e)} decimalSeparator="," prefix="R$" />
                                                </Form.Field>
                                            </Grid.Column>

                                        </Grid.Row>

                                    </Grid>

                                </Form>

                            </Grid.Column>

                        </Grid.Row>

                    </Grid>

                </Modal.Content>

                <Modal.Actions>
                    <Button disabled={loading} onClick={() => this.setState({ openModalNovo: false, servico: null })} content="Cancelar" />
                    <Button primary disabled={loading} onClick={() => this.salvar()} icon="save" content="Salvar" />
                </Modal.Actions>

            </Modal >
        )
    }

    get(params = {}) {

        this.setState({ loading: true });

        if (!this.props.noPaginate) params.paginate = true;

        ServicoApi.getAll(params).then((res) => {

            let data = res.data;

            (this.props.servicos || []).forEach((item) => {

                data.forEach(i => {
                    if (i.id == item.id) {
                        i.check = true;
                    }
                })
            });

            this.setState({ loading: false, res: { data } });
        });
    }

    selecionar(item) {
        item.check = !item.check;
    }

    onClose() {

        let selecteds = this.state.res.data.filter(x => x.check);

        this.props.onClose(selecteds);
    }

    render() {

        let { res, loading, servico } = this.state;

        return (
            <div>

                {this.getModalServico}

                <Grid columns={1} padded>
                    <Grid.Row>
                        <Grid.Column>

                            <Button disabled={loading} loading={loading} color="teal" content="Criar Novo" onClick={() => this.novo()} />

                            {/*<Filtro options={{ loading, res, init: this.get.bind(this) }} />*/}

                            <br />

                            <hr />

                            <Tables onSelected={(item) => this.selecionar(item)} editar={this.editar.bind(this)} parentLink='cadastros/servico' options={{ res, loading, init: this.get.bind(this) }} />

                            <Pagination options={{ res, init: this.get.bind(this) }} align='right' />

                            <Button disabled={loading} primary style={{ margin: '10px 0', float: 'right' }} content="Ok" onClick={() => this.onClose()} />

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default CadastroServico;