
import * as r9 from '@risk9/api';

import './style/custom.scss';
import { Container } from 'react-bootstrap';
import { ApiProvider } from './context/ApiContext';
import { Routes, Route } from 'react-router';
import Home from './route/Home';
import Test from './route/Test';
import Sidebar from './comp/Sidebar/Sidebar';


const configuration = r9.createConfiguration({baseServer: new r9.ServerConfiguration('http://localhost:5000', {})});

const api = new r9.AssetApi(configuration);


function App() {
    return (
        <ApiProvider value={api}>
            <div className="d-flex h-100">
                <Sidebar />
                <Container fluid>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/test" element={<Test />} />
                    </Routes>
                </Container>
            </div>
        </ApiProvider>
    );
}

export default App;
