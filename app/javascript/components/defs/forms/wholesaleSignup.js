const fields = {
    base: [
        { name: "tax_id", label: "Tax ID", flex: "50" },
        { label: "Phone", flex: "50", type: "phone" },
        { label: "Bank Routing Number", name: "routing", flex: "33", type: "phone" },
        { label: "Bank Account Number", name: "account", flex: "33", type: "phone" },
        { label: "Confirm Account Number", name: "account_confirm", flex: "33", type: "phone" }
    ],
    owner: [
        { label: "First Name", flex: "50" },
        { label: "Last Name", flex: "50" },
        { label: "Title" },
        { label: "Email" },
        { label: "Phone" },
        { label: "Ownership Percentage", name: "percent_ownership", flex: "50" },
        { label: "Last 4 of SSN", name: "ssn_last_4", flex: "50" }
    ],
    dob: [
        { label: "", name: "dob_month", placeholder: "month", flex: "25" },
        { label: "", name: "dob_day", placeholder: "day", flex: "25" },
        { label: "", name: "dob_year", placeholder: "year", flex: "50" }
    ],
    opener: [
        { label: "First Name", flex: "50" },
        { label: "Last Name", flex: "50" },
        { label: "Title" },
        { label: "Email" },
        { label: "Phone" },
        { label: "Last 4 of SSN", name: "ssn_last_4" }
    ]
};

export default fields;
