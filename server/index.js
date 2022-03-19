const express = require('express');
const cors = require('cors');
const { dbConnect } = require('./DB/dbConnect');
const Payment = require('./DB/Models/Payment.model');
const PORT = 3100;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});
app.post('/api/payment', async (req, res) => {
  //   console.log(req.body);
  try {
    const { cardnumber, cvv, month, year, amount } = req.body.payment;
    const payment = await Payment.create({
      CardNumber: cardnumber,
      ExpDate: `${month}/${year}`,
      Month: month,
      Year: year,
      CVV: cvv,
      Amount: amount,
    });
    console.log(payment);
    res.json({ status: 'ok', id: payment._id, Amount: payment.Amount });
  } catch (err) {
    res.json({ status: 'failed', error: err });
  }
});

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server started at ${PORT}`);
});
