import React from 'react';
import {PasswordContainer, EncryptionManager} from './models/Passwords';
import {RouteComponentProps, withRouter} from "react-router-dom";
import autobind from 'auto-bind';

interface ExportTextProps extends RouteComponentProps {
    onCancel: () => void,
    entries: PasswordContainer,
}

class ExportText extends React.Component<ExportTextProps, {}> {

    private password = React.createRef<HTMLInputElement>();
    private data = React.createRef<HTMLTextAreaElement>();
    constructor(props: any) {
        super(props);
        autobind(this)
    }

    public encryptEntries() {
        let manager = EncryptionManager.fromPassword(this.password.current!.value);
        return btoa(this.props.entries.encryptSerialized(manager));
    }

    private handleExportClick() {
        if (this.password.current!.value) {
            // TODO Encrypt using the current password.
            
        }
    }

    private handleCancelClick() {
        this.props.onCancel();
    }

    // TODO Edit to get password here form input box.

    public render() {
        return (
            <div>
            <form>
                Master Password: <input ref={this.password}></input>
                <br></br>
                <button onClick={this.handleCancelClick}>Cancel</button>
                <button onClick={this.handleExportClick}>New</button>
            </form>

            <textarea hidden defaultValue={this.encryptEntries()}>
            </textarea>
            <button>Copy to Clipboard</button>
            </div>
        )
    }
}

/**
                        <h2>Error! No passwords loaded.</h2>
                        <button onClick={this.handleChildCancel}>Go Back</button>
**/
export default withRouter(ExportText);
