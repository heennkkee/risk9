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
        const callAsync = async () => {
            await api.assetGet().then((assets) => {
                setAssets(assets);
            });
        }
        callAsync();
    }, []);

    const removeAsset = async (id: number) => {
        await api.assetIdDelete(id).then(() => {
            setAssets([...assets.filter(asset => asset.assetId !== id)]);
        });
    }

    const addAsset = async (inp: r9.AssetBinding) => {
        await api.assetPost(inp).then(asset => {
            setAssets([...assets, asset]);
        }).catch(err => {
            console.log("ERR", err);
        });
    }
    return (
        <div className="App">
            <table>
                <tbody>
                    {assets.map(asset =>
                        <tr>
                            <td>{asset.assetId}</td>
                            <td>{asset.description}</td>
                            <td>{asset.description2}</td>
                            <td>{asset.numberThing}</td>
                            <td><button onClick={() => removeAsset(asset.assetId)}>Remove</button></td>
                        </tr>)}
                </tbody>
            </table>
            <hr />
            <div>
                Descr: <input type="text" ref={descrRef} /><br />
                Descr2: <input type="text" ref={descr2Ref} /><br />
                NumberThing: <input type="number" ref={numberThingRef} min={0} /><br />
                <button onClick={() => {
                    addAsset({
                        description: descrRef.current?.value || "",
                        description2: descr2Ref.current?.value,
                        numberThing: parseInt(numberThingRef?.current?.value || '0'),
                    });
                }}>Add</button>
            </div>
        </div>
    );
}

export default App;
