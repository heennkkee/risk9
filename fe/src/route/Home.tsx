import { useRef, useState, useEffect, useContext } from "react";
import { Button, Table, Row, Col, Form } from "react-bootstrap"
import ApiContext from "../context/ApiContext";

import * as r9 from '@risk9/api';

const Home = () => {
    const api = (useContext(ApiContext) as r9.AssetApi);

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
    }, [api]);
    
    const addItem = async () => {

        api.assetPost({
            description: descrRef.current?.value || "",
            description2: descr2Ref.current?.value,
            numberThing: parseInt(numberThingRef?.current?.value || '0')
        }).then(newAsset => {
            setAssets([...assets, newAsset]);
            descrRef.current!.value = "";
            descr2Ref.current!.value = "";
            numberThingRef.current!.value = "";
        });
    }
    return (
        <>
            <Row>
                <Col xs="12">
                    <h2>Hello HOMEPAGE</h2>
                    <Table striped size="sm" responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Description2</th>
                                <th>numberThing</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {assets.map(asset =>
                                <tr key={asset.assetId}>
                                    <td>{asset.assetId}</td>
                                    <td>{asset.description}</td>
                                    <td>{asset.description2}</td>
                                    <td>{asset.numberThing}</td>
                                    <td><Button variant="outline-primary" onClick={async () => api.assetIdDelete(asset.assetId).then(() => setAssets([...assets.filter(x => x.assetId !== asset.assetId)]))}>Remove</Button></td>
                                </tr>)}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col xs="12" className="border-top">
                    <Form onSubmit={(ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        addItem();
                    }}>
                        <Form.Group className="mb-3" controlId="formDescription1">
                            <Form.Label>Description 1 <span className="text-danger">*</span></Form.Label>
                            <Form.Control required type="text" placeholder="Name of your thing..." ref={descrRef} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription2">
                            <Form.Label>Description 2</Form.Label>
                            <Form.Control type="text" placeholder="Resource of your thing..." ref={descr2Ref} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formNumberThing">
                            <Form.Label>Numberthing <span className="text-danger">*</span></Form.Label>
                            <Form.Control required type="number" placeholder="Risk assessment" ref={numberThingRef} min={0} />
                        </Form.Group>
                        <Button type="submit" variant="success" disabled={descrRef.current?.value === "" || numberThingRef.current?.value === ""}>Add</Button>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default Home;