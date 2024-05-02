"use client";
import React, { Suspense, useState } from "react";
import { useRouter } from "next/navigation";


const PaymentButton = ({ amount }) => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const makePayment = async () => {
    setIsLoading(true);

    // make an endpoint to get this key
    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;;
    const data = await fetch("/api/order/create?amount=" + 1);
    const { order } = await data?.json();
    const options = {
      key: key,
      name: 'jaseerali2012@gmail.com',
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      modal: {
        ondismiss: function () {
          setIsLoading(false);
        },
      },
      handler: async function (response) {
        const data = await fetch("/api/order/verify", {
          method: "POST",
          body: JSON.stringify({
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            email: 'jaseerali2012@gmail.com',
          }),
        });

        const res = await data.json();
        if (res?.error === false) {
          // redirect to success page
          //router.push("/success");
          alert('success payment')
        }
      },
      prefill: {
        email: 'jaseerali2012@gmail.com',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      alert("Payment failed. Please try again.");
      setIsLoading(false);
    });
  };

  return (
    <>
      <Suspense fallback={''}>
        <div className="">
          <button
         
            onClick={() => makePayment()}
          >
            Pay Now
          </button>
        </div>
      </Suspense>
    </>
  );
};

export default PaymentButton;

