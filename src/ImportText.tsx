import React from 'react';
import PasswordContainer from './models/Passwords';
import {RouteComponentProps, withRouter} from "react-router-dom";
import autobind from 'auto-bind';
    

interface ImportTextProps extends RouteComponentProps {
    onSuccess: (container: PasswordContainer) => void,
    onCancel: () => void,
}

interface ImportTextState {
    showPassword: boolean,
}

class ImportText extends React.Component<ImportTextProps, ImportTextState> {

    private password = React.createRef<HTMLInputElement>();
    private data = React.createRef<HTMLTextAreaElement>();

    constructor(props: any) {
        super(props);
        autobind(this);
        this.state = {showPassword: false};
    }

    public componentDidMount() {
        this.setPasswordDisplay(this.state.showPassword);
    }

    private handleImportClick() {

        // TODO Handle error if they give wrong data.
        let json_data = atob(this.data.current!.value);

        // Try and create a password container from the supplied input.
        let c = PasswordContainer.fromSerialized(
            this.password.current!.value, 
            json_data);
        if (c)
            this.props.onSuccess(c);
        this.handleCancelClick();
    }

    private handleCancelClick() {
        this.props.onCancel();
    }

    private setPasswordDisplay(show: boolean) {
        this.password.current!.type = show ? "text": "password";
        this.setState((state: ImportTextState) => {
            return {showPassword: show}
        });
    }

    private handleShowPassword(e: React.ChangeEvent<HTMLInputElement>) {
        this.setPasswordDisplay(e.target.checked);
    }

    public render() {
        return (
            <form>
                Master Password: <input autoComplete="current-password" ref={this.password}></input>
                <br></br>
                Encrypted Data: <textarea ref={this.data}></textarea>
                <input type="checkbox" checked={this.state.showPassword} onClick={() => this.setPasswordDisplay(!this.state.showPassword) }  onChange={this.handleShowPassword} /> Show Password
                <br></br>
                <button onClick={this.handleCancelClick}>Cancel</button>
                <button onClick={this.handleImportClick}>Import</button>
            </form>
        )
    }
}

export default withRouter(ImportText);
