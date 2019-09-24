import csvToJSON from "./csvToJSON";

describe("csvToJSON converter", () => {
    test("return a json-ified array given valid csv", () => {  
        const csv = `Title,Size,Name,Age\nPresident,Large,Bob,56\nVP,Medium,Rebecca,44\n`;
        const result = [
            { "Title": "President", "Size": "Large", "Name": "Bob", "Age": "56" },
            { "Title": "VP", "Size": "Medium", "Name": "Rebecca", "Age": "44" }
        ];
        expect(csvToJSON(csv)).toEqual(result);
    });
});