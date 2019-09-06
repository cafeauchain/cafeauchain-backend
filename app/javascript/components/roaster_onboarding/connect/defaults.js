const isDev = process.env.NODE_ENV === "development";
const defaults = {
    business: {
        tax_id: isDev ? "000000000" : "",
        phone: isDev  ? "7061234567" : "",
        routing: isDev ? "110000000" : "",
        account: isDev ? "000123456789" : "",
        account_confirm: isDev ? "000123456789" : "",
        address: {
            street_1: "",
            street_2: "",
            city: "",
            state: "",
            postal_code: ""
        }
    },
    person: {
        first_name: "",
        last_name: "",
        title: "",
        email: "",
        phone: "",
        ssn_last_4: "",
        dob: {
            dob_day: "",
            dob_month: "",
            dob_year: ""
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