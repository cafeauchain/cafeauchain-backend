import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Button } from "semantic-ui-react";

/* eslint-disable */
import { url as API_URL, requester } from "utilities/apiUtils";

/* eslint-enable */

class DeleteLots extends Component {
    state = {}
    handleDeleteLot = async (e, item) => {
        
        const { userId } = this.props;
        const url = `${API_URL}/admin/roasters/${ userId }/delete_lot`;
        await requester({ url, body: {id: item.lot_id}, method: 'PUT' });
    }
    render(){
        const { data } = this.props;
        return (
            <div>
                <div>Delete Everything</div>
                {data.map(item => {
                    return (
                        <Segment key={item.id}>
                            <div>{item.name}</div>
                            <div>
                                <span>Batches: </span>
                                {item.batches.length}
                            </div>
                            <div>
                                <span>Transactions: </span>
                                {item.transactions.length}
                            </div>
                            <div>
                                <span>Inventory Items: </span>
                                {item.inventory_items.length}
                            </div>
                            <div>
                                <span>Products: </span>
                                {item.products.length}
                            </div>
                            <div>
                                <span>Orders: </span>
                                {item.lot_orders.length}
                            </div>
                            {item.lot_orders.length < 1 && (
                                <Button negative content="Delete Lot" onClick={this.handleDeleteLot} lot_id={item.id} />
                            )}
                        </Segment>
                    );
                })}
            </div>
            
        );
    }
}
const { array, oneOfType, string, number } = PropTypes;
DeleteLots.propTypes = {
    data: array,
    userId: oneOfType([string, number])
};

export default DeleteLots;