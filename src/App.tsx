import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Table } from 'react-bootstrap';

const tableStyle = {
    width: '100%',
};

function App() {
    return (
        <div className="App">
        <header className="App-header">
        <Table bordered hover striped variant="dark">
        <tr>
            <th>Name</th>
            <th>ID (Email, Username, Etc.)</th>
            <th>Password</th>
        </tr>
        <tbody>
            <tr>
                <th>Sean</th>
                <th>spwilson27@gmail.com</th>
                <th>Secret pass</th>
            </tr>
            <tr>
                <th>Sean</th>
                <th>spwilson27@gmail.com</th>
                <th>Secret pass</th>
            </tr>
        </tbody>
        </Table>
        </header>
        </div>
    );
}


/*
 * TODO: Single page app.
 */

export default App;
