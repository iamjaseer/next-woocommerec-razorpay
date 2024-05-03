'use client'
import Image from "next/image";
import MakePaymentComponent from "./Components/PaymentButton";
import { useEffect, useState } from "react";


export default function Home() {




  //CART
  const cartItem =
    [
      {
        items: 'Sample item 1',
        amount: 1,
        tax: 0,
        shipping: 0,
        total: 1
      }
    ]






  //STATES

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [shippingAddress, setShippingAddress] = useState([])
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);



  const ShippingAddressHandler = () => {
    setShippingAddress(
      [
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          address: address
        }
      ]

    )
  }


  const checkoutData = [...shippingAddress, ...cartItem]


  useEffect(() => {

    validateForm()


  }, [firstName, lastName, email, phone, address]);




  // Validate form 
  const validateForm = () => {
    let errors = {};

    if (!firstName) {
      errors.firstName = 'First name is required.';
    }
    if (!lastName) {
      errors.lastName = 'Last name is required.';
    }

    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }

    if (!phone) {
      errors.phone = 'Phone is required.';
    }

    if (!address) {
      errors.address = 'Address is required.';
    }
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };


  //validateForm()

  //console.log(shippingAddress)


  return (
    <>
   
    <div className="p-5">
   <div>
   <h1 className="text-center text-3xl font-bold text-sky-500 my-16">Next.js Razorpay Payment Gateway</h1>
   </div>
 <div>
 <div className="lg:w-3/4 mx-auto">
        <div className="lg:flex  justify-between gap-8">
          <div className="bg-white rounded-md p-10 shadow grid gap-8 w-full">
            <h3 className="font-bold text-xl uppercase">Shipping Address</h3>
            <form onChange={ShippingAddressHandler}>
              <div className="grid gap-5">
                <div className="md:flex grid gap-5 w-full">
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="border border-gray-200  w-full rounded-md py-3 px-4 text-black hover:border-sky-500 active:border-sky-500 focus:border-sky-500"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    {errors.firstName && <p className="text-red-500 pt-3">{errors.firstName}</p>}
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="border border-gray-200  w-full rounded-md py-3 px-4 text-black hover:border-sky-500 active:border-sky-500 focus:border-sky-500"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    {errors.lastName && <p className="text-red-500 pt-3">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="md:flex grid gap-5">
                  <div className="w-full">
                    <input
                      type="email"
                      placeholder="Email"
                      className="border border-gray-200  w-full rounded-md py-3 px-4 text-black hover:border-sky-500 active:border-sky-500 focus:border-sky-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {errors.email && <p className="text-red-500 pt-3">{errors.email}</p>}
                  </div>
                  <div className="w-full">
                    <input
                      type="number"
                      placeholder="Phone"
                      className="border
                 border-gray-200  w-full rounded-md py-3 px-4 text-black hover:border-sky-500 active:border-sky-500 focus:border-sky-500"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    {errors.phone && <p className="text-red-500 pt-3">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <textarea
                    rows="4"
                    placeholder="Address"
                    className="border border-gray-200  w-full rounded-md py-3 px-4 text-black hover:border-sky-500 active:border-sky-500 focus:border-sky-500"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  >
                  </textarea>
                  {errors.address && <p className="text-red-500 pt-3">{errors.address}</p>}
                </div>
              </div>
            </form>
          </div>
          <div className="bg-white rounded-md p-10 shadow grid gap-2 lg:w-2/4 mt-5 lg:mt-0">
            <h3 className="font-bold text-xl uppercase">Order Summary</h3>
            <div className="grid gap-3">
              <div className="grid gap-2">
                <p className="text-base uppercase flex justify-between">
                  <span>Item</span>
                  <span>{cartItem[0].items}</span>
                </p>
                <p className="text-base uppercase flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{cartItem[0].amount}</span>
                </p>
                <p className="text-base uppercase flex justify-between">
                  <span>Tax</span>
                  <span>₹{cartItem[0].tax}</span>
                </p>
                <p className="text-base uppercase flex justify-between">
                  <span>Shipping</span>
                  <span>₹{cartItem[0].shipping}</span>
                </p>
              </div>
              <p className="text-lg font-bold uppercase border-t border-t-black py-4 flex justify-between mt-5">
                <span>PAYABLE AMOUNT</span>
                <span>₹{cartItem[0].total}</span>
              </p>
              {/* <button onClick={validateForm}>asdasdasd</button> */}
              {isFormValid && <MakePaymentComponent paymentData={checkoutData} />}
            </div>

          </div>
        </div>
      </div>
 </div>
    </div>
    </>
  );
}
