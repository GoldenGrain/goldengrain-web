import React from 'react';
import Rows from "./Rows";
import { withRouter } from 'react-router';
import { Toaster, Position } from '@blueprintjs/core'
import ServicoApi from 'service/api/servico.api';
import { Loader, Modal, Button } from 'semantic-ui-react';

class Tables extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            loading: false,
            openModal: false,
            item: {}
        }
    }

    novo() {
        this.props.novo();
    }

    editar(item) {
        this.props.editar(item);
    }

    deletar(item) {
        this.setState({
            openModal: true,
            item
        })
    }

    confirmarExclusao() {

        let item = this.state.item;

        this.setState({
            loading: true
        })

        ServicoApi.save({
            id: item.id,
            deleted_at: true
        }).then(data => {

            this.fecharModal();

            let toaster = Toaster.create({
                className: "my-toaster",
                position: Position.TOP_CENTER,
            });

            toaster.show({ message: "Operação realizada com sucesso!" });

            if (this.props.modal) {
                this.props.init();
            } else {
                setTimeout(() => { window.location.reload() }, 500);
            }

        }, () => {
            this.fecharModal();
        });
    }

    fecharModal() {
        this.setState({
            openModal: false
        })
    }

    headerModalExcluir() {

        const fecharModal = this.fecharModal.bind(this);
        const confirmarExclusao = this.confirmarExclusao.bind(this);

        return (
            <Modal
                open={this.state.openModal}
                onClose={fecharModal}
                title="Exclusão">
                <Modal.Content>
                    Deseja realmente excluir este item ?
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={fecharModal} content="Cancelar" disabled={this.state.loading} />
                    <Button onClick={confirmarExclusao} content={this.state.loading ? 'Excluindo...' : 'Confirmar'} color="teal" disabled={this.state.loading} />
                </Modal.Actions>
            </Modal>
        );
    }

    get getRows() {

        let res = this.props.options.res;

        return (
            res.data.map((item, key) => <Rows onSelected={this.props.onSelected} onEdit={(e) => this.editar(item)} item={item} key={key} onDelete={e => this.deletar(item)} />)
        )
    }

    get renderTable() {

        const { res, loading } = this.props.options;

        if (loading) return;

        if (!res || !res.data || !res.data.length) {

            return (

                <div className="pt-callout pt-intent-primary pt-icon-search">
                    <h3> <strong> Nenhum resultado encontrado... </strong>  </h3>
                </div>
            );
        }

        return (<table className="pt-table pt-interactive pt-striped table-material pt-table-striped">
            <thead>
                <tr>
                    <td style={{ width: '40px' }}>  </td>
                    <th>Nome</th>
                    <th style={{ width: '155px' }} className="center">Preço</th>
                    <th style={{ width: '25px' }} className="center">Editar</th>
                    <th style={{ width: '25px' }} className="center">Excluir</th>
                </tr>
            </thead>
            <tbody>
                {this.getRows}
            </tbody>
        </table>);
    }

    render() {
        return (
            <div>
                {this.headerModalExcluir()}
                {this.state.loading ? <Loader active /> : null}
                {this.renderTable}
            </div>
        );
    }
}

export default withRouter(Tables);