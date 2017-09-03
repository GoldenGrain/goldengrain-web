import React from 'react';
import SelectCustom from './SelectCustom';
import PacienteApi from 'service/api/paciente.api';

class SelectPaciente extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            loading: false,
            items: []
        }
    }

    componentWillMount() {

        this.setState({ loading: true });

        PacienteApi.getAll({paginate: true}).then((items) => {
            items = items.data.map((x) => {
                return {
                    text: x.nome,
                    value: x.id
                };
            })
            this.setState({ items, loading: false });
        })
    }

    retornar(e, val) {

        if (val && val.toString().length >= 3) {

            this.setState({ loading: true });

            PacienteApi.getAll({ search: val }).then((items) => {
                items = items.map((x) => {
                    return {
                        text: x.nome,
                        value: x.id
                    };
                })
                this.setState({ items, loading: false });
            });
        }
    }

    render() {

        const { items, loading } = this.state;

        let { value, onChange, label } = this.props;

        const retornar = this.retornar.bind(this);

        return (
            <div>
                <SelectCustom label={label} onSearchChange={(e, select) => retornar(e, select)} disabled={loading} loading={loading} value={value} onChange={onChange} placeholder='--selecione--' items={items} />
            </div>
        );
    }
}

export default SelectPaciente;