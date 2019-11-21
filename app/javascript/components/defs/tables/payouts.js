import React from 'react';
import moment from "moment";

/* eslint-disable */
import { Money } from "shared/textFormatters";
/* eslint-enable */

const DateFormatter = ({ content }) => moment(content).format("MMM D YYYY");

// eslint-disable-next-line react/prop-types
const Cents = ({ content }) => (<Money content={Number(content / 100)} />);

const Orders = ({ content }) => {
    const arr = content.map(({ order_id, paid_date }, idx) => { 
        return (
            <React.Fragment key={order_id}>
                {idx > 0 && <>, </>}
                <a
                    key={order_id}
                    href={`/manage/orders/${order_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {`Order: #${order_id} (${paid_date})`}
                </a>
            </React.Fragment>
        );
    });
    return arr;
};

const tableDefinition = {
    fields: [
        { name: "trx_gross", label: "Gross", formatter: Cents, style: { width: 80 } },
        { name: "trx_net", label: "Net", formatter: Cents, style: { width: 80 } },
        { name: "trx_date", label: "Date", formatter: DateFormatter, style: { width: 120 } },
        { name: "trx_invoices", label: "Orders", formatter: Orders }
    ],
    props: {
        singleLine: false
    }
};

export default tableDefinition;