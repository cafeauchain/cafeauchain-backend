import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Container } from "semantic-ui-react";

/* eslint-disable */
import IconHeader from "shared/IconHeader";
/* eslint-enable */

const WizardWrapper = props => {
    const { prevFunc, prevText, nextFunc, nextText, renderErrors, children, headerText } = props;
    return (
        <Container text>
            <Form style={{ margin: "4em 0" }}>
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
                    />
                )}
            </Form>
        </Container>
    );
};

const { func, node, string } = PropTypes;
WizardWrapper.propTypes = {
    prevText: string,
    prevFunc: func,
    nextText: string,
    nextFunc: func,
    children: node,
    headerText: string,
    renderErrors: func
};
WizardWrapper.defaultProps = {
    prevText: "Previous Step",
    nextText: "Next Step"
};

export default WizardWrapper;
