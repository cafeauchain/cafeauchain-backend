import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Segment } from "semantic-ui-react";

/* eslint-disable */
import IconHeader from "shared/IconHeader";
/* eslint-enable */

const WizardWrapper = props => {
    const { prevFunc, prevText, nextFunc, nextText, renderErrors, children, headerText, loading } = props;
    return (
        <Segment style={{ overflow: "hidden", paddingBottom: "2em" }}>
            <Form>
                <IconHeader iconName="coffee" header={headerText} />
                {renderErrors()}
                {children}
                {prevFunc && (
                    <Button
                        type="button"
                        onClick={prevFunc}
                        icon="left arrow"
                        labelPosition="left"
                        content={prevText}
                    />
                )}
                {nextFunc && (
                    <Button
                        type="submit"
                        onClick={nextFunc}
                        primary
                        floated="right"
                        icon="right arrow"
                        labelPosition="right"
                        content={nextText}
                        loading={loading}
                    />
                )}
            </Form>
        </Segment>
    );
};

const { func, node, string, bool } = PropTypes;
WizardWrapper.propTypes = {
    prevText: string,
    prevFunc: func,
    nextText: string,
    nextFunc: func,
    children: node,
    headerText: string,
    renderErrors: func,
    loading: bool
};
WizardWrapper.defaultProps = {
    prevText: "Previous Step",
    nextText: "Next Step"
};

export default WizardWrapper;
