// import React from 'react'

// const saved_joke = () => {
//   return (
//     <div>
//       Joke Summary
//     </div>
//   )
// }

// export default saved_joke

import React, { useState, useEffect } from "react";
import { API_URL } from "../settings";
import Cookies from "js-cookie";
import { Redirect } from "wouter";

function SavedJokes() {
  const url = API_URL + "/savedjokes/";
  const [savedJokes, setSavedJokes] = useState([]);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    fetchSavedJokes();
  }, []);

  const fetchSavedJokes = async () => {
    try {
      const response = await fetch(url, {
        credentials: "include",
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setSavedJokes(data);
      } else if (data === "Please log in!") {
        setLogin(true);
      } else {
        console.error("Invalid saved jokes data:", data);
      }
    } catch (error) {
      console.error("Error fetching saved jokes:", error);
    }
  };

  return (
    <>
      {login ? (
        <Redirect to="/signin" />
      ) : (
        <div className="min-h-screen bg-gradient-to-r from-amber-500 to-yellow-300 flex justify-center items-center flex-col">
          <div className="container max-w-3xl px-5">
            <h1 className="text-2xl mb-3 font-bold mt-20 text-center">
              Saved Jokes
            </h1>
            <ul className="bg-slate-200 rounded p-2">
              {savedJokes.map((joke, index) => (
                <>
                  <li key={index} className="mb-2 block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    {joke}
                  </li>
                </>
              ))}
            </ul>

          </div>
          <br></br>
        </div>
      )}
    </>
  );
}

export default SavedJokes;
