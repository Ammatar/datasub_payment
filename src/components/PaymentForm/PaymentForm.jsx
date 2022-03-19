import React, { useState, useEffect } from 'react';
import { IMaskInput } from 'react-imask';
import {
  FormControl,
  InputLabel,
  Input,
  Box,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import axios from 'axios';
import { months, years } from './dicts';

// -------------------------- Input Masks ---------------------------------
const CardMaskCustom = React.forwardRef(function CardMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask='0000 0000 0000 0000'
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const CVVMaskCustom = React.forwardRef(function CVVMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask='000'
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});
// -------------------------- Input Masks ---------------------------------

const PaymentForm = () => {
  // States
  const [payment, setPayment] = useState({
    cardnumber: '0000 0000 0000 0000',
    cvv: '000',
    amount: 0,
    month: '01',
    year: '2022',
  });

  const [disabled, setDisabled] = useState(true);

  // Handlers -------------------------------------------------------------
  const handleChange = (event) => {
    setPayment({
      ...payment,
      [event.target.name]: event.target.value,
    });
  };

  const handleRequest = async () => {
    const res = await axios('http://localhost:3100/api/payment', {
      method: 'post',
      data: {
        payment,
      },
    });
    console.log(res.data);
  };
  // Basic validation ------------------------------------------------------
  useEffect(() => {
    if (
      payment.cardnumber === '0000 0000 0000 0000' ||
      payment.cardnumber === '' ||
      payment.cardnumber.length !== 19 ||
      payment.year < new Date().getFullYear() ||
      (Number(payment.year) === new Date().getFullYear() &&
        Number(payment.month) < new Date().getMonth()) ||
      payment.cvv === '000' ||
      payment.cardnumber === '' ||
      payment.amount === 0 ||
      payment.amount === null
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [payment]);
  return (
    <main>
      {/* ----------------------------- Payment form markup ----------------------- */}
      {/* ----------------------------- Card Number ------------------------------- */}
      <FormControl variant='standard' sx={{ width: '100%' }}>
        <InputLabel htmlFor='formatted-card-mask-input'>Card number</InputLabel>
        <Input
          value={payment.cardnumber}
          onChange={handleChange}
          name='cardnumber'
          id='formatted-card-mask-input'
          inputComponent={CardMaskCustom}
        />
      </FormControl>
      {/* -------------------------------- Month and Year --------------------------- */}
      <Box sx={{ display: 'flex', width: '100%' }}>
        <FormControl fullWidth>
          {/* ------------------------------ Month ------------------------------- */}
          <InputLabel id='month-select-label'>Month</InputLabel>
          <Select
            labelId='month-select-label'
            id='month-select'
            value={payment.month}
            label='month'
            name='month'
            onChange={handleChange}
          >
            {months.map((el) => {
              return (
                <MenuItem value={el} key={el}>
                  {el}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          {/* ------------------------------- Year --------------------------------- */}
          <InputLabel id='year-select-label'>Year</InputLabel>
          <Select
            labelId='year-select-label'
            id='year-select'
            value={payment.year}
            label='year'
            name='year'
            onChange={handleChange}
          >
            {years.map((el) => {
              return (
                <MenuItem value={el} key={el}>
                  {el}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <FormControl variant='standard' sx={{ width: '100%' }}>
        {/* ------------------------------- CVV ------------------------------- */}
        <InputLabel htmlFor='formatted-cvv-mask-input'>CVV</InputLabel>
        <Input
          value={payment.cvv}
          onChange={handleChange}
          name='cvv'
          id='formatted-cvv-mask-input'
          inputComponent={CVVMaskCustom}
          type='password'
        />
      </FormControl>
      <FormControl variant='standard' sx={{ width: '100%' }}>
        {/* ------------------------------- Amount ------------------------------ */}
        <InputLabel htmlFor='formatted-amount-mask-input'>Amount</InputLabel>
        <Input
          value={payment.amount}
          onChange={handleChange}
          name='amount'
          id='formatted-amount-mask-input'
          // inputComponent={CVVMaskCustom}
          type='number'
        />
      </FormControl>
      <Button onClick={handleRequest} disabled={disabled}>
        Pay
      </Button>
      {/* ----------------------------- Payment form markup ----------------------- */}
    </main>
  );
};

export default PaymentForm;
