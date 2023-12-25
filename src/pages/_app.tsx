import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { ChainProvider, useChain } from "@cosmos-kit/react";
import { wallets } from "@cosmos-kit/keplr";
import { assets, chains } from "chain-registry";
import { GasPrice } from "@cosmjs/stargate";
import { SignerOptions } from "@cosmos-kit/core";
import { Chain, AssetList } from "@chain-registry/types";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import 'react-toastify/dist/ReactToastify.css';
  // minified version is also included
  // import 'react-toastify/dist/ReactToastify.min.css';

import store, { persistor } from "@/config/redux";
import "@/styles/globals.scss";
// Import this in your top-level route/layout
import "@interchain-ui/react/styles";
import { network } from "@/config";
import LayoutDefault from "@/layouts/LayoutDefault";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <LayoutDefault>{page}</LayoutDefault>);

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
            isLazy: true,
          },
        },
      }}
      // walletConnectOptions={...} // required if `wallets` contains mobile wallets
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {getLayout(<Component {...pageProps} />)}
          <ToastContainer />
        </PersistGate>
      </Provider>
    </ChainProvider>
  );
}
