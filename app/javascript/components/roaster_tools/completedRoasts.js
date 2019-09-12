import React, { Component } from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import Table from "shared/table";

import tableDefs from "defs/tables/completedRoasts";

import withContext from "contexts/withContext";
/* eslint-enable */

class CompletedRoasts extends Component {
    state = {
        loading: true
    };

    componentDidMount() {
        const { completed, getData } = this.props;
        if (completed === undefined) getData("completed").then(() => this.setState({ loading: false }));
    }

    handlePager = obj => {
        const { getData } = this.props;
        if (obj.startLoader) {
            this.setState({ loading: true });
        } else {
            getData("completed", obj.paramString).then(() => this.setState({ loading: false }));
        }
    }

    render() {
        const { completed = [], completed_paging } = this.props;
        const { loading } = this.state;
        return (
            <Table 
                tableDefs={tableDefs}
                data={completed}
                loading={loading}
                pagination={completed_paging}
                onPageChange={this.handlePager}
                paginationParams={{useQuestion: false, params: completed_paging, internal: true}}
            />
        );
    }
}

const { array, func, object } = PropTypes;
CompletedRoasts.propTypes = {
    completed: array,
    completed_paging: object,
    getData: func
};

export default withContext(CompletedRoasts);
