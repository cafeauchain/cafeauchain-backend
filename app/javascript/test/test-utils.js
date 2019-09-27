/* eslint-disable */
import '@testing-library/jest-dom/extend-expect';
// import { render } from '@testing-library/react';
/* eslint-enable */

const mockFetchPromise = ({err, fakeResponse}) => {
    let res = {
        json: () => Promise.resolve(fakeResponse)
    };
    res.ok = !err;
    return Promise.resolve(res);
};

// const customRender = (ui, options) =>
//     render(ui, { ...options });

export * from '@testing-library/react';
// export { customRender as render, mockFetchPromise };
export { mockFetchPromise };