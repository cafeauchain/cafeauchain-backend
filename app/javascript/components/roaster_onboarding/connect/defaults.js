const defaults = {
    business: {
        tax_id: process.env.NODE_ENV === "development" ? "000000000" : "",
        phone: process.env.NODE_ENV === "development" ? "7061234567" : "",
        routing: process.env.NODE_ENV === "development" ? "110000000" : "",
        account: process.env.NODE_ENV === "development" ? "000123456789" : "",
        account_confirm: process.env.NODE_ENV === "development" ? "000123456789" : "",
        address: {
            street_1: "",
            street_2: "",
            city: "",
            state: "",
            postal_code: ""
        }
    },
    account_opener: {
        first_name: process.env.NODE_ENV === "development" ? "Jane" : "",
        last_name: process.env.NODE_ENV === "development" ? "Doe" : "",
        title: process.env.NODE_ENV === "development" ? "President" : "",
        email: "",
        phone: process.env.NODE_ENV === "development" ? "7061234567" : "",
        ssn_last_4: process.env.NODE_ENV === "development" ? "1234" : "",
        dob: {
            dob_day: process.env.NODE_ENV === "development" ? "09" : "",
            dob_month: process.env.NODE_ENV === "development" ? "01" : "",
            dob_year: process.env.NODE_ENV === "development" ? "1990" : ""
        },
        address: {
            street_1: "",
            street_2: "",
            city: "",
            state: "",
            postal_code: ""
        }
    },
    owner: {
        first_name: "",
        last_name: "",
        title: "",
        email: "",
        phone: process.env.NODE_ENV === "development" ? "7061234567" : "",
        percent_ownership: "",
        ssn_last_4: "",
        dob: {
            dob_day: process.env.NODE_ENV === "development" ? "09" : "",
            dob_month: process.env.NODE_ENV === "development" ? "01" : "",
            dob_year: process.env.NODE_ENV === "development" ? "1990" : ""
        },
        address: {
            street_1: "",
            street_2: "",
            city: "",
            state: "",
            postal_code: ""
        }
    }
};

export default defaults;