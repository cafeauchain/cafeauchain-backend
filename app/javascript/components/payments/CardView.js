import React from 'react';
import PropTypes from 'prop-types';
import {Button, Grid, Card, Icon} from 'semantic-ui-react';

const CardView = props => {

    const { card, setAsDefault, removeCard } = props
    const exp = [
        card.exp_month,
        card.exp_year
    ].join("/")
    return(
        <Grid.Column>
            <Card>
                <Card.Content>
                    <Card.Header>
                        {card.default ? 
                            null :
                            (
                                <Button floated="right" size='tiny' onClick={(e) => setAsDefault(e, card.id)}>
                                    Set as default
                                </Button> 
                            )
                        }
                        {exp}
                    </Card.Header>
                    {card.default ? <Card.Meta floated="right" content='DEFAULT CARD' /> : null}
                </Card.Content>
                
                <Card.Content extra>
                    <Button floated="right" size='mini' onClick={(e) => removeCard(e, card.id)} negative compact>
                        Remove card
                    </Button> 
                    <Icon name={["cc",card.brand.toLowerCase()].join(" ")} size="large" />
                    {card.last4}
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}

const { func, object } = PropTypes;
CardView.propTypes = {
    card: object,
    setAsDefault: func,
    removeCard: func
};

export default CardView;