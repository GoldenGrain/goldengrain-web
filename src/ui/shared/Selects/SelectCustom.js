import React from 'react';
import { Dropdown } from 'semantic-ui-react';

class SelectCustom extends React.Component {

    render() {

        let { items, minCharacters, placeholder, loading, value, onChange, onSearchChange, disabled, label } = this.props;

        onSearchChange = onSearchChange || function () { };
        minCharacters = minCharacters || 1;

        return (
            <div>
                {label ? <label> {label} </label> : null}
                <Dropdown minCharacters={minCharacters} disabled={disabled} onSearchChange={onSearchChange} noResultsMessage="Nenhum Resultado Encontrado" fluid loading={loading} value={value} onChange={onChange} search selection placeholder={placeholder} options={items} />
            </div>
        );
    }
}

export default SelectCustom;