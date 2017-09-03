import React from 'react';
import { Table, Form, Button, Icon, Header, Modal } from 'semantic-ui-react';

class TabelaServicos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            openModalExcluir: false,
            item: null,
            loading: false
        }
    }

    valorTotal() {

        const servicos = this.props.servicos || [];

        let preco = 0;

        servicos.forEach((item) => preco += Number(item.preco));

        // if (preco == 0) return "0,00";

        return preco;
    }

    confirmarExclusao() {

        this.props.onDelete(this.state.item);

        this.setState({ openModalExcluir: false })
    }

    get getModalExcluir() {

        return (
            <Modal open={this.state.openModalExcluir} basic size='small'>
                <Header icon='archive' content='Aviso' />
                <Modal.Content>
                    <p>Deseja realmente remover ?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => this.setState({ openModalExcluir: false })}>
                        <Icon name='remove' />  Cancelar
                    </Button>
                    <Button color='green' inverted onClick={() => this.confirmarExclusao()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal >
        )
    }

    render() {

        let servicos = this.props.servicos || [];

        return (

            <div style={{ width: '100%' }}>

                {this.getModalExcluir}

                <table className="pt-table pt-interactive pt-striped pt-table-striped">

                    <thead>
                        <tr>
                            <th>Serviço</th>
                            <th style={{ width: '150px', textAlign: 'right' }}>Preço</th>
                            <th style={{ width: '80px', textAlign: 'center' }}>Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                        {servicos.map((item, key) => (
                            <tr key={key}>
                                <td>{item.nome}</td>
                                <td style={{ width: '150px', textAlign: 'right' }}> <span> {item.preco_formatado} </span> </td>
                                <td>
                                    <div style={{ display: 'table', margin: 'auto' }}>
                                        <Button size='tiny' type="button" onClick={() => this.setState({ openModalExcluir: true, item })} icon color="red" size={'small'}>
                                            <Icon name='trash' />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                    <tfoot>
                        <tr>
                            <th textAlign="center"><b>Total</b></th>
                            <th style={{ width: '150px', textAlign: 'right' }}><b>R$ {this.valorTotal()} </b> </th>
                            <th style={{ width: '80px', textAlign: 'center' }}></th>
                        </tr>
                    </tfoot>

                </table>

            </div>
        )
    }
};

export default TabelaServicos;