const { NextResponse } = require("next/server");
const Razorpay = require("razorpay");
const { v4: uuid } = require("uuid");

const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
});

exports.GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const totalAmount = Number(searchParams.get("amount")); // in paisa

  const amount = totalAmount * 100;
  const options = {
    amount: amount.toString(),
    currency: "INR",
    receipt: uuid(),
  };

  const order = await instance.orders.create(options);
  return NextResponse.json({ message: "success", order });
};

