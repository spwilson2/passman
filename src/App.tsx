import React from 'react';
import './App.css';
import ExportText from './ExportText';
import {PasswordContainer, PasswordEntry} from './models/Passwords';

interface NullablePCState {
    container?: PasswordContainer;
}


class PasswordTableComponent extends React.Component<{}, NullablePCState> {

    constructor(props:any) {
        super(props);
        this.state = {};
    }

    public handleImportClick() {
        console.log("Hello")
    }
    public handleExportClick() {
        console.log("Hello")
    }

    private renderOptTable() {
        if (!('container' in this.state))
            return "";
        return (
            <table className="pure-table">
            <thead>
                <tr>
                    <th> 
                        Accounts | <button> Add item </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {this.state.container}
            </tbody>
            </table>
        );
    }

    public render() {
        return (
            <div id="password-table">
                {/* Opens the import dialogue.*/}
                <button onClick={this.handleImportClick}> Import </button>
                {/* Opens the export dialogue.*/}
                <button onClick={this.handleExportClick}> Export </button>

                {this.renderOptTable()}
            </div>
        )
    }
}

class App extends React.Component<{}, NullablePCState> {
    constructor(props:any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="App">
            <header >
            </header>
                 <div >
                    <h1> Passman </h1>
                </div>           
                <PasswordTableComponent />
            </div>
        );
    }
}

export default App;
