import { render } from '@testing-library/react';
import callMeDanger from "./callMeDanger";

describe("CallMeDanger tests", () => {
    test('returns raw HTML in a wrapped element', () => {
        const template = "hello,<strong>world</strong>";
        const el = 'h1';
        const element = callMeDanger(template, el);
        const { container } = render(element);
        expect(container.innerHTML).toBe(`<${el}>${template}</${el}>`);
    });
    test('returns raw HTML wrapped in a default span', () => {
        const template = "hello,<strong>world</strong>";
        const element = callMeDanger(template);
        const { container } = render(element);
        expect(container.innerHTML).toBe(`<span>${template}</span>`);
    });
});

