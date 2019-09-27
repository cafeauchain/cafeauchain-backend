import React from "react";

/* eslint-disable */
import { render, fireEvent, mockFetchPromise } from "test-utils";
import DeleteOrder from "wholesale/actions/deleteOrder";
/* eslint-enable */

describe("Delete Order tests", () => {
    afterEach(() => global.fetch ? global.fetch.mockClear() : null);
    it("shows the button and opens/closes modal", () => {
        const { getByText, queryByTestId } = render(<DeleteOrder id="12" />);
        const button = getByText(/delete order/i);
        expect(button).toBeVisible();

        // Event to show confirm modal
        fireEvent.click(button);
        const modal = () => queryByTestId("test_show-confirm");
        const cancel = getByText(/cancel/i);
        expect(modal()).toBeVisible();
        expect(cancel).toBeVisible();

        // Event to close modal
        fireEvent.click(cancel);
        expect(modal()).toBeFalsy();
    });
    
    it("actually deletes the order", async () => {
        const { getByText, getByTestId } = render(<DeleteOrder id="12" />);
        const fakeDeleteResponse = {redirect_url: "www.redirecturl.com", redirect: true };
        const result = mockFetchPromise({ response: fakeDeleteResponse });
        // TODO why do I have to do it this way instead of with spyOn?
        global.fetch = jest.fn().mockImplementation(() => result);
        // jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
        //     return mockFetchPromise;
        // });
        const button = getByText(/delete order/i);
        expect(button).toBeVisible();

        // Event to show confirm modal
        fireEvent.click(button);
        const actual_delete = getByTestId("test_actually-delete");
        expect(actual_delete).toBeVisible();

        // Event to actually delete the order
        fireEvent.click(actual_delete);
        const value = await global.fetch.mock.results[0].value;
        const response = await value.json();
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch.mock.calls[0][0]).toBe('/api/v1/orders/12');
        expect(response.redirect_url).toBe("www.redirecturl.com");
    });
});