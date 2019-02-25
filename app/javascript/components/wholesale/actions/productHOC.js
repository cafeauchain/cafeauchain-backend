import React from "react";
import shortid from "shortid";
import { Button } from "semantic-ui-react";

/* eslint-disable */
import { noEmpties } from "utilities";

import Context from "contexts/main";
/* eslint-enable */

const defaultDetails = {
    name: "",
    description: "",
    categories: [],
    product_images: [],
    composition: [{ inventory_item_id: null, pct: null, id: shortid.generate() }],
    variants: [{ size: null, price_in_cents: null, id: shortid.generate() }]
};

function withSubscription(WrappedComponent, passedProps) {
    // ...and returns another component...
    return class withSubscripton extends React.Component {
        constructor(props) {
            super(props);
            console.log(props, passedProps);
            const details = defaultDetails;
            this.state = {
                details,
                btnLoading: false,
                errors: []
            };
        }

        componentDidMount() {
            // ... that takes care of the subscription...
            // DataSource.addChangeListener(this.handleChange);
        }

        componentWillUnmount() {
            // DataSource.removeChangeListener(this.handleChange);
        }
        buildDetailsFromItem = ({ attributes }) => {
            return {
                name: attributes.title,
                description: attributes.description,
                composition: attributes.composition.map(comp => ({
                    inventory_item_id: comp.inventory_item_id,
                    pct: comp.pct,
                    id: comp.id
                }))
            };
        };

        handleInputChange = (event, { value, name, checked, object, index }) => {
            let { details } = this.state;
            details = { ...details };
            if (name === "") return;
            const val = value || checked;
            if (object && index !== undefined) {
                details[object][index][name] = val;
            } else {
                details[name] = val;
            }
            console.log(details);
            this.setState({ details, errors: [] });
        };

        startSubmit = ev => {
            ev.preventDefault();
            this.setState({ btnLoading: true }, this.handleSubmit);
        };

        handleSubmit = async () => {
            const { details } = this.state;
            const { id, getCtxData, item } = this.props;
            const method = item ? "PUT" : "POST";
            const product_id_url = item ? "/" + item.id : "";
            const url = `${ROASTER_URL(id)}/products${product_id_url}`;
            let body = { ...details };
            let respJSON = await requester({ url, body, method });
            if (respJSON instanceof Error) {
                this.setState({ errors: respJSON.response.data, btnLoading: false });
            } else {
                if (respJSON.redirect) {
                    window.location.href = await respJSON.redirect_url;
                } else {
                    await this.setState({ btnLoading: false });
                    getCtxData("products");
                    getCtxData("variants");
                    getCtxData("inventory");
                }
            }
        };

        buildInventoryOptions = inventory =>
            inventory.map(({ id, attributes: { name, lot_name } }) => ({
                value: id,
                text: name + " (" + lot_name + ")",
                key: id,
                id,
                name
            }));

        addInventoryItem = () => {
            let { details } = this.state;
            const comp = { inventory_item_id: null, pct: null, id: shortid.generate() };
            details.composition = [...details.composition, comp];
            this.setState({ details });
        };

        addVariant = () => {
            let { details } = this.state;
            const variant = { size: null, price_in_cents: null, id: shortid.generate() };
            details.variants = [...details.variants, variant];
            this.setState({ details });
        };

        removeButton = btnProps => (
            <Button
                compact
                size="mini"
                color="red"
                content="Remove"
                type="button"
                onClick={this.onRemove}
                {...btnProps}
            />
        );

        onRemove = (e, { idx, remover }) => {
            e.preventDefault();
            const { details } = this.state;
            let arr = [...details[remover]];
            arr.splice(idx, 1);
            details[remover] = arr;
            this.setState({ details });
        };

        validateInputs = (details, item) => {
            const { composition, variants, ...rest } = details;
            const itemDetail = item ? this.buildDetailsFromItem(item) : {};
            const compEmpties = composition.filter(item => noEmpties(item));
            const compTotal = composition.reduce((total, item) => {
                return total + Number(item.pct);
            }, 0);

            const varEmpties = variants ? variants.filter(item => noEmpties(item)) : [true];
            // TODO I hate doing this. Figure out why they are evaluating to not equal
            let jsonitem = JSON.stringify(itemDetail);
            let jsondetails = JSON.stringify(details);
            return (
                noEmpties(rest) &&
                compEmpties.length > 0 &&
                compTotal === 100 &&
                varEmpties.length > 0 &&
                jsonitem !== jsondetails
            );
        };

        render() {
            // ... and renders the wrapped component with the fresh data!
            // Notice that we pass through any additional props
            const funcs = {
                handleInputChange: this.handleInputChange,
                validateInputs: this.validateInputs,
                removeButton: this.removeButton,
                addVariant: this.addVariant,
                addInventoryItem: this.addInventoryItem,
                buildInventoryOptions: this.buildInventoryOptions,
                startSubmit: this.startSubmit
            };
            return <WrappedComponent {...this.props} funcs={funcs} {...this.state} />;
        }
    };
}

export default withSubscription;
