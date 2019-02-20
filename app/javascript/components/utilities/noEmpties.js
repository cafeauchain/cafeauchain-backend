const noEmpties = obj => Object.values(obj).every(x => !(x === null || x === "" || x === undefined));
export default noEmpties;
