import type { AppProps } from "next/app";
import { ChainProvider } from "@cosmos-kit/react";
import { wallets } from "@cosmos-kit/keplr";
import { assets, chains } from "chain-registry";
import { GasPrice } from "@cosmjs/stargate";

import { SignerOptions } from "@cosmos-kit/core";
import { Chain, AssetList } from "@chain-registry/types";

import { network } from "@/config";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const signerOptions: SignerOptions = {
    // signingStargate: (_chain: Chain) => {
    //   return getSigningCosmosClientOptions();
    // },
    signingCosmwasm: (chain: Chain) => {
      switch (chain.chain_name) {
        case network.chainName:
          return {
            gasPrice: GasPrice.fromString(network.gasPrice),
          };
      }
    },
  };

  return (
    <ChainProvider
      chains={chains}
      assetLists={assets}
      wallets={wallets}
      signerOptions={signerOptions}
      endpointOptions={{
        endpoints: {
          osmosistestnet: {
            rpc: [network.rpc],
          },
        },
      }}
      // walletConnectOptions={...} // required if `wallets` contains mobile wallets
      // walletModal={Modal}
    >
      <Component {...pageProps} />
    </ChainProvider>
  );
}
