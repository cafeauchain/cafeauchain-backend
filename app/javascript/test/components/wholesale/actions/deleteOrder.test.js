import React from "react";

/* eslint-disable */
import { render, fireEvent, mockFetchPromise, waitForElement } from "test-utils";
import DeleteOrder from "wholesale/actions/deleteOrder";
/* eslint-enable */

describe("Delete Order tests", () => {
    // To stop the jsdom navigaton error
    const originalLocation = window.location;
    beforeEach(() => {
        delete global.window.location;
        window.location = {
            href: '',
        };
    });

    afterEach(() => {
        window.location = originalLocation;
        global.fetch ? global.fetch.mockClear() : null;
    });

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
        const fakeResponse = {redirect_url: "www.redirecturl.com", redirect: true };
        const result = () => mockFetchPromise({ fakeResponse });
        // TODO why do I have to do it this way instead of with spyOn?
        global.fetch = jest.fn().mockImplementation(() => result());
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
        expect(response.redirect).toBe(true);
        expect(response.redirect_url).toBe("www.redirecturl.com");
    });

    it("renders the ErrorHandler component on error", async () => {
        const { getByText, getByTestId } = render(<DeleteOrder id="12" />);
        // Errors can either be an object with a message prop or an array
        const fakeResponse = ['input cannot be empty'];
        // const fakeResponse = { message: 'input cannot be empty' };
        const result = () => mockFetchPromise({ fakeResponse, err: true });
        global.fetch = jest.fn().mockImplementation(() => result());
        const button = getByText(/delete order/i);
        expect(button).toBeVisible();

        // Event to show confirm modal
        fireEvent.click(button);
        const actual_delete = getByTestId("test_actually-delete");
        expect(actual_delete).toBeVisible();

        // Event to actually delete the order
        fireEvent.click(actual_delete);
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch.mock.calls[0][0]).toBe('/api/v1/orders/12');

        const errorhandler = await waitForElement(() =>
            getByText(/input cannot be empty/i)
        );
        expect(errorhandler).toBeVisible();
    });
});