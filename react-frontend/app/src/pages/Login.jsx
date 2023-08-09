import { useRef, useState, useEffect, useContext } from 'react';

import "./login.css"

import { API_URL } from "../settings";
const LOGIN_URL ='/signin/';

const Login = () => {
    //const setAuth = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = API_URL + '/signin/';
            const options = {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Credentials': 'true',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(
                    {
                        username: user,
                        password: pwd
                    }
                )
            };
            
            //stores sessionid cookie automatically
            fetch(url, options).then(res => res.json());

            setUser('');
            setPwd('');
            setSuccess(true);

            //add redirect 

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
                console.log(err)
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br></br>
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <div className="min-h-screen bg-gradient-to-r from-amber-500 to-yellow-300 flex justify-center items-center flex-col">
                <section className="signinsection body html">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form className="form textarea" onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"

                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button className='button font-bold text-2xl text-yellow-400'>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line font-bold text-2xl text-yellow-400">
                            {/*put router link here*/}
                            <a href="">Sign Up</a>
                        </span>
                    </p>
                </section>
                </div>
            )}
        </>
    )
}

export default Login
