import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider } from "thirdweb/react";
import { createThirdwebClient, defineChain, getContract } from "thirdweb";
import { clientId } from "./client";

export const client = createThirdwebClient({
  clientId: clientId,
});

export const contract = getContract({ 
  client, 
  chain: defineChain(11155111), 
  address: "0xEC7f8203FDc373d7768C1c685e123e608d211d19"
});
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider>
      <Router>
          <App />  
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);
