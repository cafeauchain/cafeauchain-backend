// Allows nested fields to be rendered dynamically
// Ex: This field definition
//        { name: "test", namespace: ["extras", "obj", "another"] }
// would produce the value for data["extras"]["obj"]["another"]
const namespacer = (namespace, data) => namespace.reduce((acc, level) => acc[level], data);

export default namespacer;
