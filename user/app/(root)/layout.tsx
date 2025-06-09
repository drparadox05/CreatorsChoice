"use client";
import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider
} from '@solana/wallet-adapter-react-ui';

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL as string;
if (!RPC_URL) {
  throw new Error("NEXT_PUBLIC_RPC_URL is not defined in .env");
}

require('@solana/wallet-adapter-react-ui/styles.css');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const network = WalletAdapterNetwork.Mainnet;

  const wallets = useMemo(
      () => [],
      [network]
  );

    return (
      <ConnectionProvider endpoint={RPC_URL}>
          <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                  {children}
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  );
}
