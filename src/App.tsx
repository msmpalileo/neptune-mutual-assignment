import React, { useState } from "react";
import Converter from "./components/Converter";
import Wallet from "./components/Wallet";
import { Container } from 'reactstrap';
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3';

const getLibrary = (provider: any) => {
  return new Web3(provider)
}

function App() {
  const [walletOpen, setWalletOpen] = useState<boolean>(false);

  const handleWalletOpen = () => {
    setWalletOpen(!walletOpen);
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Container className="container-main h-100">
        <Converter toggle={handleWalletOpen}/>
        <Wallet open={walletOpen} toggle={handleWalletOpen} />
      </Container>
    </Web3ReactProvider>
  );
}

export default App;
