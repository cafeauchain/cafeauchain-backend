const transformStateToParams = details => {
    let producerParams = {
        producer_profile: {
            name: details.business_name,
            addressable_attributes:{
                street_1: details.street_address,
                street_2: details.suite,
                city: details.city,
                state: details.state,
                postal_code: details.postal_code,
                country: details.country,
                primary: true
            }
        }
    }
    return producerParams;
}
  
export default transformStateToParams;