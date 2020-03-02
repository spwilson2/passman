import React from 'react';
import PasswordContainer from './models/Passwords';
import {RouteComponentProps, withRouter} from "react-router-dom";
    

interface NewTextProps extends RouteComponentProps {
    onSuccess: (container: PasswordContainer) => void,
    onCancel: () => void,
}

interface NewTextState {
    password: any,
}

class NewText extends React.Component<NewTextProps, {}> {

    private password = React.createRef<HTMLInputElement>();
    private data = React.createRef<HTMLTextAreaElement>();

    constructor(props: any) {
        super(props);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleNewClick = this.handleNewClick.bind(this);
    }

    private handleNewClick() {
        if (this.password.current!.value) {
            let p = PasswordContainer.fromPassword(this.password.current!.value);
            this.props.onSuccess(p);
        }
    }

    private handleCancelClick() {
        this.props.onCancel();
    }

    public render() {
        return (
            <form>
                Master Password: <input ref={this.password}></input>
                <br></br>
                <button onClick={this.handleCancelClick}>Cancel</button>
                <button onClick={this.handleNewClick}>New</button>
            </form>
        )
    }
}

export default withRouter(NewText);
