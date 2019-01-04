import React, { Component } from "react"
import { Form, Container, Header, Image, Divider } from "semantic-ui-react"
import usStates from "../utilities/usStates"

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const { value } = this.state
        const { profile_img, profile } = this.props
		const {
			name,
			about,
			address_1,
			address_2,
			city,
			facebook,
			id,
			location,
			state,
			twitter,
			url,
			zip_code
		} = profile

		return (
			<Container className="form roaster-wizard">
				<Header as="h2">Roaster Profile</Header>
				<Image src={profile_img} />
				<Divider />
				<Form>
					<Form.Input label="Name" placeholder="Name" labelPosition="left" value={name} />
					<Form.Group inline widths="equal">
						<Form.Input fluid label="Address 1" placeholder="Address 1" value={address_1} />
						<Form.Input fluid label="Address 2" placeholder="Address 2" value={address_2} />
					</Form.Group>
					<Form.Group inline widths="equal">
						<Form.Input fluid label="City" placeholder="City" value={city} />
						<Form.Select fluid label="State" placeholder="State" defaultValue={state} options={usStates} />
						<Form.Input fluid label="Zip" placeholder="Zip" defaultValue={zip_code} />
					</Form.Group>
					<Form.TextArea label="About" placeholder="About" value={about} />
					<Form.Button>Submit</Form.Button>
				</Form>
			</Container>
		)
	}
}

export default App
