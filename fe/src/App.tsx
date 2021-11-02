import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';


import * as AA from '@risk9/AssetApi';

function App() {
    const configuration = AA.createConfiguration({
        baseServer: new AA.ServerConfiguration("http://localhost:5000", {})
    });

    const apiInstance = new AA.AssetApi(configuration);

    useEffect(() => {
        const callAsync = async () => {
            await apiInstance.assetGet().then((assets) => {
                assets.map(asset => {
                    console.log(asset.assetId)
                }
            })
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
