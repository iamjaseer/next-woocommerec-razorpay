import Script from 'next/script'
import '../../public/styles/theme.min.css';

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
          <body className='bg-sky-100  '>
            {children}
          </body>
      </html>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
}