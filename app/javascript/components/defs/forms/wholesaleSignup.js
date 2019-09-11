const fields = {
    base: [
        { label: "Legal Name (must match the name in IRS database)", name: "name", flex: "50" },
        { name: "tax_id", label: "Tax ID", flex: "50" },
        { label: "Support Email", name: "email", flex: 50 },
        { label: "Phone", flex: "50", type: "phone" },
        { label: "Support URL", name: "support_url", flex: 50 },
        { label: "Url", name: "url", flex: 50 },
        { label: "Bank Routing Number", name: "routing", flex: "33", type: "phone" },
        { label: "Bank Account Number", name: "account", flex: "33", type: "phone" },
        { label: "Confirm Account Number", name: "account_confirm", flex: "33", type: "phone" },
    ],
    person: [
        { label: "First Name", flex: "50" },
        { label: "Last Name", flex: "50" },
        { label: "Title", flex: 50 },
        { label: "Email", flex: 50 },
        { label: "Phone", flex: 25 },
        { label: "Last 4 of SSN", name: "ssn_last_4", flex: 25 }
    ],
    dob: [
        { label: "", name: "dob_month", placeholder: "month", flex: "25" },
        { label: "", name: "dob_day", placeholder: "day", flex: "25" },
        { label: "", name: "dob_year", placeholder: "year", flex: "50" }
    ]
};

export default fields;
