//0== Test; 1= Production
export let isTesting = 0;

export let ApiBaseURL =
    isTesting === 0
        ? "https://localhost:7255"
        : "";

export let appURL =
    isTesting === 0
        ? "http://localhost:3000/"
        : ""

export let baseName =
    isTesting === 0
        ? ""
        : "/EyePiece"


export let api_UserName = "eyePiece_apiuser";
export let api_Password = "H*;!JQP8?zm#Ljk1";
export let api_AuthURL = "/api/Auth/authentication";
export let api_GetUserDetails = "/api/Account/GetUserDetails"

export let api_CustomerOrder = "/api/CustomerOrder/"
