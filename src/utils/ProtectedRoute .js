import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import { AES, enc } from "crypto-js";

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        debugger;
        const userToken = sessionStorage.getItem("user-token");
        if (!userToken || userToken === 'undefined') {
            // userToken = AES.decrypt(sessionStorage.getItem("EmployeeGID"), "EPKEY").toString(enc.Utf8);
            setIsLoggedIn(false);
            return navigate('/login');
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);
    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;