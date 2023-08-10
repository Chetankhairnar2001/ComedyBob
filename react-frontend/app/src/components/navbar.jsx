import { Link } from "wouter";
import { API_URL } from "../settings";
import raven from "../assets/raven.png";
import { useState } from "react";
import Cookies from "js-cookie";

const getUsername = () => {
    const url = API_URL + '/getusername/';
    
    const options = {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json',
            'X-CSRFToken':Cookies.get('csrftoken'),
        },
        credentials: 'include',
    };

    return fetch(url, options)
}

function Navbar() {

    const [loggedIn, setLoggedIn] = useState(true);
    const [username, setUsername] = useState('');

    const [checkedLoggedIn, setCheckLoggedIn] = useState(false);

    const getLoggedIn = () => {
            getUsername().then(res => {
                if (res.status == 403) {
                    setLoggedIn(false)
                } else {
                    //setUsername(res.body)
                    setLoggedIn(true)
                    res.json().then(name => {
                        setUsername(name)
                        
                    })
                    
                    //console.log(result)
                    
                }
            }
        )
    }
    if (checkedLoggedIn == false) {
        getLoggedIn()
        setCheckLoggedIn(true)
    }
    //
    console.log(loggedIn, username)


    return (
         <nav className="container mx-auto relative flex flex-wrap items-center justify-between">
             <div className="flex justify-normal items-center">
                <img className="max-width-sm" src={raven} width="100" height="100"/>
                <div className="font-bold">
                    Roaring Ravens™
                </div>
             </div>
             <div>
                <Link href="/" className="text-2xl inline-block mr-20 hover:text-yellow-400">
                    Home
                </Link>
                <Link href="/teams" className="text-2xl inline-block mr-20 hover:text-yellow-400">
                    Meet the Team
                </Link>
                <Link href="/generate" className="font-bold text-2xl inline-block mr-20 text-yellow-400 hover:text-amber-500">
                    Generate
                </Link>
                { loggedIn ? (
                    <>
                        <Link onClick={() => setLoggedIn(false)} href="/signout" className="text-2xl inline-block mr-20 hover:text-yellow-400">
                            Sign Out
                        </Link>
                        
                        <Link href="/saved_joke" className="text-2xl inline-block hover:text-yellow-400 mr-20">
                            Saved Jokes
                        </Link>
                        <Link className="text-3xl inline-block font-comic-sans text-amber-500" href="">{username}</Link>
                    </>
                ) 
                : (
                    <Link href="/signin" className="text-2xl inline-block mr-20 hover:text-yellow-400">
                        Sign In
                    </Link>
                )}
                
                
                
             </div>
         </nav>
    );
}
export default Navbar;
