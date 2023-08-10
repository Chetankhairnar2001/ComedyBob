import React from "react";
import chetan from '../assets/chetan_image.png'
import kris from '../assets/kris.jpg'
import bob from '../assets/bob.jpg'
import vincent from '../assets/vincent.jpg'

const teams = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="card block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div>
            <img
              className="rounded-t-lg"
              src={chetan}
              alt=""
            />
          </div>
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              Chetan - Project Manager
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Hello I am Chetan currently pursuing MS in CS and AI enthusiast.
            </p>
          </div>
        </div>

        <div className="card block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div>
            <img
              className="rounded-t-lg"
              src={vincent}
              alt=""
            />
          </div>
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              Vincent - Full Stack Developer
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>

        <div className="card block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div>
            <img
              className="rounded-t-lg"
              src={bob}
              alt=""
            />
          </div>
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            Fan Bob - Backend Developer
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>

        <div className="card block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div>
            <img
              className="rounded-t-lg"
              src={kris}
              alt=""
            />
          </div>
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              Kris - Backend Developer
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>


      </div>
    </>
  );
};

export default teams;
