const tableDefinition = {
    title: "Producers",
    fields: [
        { name: "name", namespace: "attributes", width: 6 },
        { name: "location", namespace: "attributes", width: 8 },
        { name: "slug", namespace: "attributes" },
        { name: "id", width: 2 },
        { name: "type" }
    ],
    props: {
        celled: true,
        striped: true,
        selectable: true
    }
};

export default tableDefinition;
