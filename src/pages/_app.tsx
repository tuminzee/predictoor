import { type AppType } from "next/dist/shared/lib/utils";
import { StarknetConfig, InjectedConnector } from "@starknet-react/core";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const connectors = [new InjectedConnector({ options: { id: "argentX" } })];
  return (
    <StarknetConfig connectors={connectors}>
      <Component {...pageProps} />
    </StarknetConfig>
  );
};

export default MyApp;
