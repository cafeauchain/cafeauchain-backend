import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";

import tableDefs from "defs/tables/variantsTable";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>
        {ctx => (
            <VariantsTable
                {...props}
                data={ctx.variants}
                loading={ctx.loading}
                userId={ctx.userId}
                getCtxData={ctx.getData}
            />
        )}
    </Context>
);

class VariantsTable extends React.Component {
    componentDidMount() {
        const { data, getCtxData } = this.props;
        if (data === undefined) {
            getCtxData("variants");
        }
    }

    render() {
        const { loading, data = [] } = this.props;
        const limit = 25;
        const limitData = () => data.slice(0, limit);
        return (
            <F>
                <Header as="h2" content="Product Pricing" />
                <Table tableDefs={tableDefs} data={limitData()} loading={loading} />
                {data.length > limit && (
                    <F>
                        <br />
                        <div style={{ textAlign: "right" }}>
                            <Button as="a" href="/manage/lots" content="View All Lots" />
                        </div>
                    </F>
                )}
            </F>
        );
    }
}

const { array, bool, func } = PropTypes;
VariantsTable.propTypes = {
    data: array,
    loading: bool,
    getCtxData: func
};

export default Wrapper;
