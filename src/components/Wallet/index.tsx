import React, { FC, useState, useEffect } from 'react';
import { Modal, ModalBody, Row, Col, Button, Label, Table } from 'reactstrap';
import { X } from 'react-feather';
import { useWeb3React } from "@web3-react/core"
import injected from "../connectors";
import './wallet.scss';
import { shortenAccountId } from './utils';

interface WalletProps {
  open: boolean;
  toggle: () => void;
}

const Wallet:FC<WalletProps> = ({open, toggle}) => {
  const [currentBalance, setCurrentBalance] = useState<string | undefined>(undefined);
  const { active, account, library, chainId, activate, deactivate } = useWeb3React();

  const connect = async () => {
    try {
      await activate(injected);
    } catch (err) {
      console.log(err);
    }
  };

  const disconnect = async () => {
    try {
      deactivate()
    } catch (err) {
      console.log(err);
    }
  };

  const getBalance = async (id: string) => {
    try {
      await library.eth.getBalance(id, (err: any, result: any) => {
        setCurrentBalance(result);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    if(account) {
      getBalance(account);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <Modal
      isOpen={open}
      toggle={toggle}
      centered
    >
      <ModalBody className='p-4 container-wallet'>
        <Row>
          <Col><h5>Wallet Details</h5></Col>
          <Col className='text-right'>
            <button className="button-transparent" onClick={toggle}>
              <X color="#000"/>
            </button>
          </Col>
        </Row>
        <Row className='wallet-body mt-3'>
          {!active ? 
            (
              <Col>
              <p className='pb-3 message-error'>
                Wallet is not connected yet. Click on the "Connect" button below to connect your wallet.
              </p>
              <Row>
                <Col>
                  <Button color='primary' onClick={connect}>Connect</Button>
                </Col>
                <Col>
                  <Button color='secondary' onClick={toggle}>Cancel</Button>
                </Col>
              </Row>
            </Col>
            ): (
            <Col className='px-3'>
              <Table>
                <thead>
                  <tr>
                    <th><Label>KEY</Label></th>
                    <th className='text-right'><Label>VALUE</Label></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Account</td>
                    <td className='text-right'>{account ? shortenAccountId(account) : ''}</td>
                  </tr>
                  <tr>
                    <td>Chain ID</td>
                    <td className='text-right'>{account ? chainId : ''}</td>
                  </tr>
                  <tr>
                    <td>Balance</td>
                    <td className='text-right'>{account && currentBalance ? (+currentBalance).toFixed(2) : ''}</td>
                  </tr>
                </tbody>
              </Table>
              <p className="text-center hint">
                Connected with Metamask
              </p>
              <Row className='pt-3'>
                <Col>
                  <Button color='danger' onClick={disconnect}>Disconnect</Button>
                </Col>
                <Col>
                  <Button color='secondary' onClick={toggle}>Back</Button>
                </Col>
              </Row>
            </Col>
            )
          }
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default Wallet;
