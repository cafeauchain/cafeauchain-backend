import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Segment } from "semantic-ui-react";

/* eslint-disable */
import IconHeader from "shared/IconHeader";
import Flex from "shared/flex";
/* eslint-enable */

const WizardWrapper = props => {
    const { prevFunc, prevText, nextFunc, nextText, renderErrors, children, headerText, loading } = props;
    return (
        <Segment>
            <Form>
                <IconHeader iconName="coffee" header={headerText} />
                {renderErrors()}
                {children}
                <Flex spacing="10" spacebetween flexend>
                    {prevFunc && (
                        <div flex="50">
                            <Button
                                type="button"
                                onClick={prevFunc}
                                icon="left arrow"
                                labelPosition="left"
                                content={prevText}
                            />
                        </div>
                        
                    )}
                    {nextFunc && (
                        <div flex="auto">
                            <Button
                                type="submit"
                                onClick={nextFunc}
                                primary
                                icon="right arrow"
                                labelPosition="right"
                                content={nextText}
                                loading={loading}
                            />
                        </div>
                    )}
                </Flex>  
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
