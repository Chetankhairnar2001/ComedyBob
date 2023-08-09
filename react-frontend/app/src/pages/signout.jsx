import { API_URL } from "../settings";
import Cookies from "js-cookie";

const SignOut = () => {
    const url = API_URL + '/signout/';
    const options = {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json',
            'X-CSRFToken':Cookies.get('csrftoken')
        },
        credentials: 'include',
        // body: JSON.stringify(
        //     {
        //         username: user,
        //         password: pwd
        //     }
        // )
    };
    
    fetch(url, options).then(res => res.json()
    ).then(res => {
        let token = res.token;
        console.log("token: ", res);
    });

    return (
        <p>Signed Out</p>
    )
}

export default SignOut;