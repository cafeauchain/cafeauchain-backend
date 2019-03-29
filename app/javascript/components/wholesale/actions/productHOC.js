import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";
import { Button } from "semantic-ui-react";

/* eslint-disable */
import { noEmpties } from "utilities";
import { roasterUrl as ROASTER_URL, requester } from "utilities/apiUtils";

import Context from "contexts/main";
/* eslint-enable */

const compositionDefault = () => ({ inventory_item_id: "", pct: "", id: shortid.generate() });
const variantsDefault = (variant = "") => ({ size: variant, price_in_dollars: "", id: shortid.generate() });
const defaultDetails = {
    name: "",
    description: "",
    status: "draft",
    categories: [],
    product_images: [],
    composition: [compositionDefault()],
    variants: [variantsDefault()],
    product_options: []
};

function withProductForm(WrappedComponent) {
    class WithProductForm extends React.Component {
        constructor(props) {
            super(props);
            const { current } = props;
            const details = current ? this.buildDetailsFromItem(current) : defaultDetails;
            this.state = {
                details,
                btnLoading: false,
                errors: []
            };
        }

        buildDetailsFromItem = ({ id, attributes }) => {
            return {
                id,
                ...attributes,
                name: attributes.title
            };
        };

        buildDefaultVariants = (val = []) => {
            if (val.length) {
                const variants = val.map(variantsDefault);
                let { details } = this.state;
                details = { ...details };
                details.variants = variants;
                this.setState({ details });
            }
        };

        buildDefaultOptions = (val = []) => {
            if (val.length) {
                let { details } = this.state;
                details = { ...details };
                details.product_options = val;
                this.setState({ details });
            }
        };

        handleInputChange = (event, { value, name, checked, ...rest }) => {
            let { details } = this.state;
            details = { ...details };
            if (name === "") return;
            let val = value || checked;
            if (val === undefined) {
                val = "";
            }
            if (rest["data-object"] && rest["data-itemid"]) {
                let temp = details[rest["data-object"]].find(({ id }) => id === rest["data-itemid"]);
                temp[name] = val;
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

        setOptions = (val = []) => {
            let { details } = this.state;
            details = { ...details };
            details.product_options = val;
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
                tabIndex={-1}
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
            const { defaults: ctxDefaults } = this.context;
            defaults.composition = [compositionDefault()];
            defaults.variants = ctxDefaults.size.map(variantsDefault);
            defaults.product_options = ctxDefaults.options;
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
                setOptions: this.setOptions,
                buildInventoryOptions: this.buildInventoryOptions,
                buildDefaultVariants: this.buildDefaultVariants,
                buildDefaultOptions: this.buildDefaultOptions,
                resetForm: this.resetForm,
                onRemove: this.onRemove
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

    const { object } = PropTypes;
    WithProductForm.propTypes = {
        current: object
    };

    return WithProductForm;
}

export default withProductForm;
