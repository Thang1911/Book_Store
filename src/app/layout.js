"use client";

import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "@/components/navbar/Navbar";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import SessionProvider from "./SessionProvider";
import { persistor, store } from "../app/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import FreeDelivery from "@/components/freeDelivery/FreeDelivery";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <SessionProvider>
              <FreeDelivery />
              <Navbar />
              {children}
              <Footer />
              <ToastContainer />
            </SessionProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
