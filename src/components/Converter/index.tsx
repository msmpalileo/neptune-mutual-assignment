import React, { FC, useState } from 'react';
import { Row, Col, Card } from 'reactstrap';
import InputWithLabel from '../Input';
import { Repeat } from 'react-feather';

interface ConverterProps {
  toggle: () => void;
}

const Converter:FC<ConverterProps> = ({toggle}) => {
  const [NEP, setNEP] = useState<number>(0);
  const [BUSD, setBUSD] = useState<number>(0);

  // Update values
  const updateValues = (value: string, category: string) => {
    if(category === "NEP") {
      let nep = value;
      setNEP(+parseFloat(nep).toFixed(2));
      setBUSD(+(parseFloat(nep)*3).toFixed(2));
    } else {
      let busd = value;
      setBUSD(+parseFloat(busd).toFixed(2));
      setNEP(+(parseFloat(busd)/3).toFixed(2));
    }
  }

  return (
    <Row className='full-height-vh justify-content-center align-items-center'>
      <Col xs="12" md="6" lg="5">
        <Card className="wrapper-converter p-5">
          <h3 className='mb-4'>Crypto Converter</h3>
          <InputWithLabel label="NEP" value={NEP} setValue={updateValues} />
          <p className="text-center my-3">
            <Repeat color="#bbb"/>
          </p>
          <InputWithLabel label="BUSD" value={BUSD} setValue={updateValues} />
          <button className="button-transparent mt-4" onClick={toggle}>
            Check Wallet Details
          </button>
        </Card>
      </Col>
    </Row>
  )
};

export default Converter;
