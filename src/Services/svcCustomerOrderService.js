import axios from 'axios';

import { ApiBaseURL, api_CustomerOrder } from '../Constant/Constant';

export let SaveCustomerOrderDetails = async (token, CustomerOrderDetails) => {
    const url = ApiBaseURL + api_CustomerOrder + "SubmitCustomerOrder";

    const instance = axios.create({
        headers: {
            Authorization: 'Bearer' + token,
            "content-type": "application/json"
        },
    });

    return instance
        .post(url, CustomerOrderDetails)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        })

}