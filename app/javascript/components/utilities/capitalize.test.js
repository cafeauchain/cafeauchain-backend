import capitalize from "./capitalize";

test('returns a capitalized string if given a string', () => {
    expect(capitalize("TEstEd ME")).toBe("Tested me");
    expect(capitalize("some String")).toBe("Some string");
    expect(capitalize("THIS ONE TOO")).toBe("This one too");
    expect(capitalize("last one")).toBe("Last one");
});