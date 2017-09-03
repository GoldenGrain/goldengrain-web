import React from 'react';
import SelectCustom from './SelectCustom';

class SelecTipoServico extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            items: [
                {
                    text: "Serviço para Laudo",
                    value: 1
                },
                {
                    text: "Serviço Geral",
                    value: 2
                }
            ]
        }
    }

    render() {

        const { items } = this.state;

        let { value, onChange, label } = this.props;

        return (
            <div>
                <SelectCustom label={label} value={value} onChange={onChange} placeholder='--selecione--' items={items} />
            </div>
        );
    }
}

export default SelecTipoServico;