import { Button, Form, Modal } from "react-bootstrap"
import * as r9 from '@risk9/api';
import { useEffect, useState } from "react";

interface IAssetModalProps {
    show: boolean,
    closeCallback: Function,
    saveCallback: Function,
    predefinedAsset?: { id: number, asset: r9.AssetBinding }
}

const AssetModal = ({ show, closeCallback, saveCallback, predefinedAsset }: IAssetModalProps) => {
    const [asset, setAsset] = useState<r9.AssetBinding>({description: "", description2: "", numberThing: 0});

    useEffect(() => {
        setAsset(predefinedAsset?.asset ?? { description: "", description2: "", numberThing: 0});
    }, [predefinedAsset]);

    return (
        <Modal
            show={show}
            backdrop="static"
            onHide={closeCallback}
        >
            <Modal.Header>
                {predefinedAsset !== undefined ? 'Edit asset' : 'Add asset'}
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formDescription1">
                    <Form.Label>Description 1 <span className="text-danger">*</span></Form.Label>
                    <Form.Control required type="text" placeholder="Name of your thing..." value={asset?.description} onChange={(ev) => setAsset(prev => { return { ...prev, description: ev.target?.value } })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDescription2">
                    <Form.Label>Description 2</Form.Label>
                    <Form.Control type="text" placeholder="Resource of your thing..." value={asset?.description2} onChange={(ev) => setAsset(prev => { return { ...prev, description2: ev.target?.value } })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formNumberThing">
                    <Form.Label>Numberthing <span className="text-danger">*</span></Form.Label>
                    <Form.Control required type="number" placeholder="Risk assessment" min={0} value={asset?.numberThing} onChange={(ev) => setAsset(prev => { return { ...prev, numberThing: parseInt(ev.target?.value) } })} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => closeCallback()}>Cancel</Button>
                <Button onClick={() => saveCallback(asset)}>Save</Button>
            </Modal.Footer>

        </Modal>
    )
}

export default AssetModal;