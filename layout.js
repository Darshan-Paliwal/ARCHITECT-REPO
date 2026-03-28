import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "ArcStudio | Architecture & Interior Design",
  description: "Award-winning architecture and interior design studio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-dark text-cream antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1A1A1A",
              color: "#F5F5F0",
              border: "1px solid #2E2E2E",
              borderRadius: "4px",
              fontFamily: "DM Sans, sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
    }
