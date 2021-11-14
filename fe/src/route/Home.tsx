import { useState, useEffect, useContext } from "react";
import { Button, Row, Col, ListGroup } from "react-bootstrap"
import ApiContext from "../context/ApiContext";

import * as r9 from '@risk9/api';
import { faArrowsAltV, faPen, faPlus, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AssetModal from "../comp/AssetModal/AssetModal";

const Home = () => {
    const api = (useContext(ApiContext) as r9.AssetApi);

    const [assets, setAssets] = useState<r9.Asset[]>([]);

    const [draggingAsset, setDraggingAsset] = useState<r9.Asset | null>(null);
    const [hoverOver, setHoverOver] = useState<r9.Asset | null>(null);

    
    const [showAssetModal, setShowAssetModal] = useState(false);
    const [editAsset, setEditAsset] = useState < { id: number, asset: r9.AssetBinding } | undefined>(undefined);

    useEffect(() => {
        if (editAsset !== undefined) {
            setShowAssetModal(true);
        }
    }, [editAsset]);

    useEffect(() => {
        const loadAssets = async () => {
            await api.assetGet().then((assets) => {
                setAssets(assets);
            });
        }
        loadAssets();
    }, [api]);
    

    return (
        <>
            <AssetModal show={showAssetModal} closeCallback={() => { setShowAssetModal(false); setEditAsset(undefined); }} saveCallback={async (obj: r9.AssetBinding) => {
                if (editAsset !== undefined) {
                    await api.assetIdPut(editAsset.id, obj).then(updatedAsset => {
                        let oldAssetIx = assets.findIndex(x => x.assetId === updatedAsset.assetId);
                        setAssets([...assets.slice(0, oldAssetIx), updatedAsset, ...assets.slice(oldAssetIx + 1)])
                    });
                } else {
                    await api.assetPost(obj).then(newAsset => {
                        setAssets([...assets, newAsset]);
                    });
                }
                setShowAssetModal(false);
                setEditAsset(undefined);
            }} predefinedAsset={editAsset} />
            <Row>
                <Col xs="12">
                    <h2>Hello HOMEPAGE</h2>
                    <ListGroup onMouseLeave={() => { setDraggingAsset(null); }}>
                        {assets.map((asset, ix) =>
                        {
                            let isDroppableTarget = (draggingAsset !== null && hoverOver?.assetId === asset.assetId);
                            let isDraggingThis = (draggingAsset?.assetId === asset.assetId);
                                return <ListGroup.Item key={asset.assetId} variant={isDraggingThis ? 'warning' : isDroppableTarget ? 'info' : (ix % 2 === 0) ? 'dark' : ''}
                                    onMouseLeave={() => { if (draggingAsset !== null) setHoverOver(null); }}
                                    onMouseEnter={() => { if (draggingAsset !== null) setHoverOver(asset); }}
                                    onMouseUp={() => {
                                        if (draggingAsset !== null) {
                                            // Probably pretty inefficient, just store some references to waht ix is being moved around?
                                            let filteredAssets = assets.filter(x => x.assetId !== draggingAsset.assetId);
                                            let reorderedAssets = [...filteredAssets.slice(0, ix), draggingAsset, ...filteredAssets.slice(ix)];
                                            setAssets(reorderedAssets);
                                            setDraggingAsset(null);
                                            setHoverOver(null);
                                        }
                                    } }
                                >
                                    <Row>
                                        <Col xs="12">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <h4>{asset.description}</h4>
                                                    <p>{asset.description2} <small>({asset.numberThing})</small></p>
                                                </div>
                                                <div>
                                                    <Button className="me-2" onMouseDown={() => { setDraggingAsset(asset); } }><FontAwesomeIcon icon={(draggingAsset?.assetId === asset.assetId ? faTimes : faArrowsAltV)} /></Button>
                                                    <Button className="me-2" onClick={() => {
                                                        setEditAsset({ id: asset.assetId, asset: { description: asset.description, description2: asset.description2, numberThing: asset.numberThing } });
                                                        // Alternative would be to use { asset: { ...asset }}, this would populate everything though (including properties not needed for binding)
                                                        // But the only issue would be that we send "to much" data over.
                                                    }} ><FontAwesomeIcon icon={faPen} /></Button>
                                                    <Button variant="danger" onClick={async () => api.assetIdDelete(asset.assetId).then(() => setAssets([...assets.filter(x => x.assetId !== asset.assetId)]))}><FontAwesomeIcon icon={faTrash} /></Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>;
                            }
                        )}
                    </ListGroup>
                    <Row className="py-3">
                        <Col xs="12" className="d-flex justify-content-center">
                            <Button type="submit" variant="success" onClick={() => { setShowAssetModal(true);}}>Add item <FontAwesomeIcon icon={faPlus} /></Button>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default Home;