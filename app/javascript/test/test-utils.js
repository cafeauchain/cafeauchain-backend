/* eslint-disable */
import '@testing-library/jest-dom/extend-expect';
// import { render } from '@testing-library/react';
/* eslint-enable */

const mockFetchPromise = ({ok = true, response}) => Promise.resolve({
    ok,
    json: () => Promise.resolve(response),
});

// const customRender = (ui, options) =>
//     render(ui, { ...options });

export * from '@testing-library/react';
// export { customRender as render, mockFetchPromise };
export { mockFetchPromise };