import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Form, Button, Segment } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";
import Flex from "shared/flex";

import withProductForm from "wholesale/actions/productHOC";

import Variants from "wholesale/partials/variants";
import Composition from "wholesale/partials/composition";

import fields from "defs/forms/createProduct";

import { noEmpties } from "utilities";

import Context from "contexts/main";
/* eslint-enable */

const Wrapper = props => (
    <Context>
        {ctx => (
            <CreateProduct
                {...props}
                id={ctx.userId}
                updateContext={ctx.updateContext}
                inventoryData={ctx.inventory}
                getCtxData={ctx.getData}
            />
        )}
    </Context>
);
class CreateProduct extends Component {
    componentDidMount() {
        const { inventoryData, getCtxData } = this.props;
        if (inventoryData === undefined) {
            getCtxData("inventory");
        }
    }

    render() {
        let { inventoryData, funcs, details, btnLoading, errors } = this.props;
        const {
            handleInputChange,
            validateInputs,
            removeButton,
            addVariant,
            addInventoryItem,
            buildInventoryOptions,
            startSubmit
        } = funcs;
        if (inventoryData === undefined) inventoryData = [];
        const inventoryOptions = buildInventoryOptions(inventoryData);
        const { composition, variants } = details;
        const btnActive = validateInputs(details);
        return (
            <F>
                <Form onSubmit={startSubmit}>
                    <ErrorHandler errors={errors} />
                    {fields.base.map(({ name, label, inputType }) => (
                        <Input
                            key={name}
                            name={name}
                            label={label}
                            inputType={inputType}
                            onChange={handleInputChange}
                            defaultValue={details[name]}
                        />
                    ))}

                    {true && variants && (
                        <Segment style={{ background: "#dedede" }}>
                            <Variants
                                variants={variants}
                                fields={fields.variants}
                                handleChange={handleInputChange}
                                btn={removeButton}
                            />
                            <Button type="button" color="blue" content="Add Variant" onClick={addVariant} />
                        </Segment>
                    )}
                    {true && (
                        <Segment style={{ background: "#dedede" }}>
                            <Composition
                                composition={composition}
                                fields={fields.composition}
                                inventoryOptions={inventoryOptions}
                                handleChange={handleInputChange}
                                btn={removeButton}
                            />
                            <Button type="button" color="blue" content="Add Product" onClick={addInventoryItem} />
                        </Segment>
                    )}
                    {true && (
                        <Button primary fluid loading={btnLoading} disabled={!btnActive}>
                            Create Product
                        </Button>
                    )}
                </Form>
            </F>
        );
    }
}

const { array, func, object, bool } = PropTypes;
CreateProduct.propTypes = {
    inventoryData: array,
    getCtxData: func,
    details: object,
    btnLoading: bool,
    errors: array,
    funcs: object
};

export default withProductForm(Wrapper, { message: "this is the create component", something: Wrapper });
