import React from 'react';
import {PasswordEntry} from './models/Passwords';
import {RouteComponentProps, withRouter} from "react-router-dom";
    

interface CreateEntryProps extends RouteComponentProps {
    onSuccess: (entry: PasswordEntry) => void,
    onCancel: () => void,
}

//interface CreateEntryState {
//}

class CreateEntry extends React.Component<CreateEntryProps, {}> {

    private name = React.createRef<HTMLInputElement>();
    private login = React.createRef<HTMLInputElement>();
    private tags = React.createRef<HTMLInputElement>();
    private password = React.createRef<HTMLInputElement>();
    private notes = React.createRef<HTMLTextAreaElement>();

    constructor(props: any) {
        super(props);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleFinishClick = this.handleFinishClick.bind(this);
    }

    private handleFinishClick() {
        let pe = {
            name: this.name.current!.value,
            tags: [this.tags.current!.value],
            password: this.password.current!.value,
            notes: this.notes.current!.value,
            login: this.login.current!.value,
        };
        this.props.onSuccess(pe);
    }

    private handleCancelClick() {
        this.props.onCancel();
    }

    public render() {
        return (
            <form>
                Name: <input ref={this.name}></input>
                <br></br>
                Login: <input ref={this.login}></input>
                <br></br>
                Password: <input ref={this.password}></input>
                <br></br>
                Tags: <input ref={this.tags}></input>
                <br></br>
                Notes: <textarea ref={this.notes}></textarea>
                <br></br>
                <button onClick={this.handleCancelClick}>Cancel</button>
                <button onClick={this.handleFinishClick}>Finish</button>
            </form>
        )
    }
}

export default withRouter(CreateEntry);
