'use client'

import { useEffect } from 'react';
import styles from './page.module.css';
import * as dotenv from 'dotenv';

function Page() {
  useEffect(() => {
    // Dynamically load the Jupiter script
    const script = document.createElement('script');
    script.src = "https://terminal.jup.ag/main-v2.js";
    script.onload = () => launchJupiter(); // Initialize Jupiter after the script loads
    document.head.appendChild(script);
  }, []);

  function launchJupiter() {
    dotenv.config({path: __dirname + '/.env'});
    const apiKey = process.env.REACT_APP_HELIUS_API_KEY; // Get the API key from environment variable
    console.log(apiKey)
    if (window.Jupiter) {
      window.Jupiter.init({ 
        displayMode: "integrated",
        integratedTargetId: "integrated-terminal",
        endpoint: `https://mainnet.helius-rpc.com/?api-key=39499f93-70e8-42b0-a690-1655c13bc6e9`,
        strictTokenList: false, 
        defaultExplorer: "SolanaFM",
        formProps: {
          initialAmount: "888888880000",
          initialInputMint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
          initialOutputMint: "AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR",
        },
      });
    } else {
      console.error("Jupiter script not loaded yet");
    }
  }

  return (
    <div className={styles.body}>
      <div id="integrated-terminal"></div>
    </div>
  );
}

export default Page;
