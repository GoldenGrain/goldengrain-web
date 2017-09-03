import React from 'react';
import {Spinner} from '@blueprintjs/core';


class LoadingOverlay extends React.Component {

    render(){

        if(!this.props.loading) return null;

        var className = "loading-overlay";

        if(this.props.container){
            className += " loading-container";
        }

        if(this.props.inDialog) {
            className += " with-dialog";
        }

        return (
            <div className={className} >
                <Spinner className="loading-icon" />
            </div>
        );

    }

}

export default LoadingOverlay;