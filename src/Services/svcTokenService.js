import axios from 'axios'

import { ApiBaseURL, api_UserName, api_Password, api_AuthURL } from '../Constant/Constant'

export let FetchToken = () => {
    const url = ApiBaseURL + api_AuthURL;
    const param_data = { UserName: api_UserName, Password: api_Password };

    return axios
        .post(url, param_data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        })
}