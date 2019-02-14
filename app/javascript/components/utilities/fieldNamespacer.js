// Allows nested fields to be rendered dynamically
// Ex: This field definition
//        { name: "test", namespace: ["extras", "obj", "another"] }
//                OR
//        { name: "test", namespace: "extras/obj/another"] }
// would produce the value for data["extras"]["obj"]["another"]
const namespacer = (namespace, data) => {
    if (typeof namespace === "string") {
        namespace = namespace.split("/");
    }
    return namespace.reduce((acc, level) => acc[level], data);
};

export default namespacer;
