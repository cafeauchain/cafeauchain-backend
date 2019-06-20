import React, { Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Button } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import Flex from "shared/flex";

import tableDefs from "defs/tables/roastedInventory";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>
        {ctx => (
            <RoastedInventory
                {...props}
                data={ctx.inventory}
                loading={ctx.loading}
                userId={ctx.userId}
                getCtxData={ctx.getData}
            />
        )}
    </Context>
);

class RoastedInventory extends React.Component {
    componentDidMount() {
        const { data, getCtxData } = this.props;
        if (data === undefined) {
            getCtxData("inventory");
        }
    }
    render() {
        const { loading } = this.props;
        let { data = [] } = this.props;
        const onClick = (e, item) => {
            // eslint-disable-next-line
            console.log(item);
            alert("This should take you to more info about the roasted inventory levels.");
        };
        const limit = 25;
        const limitData = () => data.slice(0, limit);
        return (
            <F>
                <Header as="h2" content="Roasted Inventory Levels" />
                <Table tableDefs={tableDefs} data={limitData()} loading={loading} onClick={onClick} />
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
RoastedInventory.propTypes = {
    data: array,
    loading: bool,
    getCtxData: func
};

export default Wrapper;
