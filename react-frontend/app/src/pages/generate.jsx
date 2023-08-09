import { useState } from "react";
import { API_URL } from "../settings";
import Title from "../assets/Title.png";
import Cookies from "js-cookie";
import { Redirect } from "wouter";

const getJoke = (prompt, type) => {
    const url = API_URL + '/summary/';
    
    const options = {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json',
            'X-CSRFToken':Cookies.get('csrftoken'),
        },
        credentials: 'include',
        body: JSON.stringify(
            {
                text: prompt,
                type: type
            }
        )
    };

   

    return fetch(url, options).then(res => res.json())
    
}

function Generate() {

    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('...');
    const [login, setLogin] = useState(false);

    const [type, setType] = useState('Type');

    const onSubmit = () => {
        getJoke(prompt, type).then(result => {
            if (result == "Please log in!") {
                setLogin(true)
            } else {
                setLogin(false)
            }
            console.log(result)
            setResult(result);
        }).catch(error => {
            console.log(error)
            setResult("Error: Check browser console for details");
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          onSubmit();
        
        }
      };

    let dropdownAdjustment = ""

    if (type == "Knock Knock") {
        dropdownAdjustment = ""
    } else {
        dropdownAdjustment = "mt-3"
    }

    let input_placeholder = ""

    if (type == "Completion") {
        input_placeholder="Enter an incompleted joke"
    } else {
        input_placeholder="Enter words separated by commas: tree, face"
    }

    return ( 
        <>
            {login ? (<Redirect to="/signin"></Redirect>) : (
    
                <div className="min-h-screen bg-gradient-to-r from-amber-500 to-yellow-300 flex justify-center items-center flex-col">
                    
                    <div className="flex justify-center items-center">
                        <img className="" src={Title} width="500"/>
                    </div>
                    <div className="h-[40px]"></div>
                    <div className="container max-w-3xl px-5">
                        <div className="flex flex-row">
                            
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="81" viewBox="0 0 490 81" fill="none">
                                    <rect width="595" height="81" fill="black" stroke="black"/>
                                    <circle cx="0" cy="40.5" r="40.5" fill="black" stroke="black"/>
                                    <foreignObject width="500" height="300">
                                        <input 
                                            type="text" 
                                            name="prompt" 
                                            id="prompt" 
                                            placeholder={input_placeholder}
                                            value={prompt}
                                            className="outline-none focus:ring-0 w-full mb-5 rounded bg-transparent p-2 py-5 mt-1 text-2xl text-white font-comic-sans"
                                            
                                            required
                                            onChange={e => setPrompt(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </foreignObject>
                                </svg>
                                
                            
                            <svg xmlns="http://www.w3.org/2000/svg" width="155" height="81" viewBox="0 0 155 81" fill="none" overflow="visible">
                                <circle cx="112" cy="40.5" r="40.5" fill="#262626"/>
                                <rect width="112" height="81" fill="#262626"/>
                                <foreignObject width="120" height="300">
                                    <div className="w-full items-center justify-center bg-transparent" >
                                    <div className={dropdownAdjustment}></div>
                                    <div className="group relative cursor-pointer">
                                        <div className="flex items-center justify-between">
                                        <a
                                            className="menu-hover my-2 py-2 text-base font-medium text-yellow-400 px-4 font-comic-sans text-2xl"
                                        
                                        >
                                            {type}
                                        </a>
                                        <span>
                                            <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="yellow"
                                            className="h-6 w-6"
                                            >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                            />
                                            </svg>
                                        </span>
                                        </div>
                                        <div className="invisible absolute z-50 flex w-full flex-col bg-[#262626] py-1 px-4 shadow-xl group-hover:visible"
                                            
                                            >
                                            <a
                                                className="my-2 block py-1 font-semibold text-yellow-400 hover:text-amber-500 md:mx-2 font-comic-sans"
                                                onClick={() => setType("Knock Knock")}>
                                                Knock Knock
                                            </a>
                                    
                                            <a
                                                className="my-2 block py-1 font-semibold text-yellow-400 hover:text-amber-500 md:mx-2 font-comic-sans"
                                                onClick={() => setType("Q and A")}
                                                >Q and A
                                            </a>

                                            <a
                                                className="my-2 block py-1 font-semibold text-yellow-400 hover:text-amber-500 md:mx-2 font-comic-sans"
                                                onClick={() => setType("Completion")}
                                                >Completion
                                            </a>
                                            
                                        </div>
                                    </div>
                                    </div>
                                </foreignObject>
                            </svg>
                        </div>
                        
                        <h1 className="text-2xl mb-3 font-bold mt-40">
                            Result
                        </h1>
                        <p className="p-2 bg-slate-200 rounded">
                            {result}
                        </p>
                    </div>
                
                </div>
            )
        }
        </>
    );
}
export default Generate;

