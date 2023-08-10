import { API_URL } from "../settings";
import Cookies from "js-cookie";
import "../Index.css"
import { Link } from "wouter";

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
    };
    
    fetch(url, options).then(res => res.json()
    ).then(res => {
        let token = res.token;
        console.log("token: ", res);
    });

    return (
        <div className="min-h-screen bg-gradient-to-r from-amber-500 to-yellow-300 flex justify-center items-center flex-col">
            <section className='body html signinsection'>
                <h1>Signed Out</h1>
                <br></br>
                <Link href="/signin" className="font-bold text-2xl inline-block mr-20 text-yellow-400 hover:text-amber-500">
                    Sign In
                </Link>
            </section>
        </div>
    )
}

export default SignOut;