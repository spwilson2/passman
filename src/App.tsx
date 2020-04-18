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
            if (!this.state.container) {
                //this.setState(() => {
                //    let container = PasswordContainer.newEmpty();
                //    container.addEntry(newEntry);
                //    return {
                //        container: container,
                //    }
                //})
            }
            else {
                this.state.container!.updateEntry(idx, newEntry);
            }
        });
        this.props.history.push("/");
    }

    private handleEditItem (idx: number, entry: PasswordEntry) {
        this.props.history.push('/edit/' + idx);
    }

    private renderOptTable() {
        // TODO Break these generators into separate classes.
        let names = [];
        let hintMessageOrTable = (
            <div>
                <h2>
                No entires exist! 
                </h2>
                <h3>
                Click "Import" to import an existing database or "Add Entry" to start one! 
                </h3>
            </div>
        );

        if (this.state.container) {
            let entries = this.state.container!.entries();
            for (let e of entries) {
                names.push(e);
            }

            hintMessageOrTable = (
                <table className="pure-table">
                <thead>
                    <tr>
                        <th> 
                            Accounts
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

        return (
            <div>
                {hintMessageOrTable}
                <button onClick={this.handleAddItem}> Add Entry </button>
            </div>
        );
    }

    public render() {
        return (
            <div id="password-table">
                <Route exact path="/">
                    <button onClick={() => this.props.history.push("/import")}> Import </button>
                    {if (this.state.container)
                    <button onClick={() => this.props.history.push("/export")}> Export </button> 
                    {this.renderOptTable()}
                </Route>
                <Route path="/import" exact >
                    <ImportText onCancel={this.handleChildCancel} onSuccess={this.handleCreateSuccess} />
                </Route>
                <Route path="/export" exact >
                  <ExportText entries={this.state.container} onCancel={this.handleChildCancel}/>
                </Route>
                <Route path="/create" exact >
                  <CreateEntry onCancel={this.handleChildCancel} onSuccess={this.handleAddSuccess} />
                </Route>
                <Route path="/edit/:id" exact >
                  <EditEntry entry={this.state.container} 
                                onCancel={this.handleChildCancel} 
                                onSuccess={this.handleEditSuccess} />
                </Route>
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
