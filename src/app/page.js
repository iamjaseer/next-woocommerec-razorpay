import Image from "next/image";
import MakePaymentComponent from "./Components/PaymentButton";

export default function Home() {
  return (
    <div>
        <h4>Payment page</h4>
        <MakePaymentComponent/>
    </div>
  );
}
