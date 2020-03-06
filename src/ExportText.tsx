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

    public render() {
        return (
            <div>
            <textarea defaultValue={this.props.entries.encryptSerialized()}>
            </textarea>
            <button>Copy to Clipboard</button>
            </div>
        )
    }
}

export default withRouter(ExportText);
