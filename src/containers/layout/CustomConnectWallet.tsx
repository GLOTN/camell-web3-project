import React, { useState } from "react";
import { Button } from "@/components";
import { WalletConnectWallet, WalletConnectChainID } from '@tronweb3/walletconnect-tron';

interface CustomConnectWalletButtonProps {
  cta: {
    title: string;
  };
}

const CustomConnectWalletButton: React.FC<CustomConnectWalletButtonProps> = ({ cta }) => {
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    const wallet = new WalletConnectWallet({
      network: WalletConnectChainID.Mainnet,
      options: {
        relayUrl: process.env.NEXT_PUBLIC_APP_RELAY_URL || 'wss://relay.walletconnect.com',
        projectId: process.env.NEXT_PUBLIC_APP_PROJECT_ID || '',
        metadata: {
          name: 'JustLend',
          description: 'JustLend WalletConnect',
          url: 'https://app.justlend.org/',
          icons: ['https://app.justlend.org/mainLogo.svg']
        }
      },
      web3ModalConfig: {
        themeMode: 'dark',
        themeVariables: {
          '--wcm-z-index': '1000'
        },
        explorerRecommendedWalletIds: [
          '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
          '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
        ]
      }
    });

    const { address: connectedAddress } = await wallet.connect();
    const formattedAddress = `${connectedAddress.slice(0, 6)}...${connectedAddress.slice(-5)}`;
    setAddress(formattedAddress);
  };

  return (
    <>
      <Button type="button" onClick={connectWallet} size="sm" center>
        {address ? `${address}` : cta.title}
      </Button>
    </>
  );
};

export default CustomConnectWalletButton;
