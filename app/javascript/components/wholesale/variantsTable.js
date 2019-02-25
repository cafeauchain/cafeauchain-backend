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
        const { loading, userId } = this.props;
        let { data } = this.props;
        if (data === undefined) data = [];
        const onClick = (e, item) => {
            // eslint-disable-next-line
            console.log(item);
            alert("This should take you to more info about the roasted inventory levels.");
        };
        const limit = 25;
        const limitData = () => data.slice(0, limit);
        return (
            <F>
                <Header as="h2" content="Product Pricing" />
                <Table tableDefs={tableDefs} data={limitData()} loading={loading} onClick={onClick} />
                {data.length > limit && (
                    <F>
                        <br />
                        <div style={{ textAlign: "right" }}>
                            <Button as="a" href={`/roasters/${userId}/lots`} content="View All Lots" />
                        </div>
                    </F>
                )}
            </F>
        );
    }
}

const { array, bool, oneOfType, string, number, func } = PropTypes;
VariantsTable.propTypes = {
    data: array,
    loading: bool,
    userId: oneOfType([string, number]),
    getCtxData: func
};

export default Wrapper;