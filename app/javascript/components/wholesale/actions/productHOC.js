import React from "react";
import shortid from "shortid";
import { Button } from "semantic-ui-react";

/* eslint-disable */
import { noEmpties } from "utilities";
import { roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";

import Context from "contexts/main";
/* eslint-enable */

const compositionDefault = () => ({ inventory_item_id: "", pct: "", id: shortid.generate() });
const variantsDefault = () => ({ size: "", price_in_cents: "", id: shortid.generate() });
const defaultDetails = {
    name: "",
    description: "",
    categories: [],
    product_images: [],
    composition: [compositionDefault()],
    variants: [variantsDefault()]
};

function withProductForm(WrappedComponent) {
    class WithProductForm extends React.Component {
        constructor(props) {
            super(props);
            const details = defaultDetails;
            this.state = {
                details,
                btnLoading: false,
                errors: []
            };
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
            this.setState({ details, errors: [] });
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
            const comp = compositionDefault();
            details.composition = [...details.composition, comp];
            this.setState({ details });
        };

        addVariant = () => {
            let { details } = this.state;
            const variant = variantsDefault();
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

        resetForm = () => {
            let defaults = { ...defaultDetails };
            defaults.composition = [compositionDefault()];
            defaults.variants = [variantsDefault()];
            this.setState({ details: defaults });
        };

        render() {
            const { updateContext, getData: getCtxData } = this.context;
            const funcs = {
                handleInputChange: this.handleInputChange,
                validateInputs: this.validateInputs,
                removeButton: this.removeButton,
                addVariant: this.addVariant,
                addInventoryItem: this.addInventoryItem,
                buildInventoryOptions: this.buildInventoryOptions,
                resetForm: this.resetForm
            };

            return (
                <WrappedComponent
                    {...this.props}
                    funcs={funcs}
                    {...this.state}
                    updateContext={updateContext}
                    getCtxData={getCtxData}
                />
            );
        }
    }
    WithProductForm.contextType = Context;

    return WithProductForm;
}

export default withProductForm;