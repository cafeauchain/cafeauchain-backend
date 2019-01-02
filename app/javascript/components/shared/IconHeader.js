import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

class IconHeader extends React.Component {
  render() {
    return (
      <div>
        <Header as='h2' icon textAlign='center'>
          <Icon name={this.props.iconName} circular inverted />
          <Header.Content>{this.props.header}</Header.Content>
        </Header>
      </div>
    )
  }
}

export default IconHeader;