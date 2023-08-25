import "@/styles/globals.css";
import { useState, createContext } from "react";
import { MoralisProvider } from "react-moralis";
import AppContext from "../../context/AppContext";
import { NotificationProvider } from "web3uikit";


export default function App({ Component, pageProps }) {
  const [nameContext, setNameContext] = useState("");

  return (
    <AppContext.Provider value={{ nameContext, setNameContext }}>
      <MoralisProvider initializeOnMount={false}>
    <NotificationProvider>
      <Component {...pageProps} />
    </NotificationProvider>
    </MoralisProvider>
    </AppContext.Provider>

  );
}
