import { useAccount, useConnectors } from "@starknet-react/core";
import { type NextPage } from "next";
import Head from "next/head";
import Predict from "./components/Predict";

import { MATCH_LIST } from "../constants";
const Home: NextPage = () => {
  const { connect, connectors, disconnect } = useConnectors();

  const { address } = useAccount();

  const Style = (
    <>
      <span className="ease absolute top-0 left-0 -mt-10 -ml-3 h-40 w-40 rounded-full bg-red-500 blur-md transition-all duration-700"></span>
      <span className="ease absolute inset-0 h-full w-full transition duration-700 group-hover:rotate-180">
        <span className="absolute bottom-0 left-0 -ml-10 h-24 w-24 rounded-full bg-purple-500 blur-md"></span>
        <span className="absolute bottom-0 right-0 -mr-10 h-24 w-24 rounded-full bg-pink-500 blur-md"></span>
      </span>
    </>
  );

  return (
    <>
      <Head>
        <title>WAGMI11</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen items-center bg-black">
        {/* NavBar */}
        <div>
          <div className="navbar justify-between rounded-lg pt-5 pl-3 pr-3">
            <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg p-4 px-5 py-3 font-medium text-indigo-600 shadow-2xl">
              {Style}
              <span className="relative font-extrabold text-white">
                PredicTOR
              </span>
            </button>

            <ul>
              {connectors.map((connector) => (
                <li key={connector.id()}>
                  <button
                    onClick={() =>
                      address ? disconnect() : connect(connector)
                    }
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg p-4 px-5 py-3 font-medium text-indigo-600 shadow-2xl"
                  >
                    <span className="ease absolute top-0 left-0 -mt-10 -ml-3 h-40 w-40 rounded-full bg-red-500 blur-md transition-all duration-700"></span>
                    <span className="ease absolute inset-0 h-full w-full transition duration-700 group-hover:rotate-180">
                      <span className="absolute bottom-0 left-0 -ml-10 h-24 w-24 rounded-full bg-purple-500 blur-md"></span>
                      <span className="absolute bottom-0 right-0 -mr-10 h-24 w-24 rounded-full bg-pink-500 blur-md"></span>
                    </span>
                    <span className="relative font-extrabold text-white">
                      {address ? (
                        <>{address.toString().substring(0, 10)}</>
                      ) : (
                        <>Connect X {connector.id()}</>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-12 px-4 py-16">
          {address ? (
            <>
              {MATCH_LIST.map((match, idx) => {
                return (
                  <div key={idx}>
                    <Predict matchId={match} />
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {/* <button className="btn" >Please connect wallet</button> */}
              <div className="alert alert-error shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 flex-shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Please connect your wallet</span>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
