import React from 'react';
import { withRouter } from 'react-router';
import Breadcrumbs from 'react-breadcrumbs';

class BreadcrumbCustom extends React.Component {

    render() {
        return (
            <div>
                <Breadcrumbs
                    routes={this.props.routes}
                    params={this.props.params}
                />
            </div>
        )
    }
}

export default withRouter(BreadcrumbCustom);