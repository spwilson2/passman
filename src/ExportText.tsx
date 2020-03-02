import React from 'react';
import PasswordContainer from './models/Passwords';

class ExportText extends React.Component<{passwords:PasswordContainer}, {}> {

    public handleClick() {
    }

    public render() {
        return (
            <div>
            <textarea>
                ${this.props.passwords.encryptSerialized()} 
            </textarea>
            <button>Copy to Clipboard</button>
            </div>
        )
    }
}

export default ExportText;
