import React, {Component} from 'react';
import {Container, Card, Icon} from 'semantic-ui-react';

class CardView extends Component {

  render () {
    return(
      <Container>
        <Card>
          <Card.Content header='About Amy' />
          <Card.Content description="This is a description" />
          <Card.Content extra>
            <Icon name='user' />
            4 Friends
          </Card.Content>
        </Card>
      </Container>
    )
  }
}

export default CardView;