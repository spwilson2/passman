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
        // Try and create a password container from the supplied input.
        let c = PasswordContainer.fromSerialized(
            this.password.current!.value, 
            this.data.current!.value);
        if (c)
            this.props.onSuccess(c);
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
