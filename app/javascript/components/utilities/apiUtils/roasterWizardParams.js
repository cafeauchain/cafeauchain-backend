const transformStateToParams = state => {
  let roasterParams = {
    roaster_profile: {
      name: state.name,
      address_1: state.address_1,
      address_2: state.address_2,
      city: state.city,
      state: state.state,
      zip_code: state.zip_code,
      logo: state.logo,
      about: state.about,
      url: state.url,
      twitter: state.twitter,
      facebook: state.facebook,
    },
    current_step: state.current_step
  }
  return roasterParams
}

export default transformStateToParams;