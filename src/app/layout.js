import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
          <body>
            {children}
          </body>
      </html>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
}