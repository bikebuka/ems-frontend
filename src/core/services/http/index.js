import client from "./client/client";

export default async function call(requestType, url, data = null) {
    console.log(url)
    return client[requestType](url, data);
}