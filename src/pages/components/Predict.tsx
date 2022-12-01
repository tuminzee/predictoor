import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Player } from "@lottiefiles/react-lottie-player";
import { TEAM, STATUS, STATUS_TEXT } from "../../constants";
import {
  useContract,
  useStarknetCall,
  useStarknetExecute,
} from "@starknet-react/core";
import {
  ETH_ADDRESS,
  PREDICT_ADDRESS,
  MAIN_ADDRESS,
  MAIN_ABI,
} from "../../constants";
import { Abi } from "starknet";
import { toBN, toFelt } from "starknet/utils/number";
import { bnToUint256, uint256ToBN } from "starknet/dist/utils/uint256";

interface Props {
  matchId: number;
}

const Predict: NextPage<Props> = (props) => {
  const [isChecked, setIsChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  // const { teamA, teamB } = props;
  const { matchId } = props;

  const teamA = 1;
  const teamB = 2;

  const status = 1;

  const { contract: mainContract } = useContract({
    address: MAIN_ADDRESS,
    abi: MAIN_ABI as Abi,
  });

  const {
    data: matchData,
    loading: matchLoading,
    error,
    refresh,
  } = useStarknetCall({
    contract: mainContract,
    method: "get_match",
    args: [toFelt(toBN(matchId))],
    options: {
      watch: true,
    },
  });

  if (matchData) {
    // console.log(matchData[0]);
    const { a, b, poolAmount, status, t_teamA, t_teamB, winner } = matchData[0];
    console.log({
      matchId,
      a: a.toNumber(),
      b: b.toNumber(),
      poolAmount: uint256ToBN(poolAmount).toNumber(),
      status: status.toNumber(),
      t_teamA: t_teamA.toNumber(),
      t_teamB: t_teamB.toNumber(),
      winner: winner.toNumber(),
    });
  }

  const { execute, loading: submitLoading } = useStarknetExecute({
    calls: [
      {
        contractAddress: ETH_ADDRESS,
        entrypoint: "approve",
        calldata: [MAIN_ADDRESS, "10000000000", 0],
      },
      {
        contractAddress: MAIN_ADDRESS,
        entrypoint: "predictoor",
        calldata: [toFelt(matchId), "10000000000", "0", "1"],
      },
    ],
  });

  useEffect(() => {
    if (status === STATUS_TEXT.FINSIHED) {
      setIsDisabled(true);
    }
    if (status === STATUS_TEXT.LIVE) {
      setIsDisabled(false);
    }
  }, [status]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const tx = await execute();
      if (tx) {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      setIsDisabled(true);
      console.log(e);
    }
  };

  const handleClaim = async () => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        console.log("submit");
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePrediction = () => {
    setIsChecked((e) => !e);

    if (status === STATUS_TEXT.FINSIHED) {
      <div className="toast">
        <div className="alert alert-info">
          <div>
            <span>New message arrived.</span>
          </div>
        </div>
      </div>;
    }
  };

  // Todo get teamA and teamB from calling the sm

  if (matchLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center">
        {/* Status of Match */}
        <span className="badge bg-white font-bold text-black">
          {STATUS[status]}
        </span>
        <label className="inline-flex cursor-pointer items-center rounded-md p-2 dark:text-gray-800">
          <input
            type="checkbox"
            className="peer hidden"
            disabled={isDisabled || isLoading}
            id="first"
            name="first"
            onChange={handlePrediction}
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
                  {TEAM[teamA]}
                </span>
              </button>
              <span className="rounded-r-md bg-white p-4 px-5 py-3 font-extrabold">
                {TEAM[teamB]}
              </span>
            </>
          ) : (
            <>
              {/* Team B is selected */}
              <span className="rounded-l-md bg-white p-4 px-5 py-3 font-extrabold">
                {TEAM[teamA]}
              </span>
              <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-r-md p-4 px-5 py-3 font-medium text-indigo-600 shadow-2xl">
                <span className="ease absolute top-0 left-0 -mt-10 -ml-3 h-40 w-40 rounded-full bg-red-500 blur-md transition-all duration-700"></span>
                <span className="ease absolute inset-0 h-full w-full transition duration-700 group-hover:rotate-180">
                  <span className="absolute bottom-0 left-0 -ml-10 h-24 w-24 rounded-full bg-purple-500 blur-md"></span>
                  <span className="absolute bottom-0 right-0 -mr-10 h-24 w-24 rounded-full bg-pink-500 blur-md"></span>
                </span>
                <span className="relative font-extrabold text-white">
                  {TEAM[teamB]}
                </span>
              </button>
            </>
          )}
        </label>

        {status === STATUS_TEXT.FINSIHED && (
          <>
            <button onClick={handleClaim} className="btn">
              Claim
            </button>
          </>
        )}

        {status === STATUS_TEXT.LIVE && (
          <>
            <button onClick={handleSubmit} className="btn">
              Submit
            </button>
          </>
        )}

        {isLoading && <Player autoplay loop src="/trx.json"></Player>}
      </div>
    </>
  );
};

export default Predict;
