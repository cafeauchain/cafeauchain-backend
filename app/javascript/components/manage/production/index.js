import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Divider } from "semantic-ui-react";

/* eslint-disable */
import ProductionGrid from "manage/production/grid";
import ProductionTable from "manage/production/table";

import styles from  "./inline-print-styles";
/* eslint-enable */

class Production extends React.PureComponent {
    state = {}
    render() {
        return (
            <Segment className="print-production-queue">
                <style type="text/css">
                    {styles}
                </style>
                <Header as="h2" content="Production Bags Needed" />
                <ProductionGrid />
                <Divider />
                <ProductionTable />
                <Divider />
            </Segment>
        );
    }
}
const { array } = PropTypes;
Production.propTypes = {
    variations: array
};

export default Production;
