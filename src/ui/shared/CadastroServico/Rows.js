import React from 'react';
import { Checkbox, Form, Button } from 'semantic-ui-react';

class Rows extends React.Component {

    render() {

        let { item } = this.props;

        return (
            <tr key={item.id} >

                <td>
                    <Form.Field>
                        <Checkbox checked={item.check} onClick={() => this.props.onSelected(item)} />
                    </Form.Field>
                </td>
                <td onClick={() => this.props.onSelected(item)}><strong> {item.nome} </strong> </td>
                <td onClick={() => this.props.onSelected(item)} className="center">{item.preco ? <span className="pt-tag pt-intent-success">{item.preco_formatado}</span> : "--"}</td>
                <td>
                    <span className="center">
                        <Button size="mini" primary onClick={this.props.onEdit} icon="edit" />
                    </span>
                </td>
                <td>
                    <span className="center">
                        <Button size="mini" color="red" onClick={this.props.onDelete} icon="delete" />
                    </span>
                </td>
            </tr>
        );
    }
}

export default Rows;