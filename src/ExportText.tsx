import React from 'react';
import {PasswordContainer} from './models/Passwords';
import {RouteComponentProps, withRouter} from "react-router-dom";
import autobind from 'auto-bind';

interface ExportTextProps extends RouteComponentProps {
    onCancel: () => void,
    entries: PasswordContainer,
}

class ExportText extends React.Component<ExportTextProps, {}> {
    constructor(props: any) {
        super(props);
        autobind(this)
    }

    public handleClick() {
    }

    public encryptEntries() {
        return btoa(this.props.entries.encryptSerialized());
    }

    public render() {
        return (
            <div>
            <textarea defaultValue={this.encryptEntries()}>
            </textarea>
            <button>Copy to Clipboard</button>
            </div>
        )
    }
}

export default withRouter(ExportText);
