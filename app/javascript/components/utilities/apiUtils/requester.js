import readCookie from "../readCookie";

const requester = async ({ url, body, headers, method = "POST" }) => {
    const cookie = decodeURIComponent(readCookie("X-CSRF-Token"));
    headers = { "Content-Type": "application/json", "X-CSRF-Token": cookie, ...headers };
    if (headers["Content-Type"] === "application/json") {
        body = JSON.stringify(body);
    }
    try {
        let response = await fetch(url, {
            method,
            body,
            headers
        });
        if (response.ok) {
            let responseJson = await response.json();
            return responseJson;
        } else {
            var error = new Error(response.statusText || response.status);
            error.response = await response.json();
            throw error;
        }
    } catch (e) {
        // eslint-disable-next-line
        console.log(e.response);
        return e;
    }
};

export default requester;
