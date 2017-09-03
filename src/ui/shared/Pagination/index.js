import React from 'react';
import { withRouter } from 'react-router';
import ReactPaginate from 'react-paginate';

class Pagination extends React.Component {

    get getPagination() {

        const { res } = this.props.options;
 
        if (!res || !res.total) return;

        const pageCount = Math.ceil(res.total / res.per_page);

        return (
            <ReactPaginate previousLabel={"anterior"}
                nextLabel={"próximo"}
                breakLabel={<a href="">...</a>}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={4}
                forcePage={res.current_page - 1}
                onPageChange={this.changePagination.bind(this)}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                firstPageText='primeira'
                lastPageText='última'
                activeClassName={"active"} />)
    }

    changePagination(e) {

        let { paramsSearch } = this.props.options;

        if (!paramsSearch) {
            paramsSearch = {
                search: "",
                page: 1
            };
        }

        paramsSearch.page = e.selected + 1;

        this.props.options.init(paramsSearch);
    }

    getClassName() {

        let className = "";

        switch (this.props.align) {

            case 'center':
                className = 'center-table';
                break;

            case 'left':
                className = 'float-left';
                break;

            case 'right':
                className = 'float-right';
                break;

            default:
                className = 'center-table';
                break;
        }

        return className;
    }

    render() {

        return (
            <div>
                <div className={this.getClassName()}>
                    {this.getPagination}
                </div>
            </div>
        );
    }
}

export default withRouter(Pagination);