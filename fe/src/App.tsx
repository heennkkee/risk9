import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';


import * as r9 from '@risk9/api';

const configuration = new r9.Configuration({
    basePath: "http://localhost:5000"
});

const api = new r9.AssetApi(configuration);


function App() {

    const [assets, setAssets] = useState<r9.Asset[]>([]);

    useEffect(() => {
        const callAsync = async () => {
            await api.assetGet().then((assets) => {
                setAssets(assets);
            }).catch(err => {
                debugger;
                console.log("ERROR: ", err)
            });
        }
        callAsync();
    }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
