import React from "react";
import PropTypes from "prop-types";
import { Button, Grid, Card, Icon, Label } from "semantic-ui-react";

/* eslint-disable */
import Flex from "shared/flex";
/* eslint-enable */

const CardView = props => {
    const {
        card: { brand, name, last4, id, exp_month, exp_year, default: defaultCard },
        setAsDefault,
        removeCard
    } = props;
    const exp = exp_month + "/" + exp_year;
    const brandLower = brand ? brand.toLowerCase() : "";
    const brandUpper = brand ? brand.toUpperCase() : "";
    const innerSetAsDefault = e => {
        e.preventDefault();
        setAsDefault(id);
    };
    const innerRemoveCard = e => {
        e.preventDefault();
        removeCard(id);
    };
    return (
        <Grid.Column>
            <Card>
                <Card.Content>
                    <Card.Header>
                        {name}
                        {defaultCard && <Label color="green" corner="right" icon="asterisk" />}
                    </Card.Header>
                    <Card.Description>
                        <Icon name={"cc " + brandLower} size="large" />
                        {`${brandUpper} ${last4} ${id}`}
                        <br />
                        {exp}
                    </Card.Description>
                </Card.Content>
                {!defaultCard && (
                    <Card.Content extra>
                        <Flex spacebetween>
                            <Button size="mini" onClick={innerSetAsDefault}>
                                Set as default
                            </Button>
                            <Button size="mini" onClick={innerRemoveCard} negative>
                                Remove card
                            </Button>
                        </Flex>
                    </Card.Content>
                )}
            </Card>
        </Grid.Column>
    );
};

const { func, object } = PropTypes;
CardView.propTypes = {
    card: object,
    setAsDefault: func,
    removeCard: func
};

export default CardView;
