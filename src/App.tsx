import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter,
    RouteComponentProps,
} from "react-router-dom";

import autobind from 'auto-bind';

import './App.css';
import NewText from './NewText';
import ExportText from './ExportText';
import ImportText from './ImportText';
import CreateEntry from './CreateEntry';
import EditEntry from './EditEntry';
import {PasswordContainer, PasswordEntry} from './models/Passwords';

interface NullablePCState {
    container?: PasswordContainer;
}

class _PasswordTableComponent extends React.Component<RouteComponentProps<any>, NullablePCState> {

    constructor(props:any) {
        super(props);
        this.state = {};
        autobind(this);
    }

    private handleCreateSuccess(container: PasswordContainer) {
        this.setState({container: container})
        this.props.history.push("/");
    }

    private handleChildCancel() {
        console.log("Go back");
        this.props.history.push("/");
    }

    private handleAddSuccess(entry: PasswordEntry) {
        this.setState(() => {
            this.state.container!.addEntry(entry);
        });
        this.props.history.push("/");
    }

    private handleAddItem() {
        this.props.history.push('/create');
    }

    private handleEditSuccess(idx: number, newEntry: PasswordEntry) {
        this.setState(() => {
            this.state.container!.updateEntry(idx, newEntry);
        });
        this.props.history.push("/");
    }

    private handleEditItem (idx: number, entry: PasswordEntry) {
        this.props.history.push('/edit/' + idx);
    }

    private renderOptTable() {
        if (!this.state.container)
            return "";

        let entries = this.state.container!.entries();
        let names = [];
        for (let e of entries) {
            names.push(e);
        }
        return (
            <table className="pure-table">
            <thead>
                <tr>
                    <th> 
                        Accounts | <button onClick={this.handleAddItem}> Add item </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {names.map((item) => (
                    <tr key={item[0]}>
                        <td>
                            <button onClick={() => {this.handleEditItem(item[0], item[1])}} >{item[1].name}</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        );
    }

    public render() {

        let exportRoute;
        let exportButton;
        let createRoute;
        let viewEntryRoute;

        if (this.state.container) {
            exportButton = ( <button onClick={() => this.props.history.push("/export")}> Export </button> );
            exportRoute = (
                  <Route exact path="/export">
                    <ExportText entries={this.state.container!} onCancel={this.handleChildCancel}/>
                  </Route>
            );
            createRoute = (
                  <Route exact path="/create">
                    <CreateEntry onCancel={this.handleChildCancel} onSuccess={this.handleAddSuccess} />
                  </Route>
            );
            viewEntryRoute = (
                  <Route exact path="/edit/:id">
                    <EditEntry entries={this.state.container!} onCancel={this.handleChildCancel} onSuccess={this.handleEditSuccess} />
                  </Route>
            )
        }
        else {
            exportRoute = (
                  <Route exact path="/export">
                        <h2>Error! No passwords loaded.</h2>
                        <button onClick={this.handleChildCancel}>Go Back</button>
                  </Route>
            );
        }

        return (
            <div id="password-table">
                <Route exact path="/">
                    <button onClick={() => this.props.history.push("/new")}> New </button>
                    <button onClick={() => this.props.history.push("/import")}> Import </button>
                    {exportButton}
                    {this.renderOptTable()}
                </Route>
                <Route path="/import">
                    <ImportText onCancel={this.handleChildCancel} onSuccess={this.handleCreateSuccess} />
                </Route>
                <Route path="/new">
                    <NewText onCancel={this.handleChildCancel} onSuccess={this.handleCreateSuccess} />
                </Route>
                {exportRoute}
                {createRoute}
                {viewEntryRoute}
            </div>
        )
    }
}

let PasswordTableComponent = withRouter(_PasswordTableComponent);

class App extends React.Component<{}, {}> {
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
                <Router>
                <Switch>
                    <PasswordTableComponent />
                </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
