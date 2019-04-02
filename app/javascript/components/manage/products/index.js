import React from "react";
import { Segment, Header, Divider, Icon } from "semantic-ui-react";

/* eslint-disable */
import CreateProduct from "wholesale/actions/createProduct";
import Products from "wholesale/productInventory";

import Modal from "shared/modal";
/* eslint-enable */

// eslint-disable-next-line react/prefer-stateless-function
class CreateProducts extends React.PureComponent {
    render() {
        return (
            <Segment>
                <Header as="h2" content="Manage Products" />
                <Modal
                    text="Add New Product"
                    btnProps={{
                        icon: <Icon name="plus circle" inverted />,
                        size: "large"
                    }}
                    title="Add Product"
                    icon="coffee"
                    component={<CreateProduct />}
                />
                <Divider />
                <Products />
                <br />
            </Segment>
        );
    }
}

export default CreateProducts;
