import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Table } from 'react-bootstrap';

class TableEntry {
    constructor(public name: string, public id: string, public password: string) {}

    render () {
        return (
            <tr>
                <th>{this.name}</th>
                <th>{this.id}</th>
                <th>{this.password}</th>
            </tr>
        )
    }
}

const exampleData = [
    new TableEntry("Sean", "spwilson27@gmail.com", "super secret"),
    new TableEntry("Sean", "spwilson27@gmail.com", "super secret"),
]

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
            {exampleData.map(o => o.render())}
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
