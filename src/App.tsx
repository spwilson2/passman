import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter,
    RouteComponentProps,
} from "react-router-dom";

import './App.css';
import NewText from './NewText';
import ExportText from './ExportText';
import ImportText from './ImportText';
import CreateEntry from './CreateEntry';
import {PasswordContainer, PasswordEntry} from './models/Passwords';

interface NullablePCState {
    container?: PasswordContainer;
}


class _PasswordTableComponent extends React.Component<RouteComponentProps<{}>, NullablePCState> {

    constructor(props:any) {
        super(props);
        this.state = {};
        this.handleChildCancel = this.handleChildCancel.bind(this);
        this.handleCreateSuccess = this.handleCreateSuccess.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleAddSuccess = this.handleAddSuccess.bind(this);
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
        this.props.history.push('/create')
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
                        {item[1].name}
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

        if (this.state.container) {
            exportButton = ( <button onClick={() => this.props.history.push("/export")}> Export </button> );
            exportRoute = (
                  <Route exact path="/export">
                    <ExportText passwords={this.state.container!}/>
                  </Route>
            );
            createRoute = (
                  <Route exact path="/create">
                    <CreateEntry onCancel={this.handleChildCancel} onSuccess={this.handleAddSuccess} />
                  </Route>
            );
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
