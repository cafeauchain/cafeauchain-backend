import React, { useState } from "react";
import { Segment, Header, Divider, Menu } from "semantic-ui-react";

/* eslint-disable */
import ProductionGrid from "manage/production/grid";
import ProductionTable from "manage/production/table";

import styles from  "./inline-print-styles";
/* eslint-enable */

const Production = () => {
    const [showTable, updateShowTable] = useState(false);

    const handleItemClick = () => updateShowTable(prev => !prev);

    return (
        <Segment className="print-production-queue">
            <style type="text/css">
                {styles}
            </style>
            <Header as="h2" content="Production Bags Needed" />
            <Divider />
            <Menu text>
                <Menu.Item
                    content="Grid"
                    active={showTable}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    content="By Product"
                    active={!showTable}
                    onClick={handleItemClick}
                />
            </Menu>
            {!showTable && <ProductionGrid />}
            {showTable && <ProductionTable />}
        </Segment>
    );
};

export default Production;
