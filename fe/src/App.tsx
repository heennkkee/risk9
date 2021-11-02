import React, { useEffect, useRef, useState } from 'react';
import './App.css';

import * as r9 from '@risk9/api';

const configuration = r9.createConfiguration({baseServer: new r9.ServerConfiguration('http://localhost:5000', {})});

const api = new r9.AssetApi(configuration);


function App() {

    const descrRef = useRef<HTMLInputElement | null>(null);
    const descr2Ref = useRef<HTMLInputElement | null>(null);
    const numberThingRef = useRef<HTMLInputElement | null>(null);

    const [assets, setAssets] = useState<r9.Asset[]>([]);

    useEffect(() => {
        const loadAssets = async () => {
            await api.assetGet().then((assets) => {
                setAssets(assets);
            });
        }
        loadAssets();
    }, []);
    return (
        <div className="App">
            <table>
                <tbody>
                    {assets.map(asset =>
                        <tr key={asset.assetId}>
                            <td>{asset.assetId}</td>
                            <td>{asset.description}</td>
                            <td>{asset.description2}</td>
                            <td>{asset.numberThing}</td>
                            <td><button onClick={async () => await api.assetIdDelete(asset.assetId).then(() => setAssets([...assets.filter(x => x.assetId !== asset.assetId)]))}>Remove</button></td>
                        </tr>)}
                </tbody>
            </table>
            <hr />
            <div>
                Descr: <input type="text" ref={descrRef} /><br />
                Descr2: <input type="text" ref={descr2Ref} /><br />
                NumberThing: <input type="number" ref={numberThingRef} min={0} /><br />
                <button onClick={async () => {
                    api.assetPost({
                        description: descrRef.current?.value || "",
                        description2: descr2Ref.current?.value,
                        numberThing: parseInt(numberThingRef?.current?.value || '0'),
                    }).then(newAsset => setAssets([...assets, newAsset]));
                }}>Add</button>
            </div>
        </div>
    );
}

export default App;
