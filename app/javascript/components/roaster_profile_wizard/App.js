import React, { Component } from 'react';
// import 'semantic-ui-react/semantic.min.css';
// import MainForm from './components/MainForm';
import { Button, Container } from 'semantic-ui-react';
import registerServiceWorker from '../utilities/registerServiceWorker';
import Step1Fields from './form_fields/Step1Fields';
import Step2Fields from './form_fields/Step2Fields';
import Step3Fields from './form_fields/Step3Fields';
import Step4Fields from './form_fields/Step4Fields';

class App extends Component {

  constructor(props) {
    super(props)
    state = {
      currentStep: "step1",
      name: "",
      logo: null,
      about: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      zip_code: "",
      url: "",
      twitter: "",
      facebook: ""
    }
  }
  

  render() {
    registerServiceWorker();
    return(
      <Container textAlign='center' className="form roaster-wizard">
        <Step1Fields />
        <Step2Fields />
        <Step3Fields />
        <Step4Fields />
      </Container>    
    )
  }
}

export default App;