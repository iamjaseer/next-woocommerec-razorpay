"use client";
import React, { Suspense, useState } from "react";
import { useRouter } from "next/navigation";


const PaymentButton = ({ paymentData }) => {


 

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const makePayment = async () => {
    setIsLoading(true);

   
    //console.log(paymentData[0].firstName)

    
    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;;
    const data = await fetch("/api/order/create?amount=" + paymentData[1].total);
    const { order } = await data?.json();
    const options = {
      key: key,
      name: paymentData[0].firstName,
      firstName: paymentData[0].firstName,
      lastName: paymentData[0].lastName,
      email: paymentData[0].email,
      phone: paymentData[0].phone,
      address: paymentData[0].address,
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
            email: paymentData[0].email,
            
           }),
        });

        const res = await data.json();
        if (res?.error === false) {
          // redirect to success page
          //router.push("/success");
          alert('success payment')
          setIsLoading(false);
          console.log(response.razorpay_payment_id)
        }
      },
      prefill: {
        email: paymentData[0].email,
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
        {isLoading && <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex justify-center items-center">
        <div id="loading"></div>
          </div>}
       <button
         className="bg-sky-500 w-full rounded-md p-4 text-white font-bold uppercase hover:bg-sky-600 active:bg-sky-600 transition-all"
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

