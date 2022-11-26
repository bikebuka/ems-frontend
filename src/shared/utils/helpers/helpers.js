import moment from "moment";
import {appAlgorithmKey} from "../../../core/environment/environment";
require("crypto-js");
export function formatDate(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a')
}
export function encrypt(value) {
    return btoa(appAlgorithmKey+value)
}
export function decrypt(value) {
    const code=atob(value);
    return code.split("/").pop();
}
export function  currency(){
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })
}