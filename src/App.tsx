import React from 'react';
import logo from './logo.svg';
import './App.css';

class TableEntry {
    private state: any;
    constructor(name: string, id: string, password: string) {
        this.state = {
            "name": name,
            "id": id,
            "password": password,
            "hidden": true,
        };
    }

    renderPassword() {
        if (this.state.hidden)
            return ("•".repeat(8));
        return this.state.password;
    }

    render () {
        return (
            <tr>
                <td>{this.state.name}</td>
                <td>{this.state.id}</td>
                <td>{this.renderPassword()}</td>
            </tr>
        )
    }
}

class PasswordTableComponent extends React.Component<{}, any> {

    constructor(props:any) {
        super(props);
    }

    render() {
        return (
            <table className="pure-table">
            <tr>
                <th>Name</th>
                <th>ID (Email, Username, Etc.)</th>
                <th>Password</th>
            </tr>
            <tbody>
                {exampleData.map(o => o.render())}
            </tbody>
            </table>
        )
    }
}

const exampleData = [
    new TableEntry("Dropbox", "spwilson27@gmail.com", "super secret"),
    new TableEntry("Dropbox", "spwilson27@gmail.com", "super secret"),
]

//class BackendSelectionModal extends React.Component<{}, {show: boolean}> {
//
//    constructor(props:any) {
//        super(props);
//        this.handleLoad = this.handleLoad.bind(this);
//        this.state = {show: false};
//    }
//
//    componentDidMount() {
//        window.addEventListener('load', this.handleLoad);
//    }
//
//    handleLoad() {
//        this.setState({show: false});
//    }
//
//    render() {
//        return (
//            <Modal show={this.state.show}>
//                <Modal.Header closeButton>
//                    <Modal.Title>Backend Selection</Modal.Title>
//                </Modal.Header>
//                <Modal.Body>
//                    <p>
//                        Select the platform which you'd like to store your encrypted password data in.
//                    </p>
//                    <Button>None (Don't save data)</Button>
//                </Modal.Body>
//            </Modal>
//        )
//    }
//}

function App() {
    return (
        <div className="App">
        <header className="App-header">
        </header>
             <div className="pure-menu pure-menu-horizontal" style={{textAlign:"left"}} >
                <a className="pure-menu-heading pure-menu-link">Passman</a>
                <ul className="pure-menu-list">
                </ul>
            </div>           
            <PasswordTableComponent />
        </div>
    );
}


/*
 * TODO: Single page app.
 */

export default App;
