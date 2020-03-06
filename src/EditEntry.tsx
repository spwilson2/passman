import React from 'react';
import {PasswordContainer, PasswordEntry} from './models/Passwords';
import {RouteComponentProps, withRouter} from "react-router-dom";
import autobind from 'auto-bind';
    
interface MatchParams {
    id: string;
}

interface EditEntryProps extends RouteComponentProps<MatchParams> {
    onSuccess: (idx: number, entry: PasswordEntry) => void,
    onCancel: () => void,
        entries: PasswordContainer,
}
interface EditEntryState {
    idx: number;
    entry: PasswordEntry;
}

//interface EditEntryState {
//}

class EditEntry extends React.Component<EditEntryProps, EditEntryState> {

    private name = React.createRef<HTMLInputElement>();
    private login = React.createRef<HTMLInputElement>();
    private tags = React.createRef<HTMLInputElement>();
    private password = React.createRef<HTMLInputElement>();
    private notes = React.createRef<HTMLTextAreaElement>();

    constructor(props: any) {
        super(props);
        autobind(this);
        const {match: { params } } = this.props;
        let idx = parseInt(params.id);
        let entry = this.props.entries.get(idx);
        this.state = {
            idx: idx,
            entry: entry,
        };
    }

    private handleSaveClick() {
        let pe = {
            name: this.name.current!.value,
            tags: [this.tags.current!.value],
            password: this.password.current!.value,
            notes: this.notes.current!.value,
            login: this.login.current!.value,
        };
        this.props.onSuccess(this.state.idx, pe);
    }

    private handleExitClick() {
        this.props.onCancel();
    }

    public render() {
        let entry = this.state.entry;
        return (
            <form>
                Name: <input ref={this.name} defaultValue={entry.name} ></input>
                <br></br>
                Login: <input ref={this.login} defaultValue={entry.login}></input>
                <br></br>
                Password: <input ref={this.password} defaultValue={entry.password}></input>
                <br></br>
                Tags: <input ref={this.tags} defaultValue={entry.tags}></input>
                <br></br>
                Notes: <textarea ref={this.notes} defaultValue={entry.notes}></textarea>
                <br></br>
                <button onClick={this.handleExitClick}>Exit</button>
                <button onClick={this.handleSaveClick}>Save</button>
            </form>
        )
    }
}

export default withRouter(EditEntry);
