import React, { FC } from "react";
import { Input, Label } from 'reactstrap';

interface InputWithLabelProps {
  label: string;
  value: number;
  setValue: (value: string, category: string) => void;
}

const InputWithLabel:FC<InputWithLabelProps> = (props) => {
  const {
    label,
    value,
    setValue
  } = props;

  return (
    <>
      <Label>{label}</Label>
      <Input type="number" value={value} onChange={(e) => setValue(e.target.value, label)} />
    </>
  );
};

export default InputWithLabel;
