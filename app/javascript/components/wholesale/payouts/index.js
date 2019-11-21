import React, { useState, useEffect } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { Header, Segment } from "semantic-ui-react";

/* eslint-disable */
import Table from "shared/table";
import callMeDanger from "shared/table";
import tableDefs from "defs/tables/payouts";

import { Money } from "shared/textFormatters"

import { requester, roasterUrl as ROASTER_URL } from "utilities/apiUtils";
import withContext from "contexts/withContext";
/* eslint-enable */

const Payouts = ({ userId }) => {

    const [payouts, updatePayouts] = useState([]);

    const fetchPayouts = async () => { 
        const url = `${ROASTER_URL(userId)}/payouts`;
        const response = await requester({ url, method: 'GET' });
        updatePayouts(response);
    };

    useEffect(() => { 
        fetchPayouts();
    }, []);
    
    return (
        <div>
            <Segment>
                <Header as="h1" content="Payouts" />
            </Segment>
            {payouts.length > 0 && (
                <Segment>
                    {payouts.map(payout => { 
                        const date = moment(payout.arrival_date * 1000).format("MMM D, YYYY");
                        const amount = `$${(Number(payout.amount) / 100).toFixed(2)}`;
                        return (
                            <React.Fragment key={payout.id}>
                                <Table
                                    tableDefs={tableDefs}
                                    data={payout.trxs}
                                    title={`Payout from ${date} for ${amount}`}
                                />
                                <br />
                            </React.Fragment>
                        );
                    })}
                    
                </Segment>
            )}
            {payouts.length === 0 && (
                <div>Loading</div>
            )}
            
        </div>
    );
};
const { string, number, oneOfType } = PropTypes;
Payouts.propTypes = {
    userId: oneOfType([string, number])
};

export default withContext(Payouts);
