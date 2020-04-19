import sjcl from 'sjcl';

// TODO A password container with following actions:
// - Accessor/Modifier of individual entries
// - Interation with a static ID number
//
//
export interface PasswordEntry {
    name: string,
    login: string,
    password: string,
    tags: string[],
    notes: string,
}

// A simple database of password entries
export class PasswordDataContainer {
    private constructor(
        private nextId: number,
        private _entries: Map<number, PasswordEntry>) 
    {
    }

    public serialize(): string {
        throw new Error('TODO');
    }
}


export class DataEncryptor {
    public static encrypt(data: string, password: string): string | Error {
        // Cast to unknwon as ts type definiton is incorrect
        // https://bitwiseshiftleft.github.io/sjcl/doc/sjcl.json.html
        try {
            return btoa(sjcl.encrypt(password, data)) as unknown as string;
        } catch(e) {
            return new Error(e);
        }
    }

    public static decrypt(data: string, password: string): string | Error {
        try {
            data = atob(data);
            return sjcl.decrypt(password, data);
        } catch(e) {
            return new Error(e);
        }
    }

}
