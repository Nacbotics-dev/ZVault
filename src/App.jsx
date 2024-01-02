import algosdk from 'algosdk'
import { PeraWalletConnect } from '@perawallet/connect';
import Dashboard from "./components/dashboard/Dashboard";
import { DaffiWalletConnect } from '@daffiwallet/connect';
import { DeflyWalletConnect } from '@blockshake/defly-connect';
import LandingPage from "./components/landingPage/LandingPage";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { WalletProvider, useInitializeProviders, PROVIDER_ID } from '@txnlab/use-wallet';




function App() {
    const providers = useInitializeProviders({
        providers: [
          { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
          { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
          { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
        ],
        nodeConfig: {
            network: 'testnet',
            nodeServer: 'https://testnet-api.algonode.cloud',
            nodeToken: '',
            nodePort: '443'
        },
        algosdkStatic: algosdk
      })

    return (
        <WalletProvider value={providers}>
            <Router>
                <Routes>
                    <Route exact path='/' element={ <LandingPage />} />
                    <Route exact path='/vaults' element={ <Dashboard />} />
                </Routes>

            </Router>
        </WalletProvider>
    )
}


export default App;
