import React, {Component} from 'react';
import {Grid, Card, Icon} from 'semantic-ui-react';

class CardView extends Component {

  render () {
    const { card } = this.props
    const exp = [
      card.exp_month,
      card.exp_year
    ].join("/")
    return(
      <Grid.Column>
        <Card>
          <Card.Content header={exp} />
          <Card.Content extra>
            <Icon name={["cc",card.brand.toLowerCase()].join(" ")} />
            {card.last4}
          </Card.Content>
        </Card>
      </Grid.Column>
    )
  }
}

export default CardView;