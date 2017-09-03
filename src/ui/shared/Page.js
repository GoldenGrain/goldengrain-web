import React from 'react';

const Page = (Component) => ((props) => {
     return <div className="content-page">
        <Component {...props} />
    </div>;

});

Page.Header = (props) => {

    return (
        <div className="page-header">
            {props.children}
            <div className="clear-fix" />
        </div>
    );
};


Page.Buttons = (props) => {

    return (
        <div className="buttons-area">
            {props.children}
        </div>
    );

};

Page.Body = (props) => {

    return (
        <div className="page-body">
            {props.children}
        </div>
    );

};


export default Page;