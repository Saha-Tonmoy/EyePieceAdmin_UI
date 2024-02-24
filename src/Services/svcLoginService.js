import axios from 'axios';

import { ApiBaseURL, api_GetUserDetails } from '../Constant/Constant';

export let fetchUserDetails = (token, EmployeeGID, Password) => {
    const url = ApiBaseURL + api_GetUserDetails + '/' + EmployeeGID + '/' + Password;

    const instance = axios.create({
        headers: { 'Authorization': 'Bearer' + token }
    });

    return instance
        .get(url)
        .then((response) => {
            debugger;
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        })

}