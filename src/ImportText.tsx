import React from 'react';
import PasswordContainer from './models/Passwords';
import {RouteComponentProps, withRouter} from "react-router-dom";
    

interface ImportTextProps extends RouteComponentProps {
    onSuccess: (container: PasswordContainer) => void,
    onCancel: () => void,
}

interface ImportTextState {
    password: any,
        data: any,
}

class ImportText extends React.Component<ImportTextProps, {}> {

    private password = React.createRef<HTMLInputElement>();
    private data = React.createRef<HTMLTextAreaElement>();

    constructor(props: any) {
        super(props);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleImportClick = this.handleImportClick.bind(this);
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

    public render() {
        return (
            <form>
                Password: <input ref={this.password}></input>
                <br></br>
                Encrypted Data: <textarea ref={this.data}></textarea>
                <br></br>
                <button onClick={this.handleCancelClick}>Cancel</button>
                <button onClick={this.handleImportClick}>Import</button>
            </form>
        )
    }
}

export default withRouter(ImportText);
