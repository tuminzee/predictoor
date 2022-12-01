import { useState } from "react";
import type { NextPage } from "next";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

interface Props {
  teamA: string;
  teamB: string;
}

const Predict: NextPage<Props> = (props) => {
  const [isChecked, setIsChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { teamA, teamB } = props;

  return (
    <div className="flex items-center">
      <label className="inline-flex cursor-pointer items-center rounded-md p-2 dark:text-gray-800">
        <input
          type="checkbox"
          className="peer hidden"
          disabled={isLoading}
          id="first"
          name="first"
          onChange={(e) => setIsChecked((e) => !e)}
        />

        {isChecked ? (
          <>
            {/* Team A is selected */}
            <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-l-md p-4 px-5 py-3 font-medium text-indigo-600 shadow-2xl">
              <span className="ease absolute top-0 left-0 -mt-10 -ml-3 h-40 w-40 rounded-full bg-red-500 blur-md transition-all duration-700"></span>
              <span className="ease absolute inset-0 h-full w-full transition duration-700 group-hover:rotate-180">
                <span className="absolute bottom-0 left-0 -ml-10 h-24 w-24 rounded-full bg-purple-500 blur-md"></span>
                <span className="absolute bottom-0 right-0 -mr-10 h-24 w-24 rounded-full bg-pink-500 blur-md"></span>
              </span>
              <span className="relative font-extrabold text-white">
                {teamA}
              </span>
            </button>
            <span className="rounded-r-md bg-white p-4 px-5 py-3 font-extrabold">
              {teamB}
            </span>
          </>
        ) : (
          <>
            {/* Team B is selected */}
            <span className="rounded-l-md bg-white p-4 px-5 py-3 font-extrabold">
              {teamA}
            </span>
            <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-r-md p-4 px-5 py-3 font-medium text-indigo-600 shadow-2xl">
              <span className="ease absolute top-0 left-0 -mt-10 -ml-3 h-40 w-40 rounded-full bg-red-500 blur-md transition-all duration-700"></span>
              <span className="ease absolute inset-0 h-full w-full transition duration-700 group-hover:rotate-180">
                <span className="absolute bottom-0 left-0 -ml-10 h-24 w-24 rounded-full bg-purple-500 blur-md"></span>
                <span className="absolute bottom-0 right-0 -mr-10 h-24 w-24 rounded-full bg-pink-500 blur-md"></span>
              </span>
              <span className="relative font-extrabold text-white">
                {teamB}
              </span>
            </button>
          </>
        )}
      </label>

      {isLoading && <Player autoplay loop src="/trx.json"></Player>}

      <button onClick={() => setIsLoading((p) => !p)} className="btn">
        loading
      </button>
    </div>
  );
};

export default Predict;
