/* eslint-disable */
import abbreviator from "utilities/abbreviator";
/* eslint-enable */

const exclude = RegExp(/^\([0-9]{4}\)$/);
test('returns an abbreviation if given a string', () => {
    expect(abbreviator("Roast Coffee Profile")).toBe("RCP");
});

test('returns an abbreviation and removes parts of the string if they match an exclude regexp', () => {
    expect(abbreviator("Roast Profile (1999) ", exclude, false)).toBe("RP");
    expect(abbreviator("Roast Profile (1999  Test ", exclude, false)).toBe("RP(T");
});
test('returns an abbreviation and includes the excluded regexp if includeTheExclude is set to true', () => {
    expect(abbreviator("Roast Profile (1999)", exclude, true)).toBe("RP (1999)");
});
