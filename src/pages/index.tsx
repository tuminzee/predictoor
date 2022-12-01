import {
  useAccount,
  useConnectors,
  useContract,
  useStarknetExecute,
} from "@starknet-react/core";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Abi } from "starknet";
import { Radio } from "@nextui-org/react";
import Predict from "./components/Predict";

import { ETH_ADDRESS, ETH_ABI, PREDICT_ADDRESS } from "../constants";
const Home: NextPage = () => {
  const { connect, connectors } = useConnectors();
  const [isChecked, setIsChecked] = useState(false);

  const { account, address } = useAccount();

  const { contract } = useContract({
    address: ETH_ADDRESS,
    abi: ETH_ABI as Abi,
  });

  const approveTxDepositBal = async () => {
    if (!contract) {
      throw Error("Contract Not Found");
    }
    const tx = await contract.approve(
      "0x014226e7621f81340e1ab3a99b170372c5de29063e86f67b7b8c3395304f3944",
      ["100000", "0"]
    );
    if (tx) {
      await execute();
    }
  };

  const calls = useMemo(() => {
    const tx = {
      contractAddress: PREDICT_ADDRESS,
      entrypoint: "deposit_eth",
      calldata: [1, 0],
    };
    return [tx];
  }, []);

  const { execute } = useStarknetExecute({ calls });

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
                    onClick={() => connect(connector)}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg p-4 px-5 py-3 font-medium text-indigo-600 shadow-2xl"
                  >
                    <span className="ease absolute top-0 left-0 -mt-10 -ml-3 h-40 w-40 rounded-full bg-red-500 blur-md transition-all duration-700"></span>
                    <span className="ease absolute inset-0 h-full w-full transition duration-700 group-hover:rotate-180">
                      <span className="absolute bottom-0 left-0 -ml-10 h-24 w-24 rounded-full bg-purple-500 blur-md"></span>
                      <span className="absolute bottom-0 right-0 -mr-10 h-24 w-24 rounded-full bg-pink-500 blur-md"></span>
                    </span>
                    <span className="relative font-extrabold text-white">
                      Connect X {connector.id()}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center gap-12 px-4 py-16">
          {address && (
            <>
              <button
                onClick={() => {
                  console.log("account", account);
                }}
                className="btn normal-case text-white"
              >
                Show Balance
              </button>

              {contract && (
                <button
                  className="btn normal-case text-white"
                  onClick={approveTxDepositBal}
                >
                  Approve Transactions
                </button>
              )}
            </>
          )}

          <Predict teamA={"TUMIN"} teamB={"SANTOSH"} />
          <Predict teamA={"ARGENTINA"} teamB={"MEXIO"} />
        </div>
      </main>
    </>
  );
};

export default Home;
