import sjcl from 'sjcl';

const VERSION = 'passman1';
/**
 *
 * Design decisions:
 * - Should each password be able to be individual encrypted?
 *  - No, a collection of passwords will be
 */

/**
 * Each password 
 *
 */
export interface PasswordEntry {
    name: string,
    login: string,
    password: string,
    tags: string[],
    notes: string,
}

type EncryptedData = string;
type DecryptedData = string;

/*
 *
 */
export class EncryptionManager {
    private static DUMMY_DATA = "WhatsInTheBox:" + VERSION;
    // Dummy data used to test password decryption
    private dummyData: string;
    private masterPassword: string;

    private constructor(password: string) {
        this.masterPassword = password;
        this.dummyData = EncryptionManager.DUMMY_DATA;
    }

    public static fromPassword(password: string): EncryptionManager {
        return new EncryptionManager(password);
    }

    public encrypt(data: DecryptedData): EncryptedData {
        return sjcl.encrypt(this.masterPassword, data);
    }

    public decrypt(data: EncryptedData): DecryptedData {
        return sjcl.decrypt(this.masterPassword, data);
    }
    
    private static tryDecrypt(password: string, data: EncryptedData): DecryptedData | null {
        try {
            let result = sjcl.decrypt(password, data);
            return result;
        } catch (e) {
            if (e instanceof sjcl.exception.invalid) {
                return null;
            }
            throw e;
        }
    }

    public static fromSerialized(password: string, data: string): EncryptionManager | null {
        try {
            let m = this.tryDecrypt(password, data);
            if (m === EncryptionManager.DUMMY_DATA)
                return new EncryptionManager(password);
        } catch (e) {
            throw "Decrypted some non-manager data";
        }
        return null;
    }

    public serialize(): string {
        return this.encrypt(this.dummyData);
    }
}

/**
 * The password Container is the main data container for passwords.
 *
 * It will be used to interact with and query info about passwords.
 */
export class PasswordContainer {


    private constructor(
        private nextId: number,
        private _entries: Map<number, PasswordEntry>) 
    {
    }

    public static newEmpty(): PasswordContainer {
        return new PasswordContainer(
            1,
            new Map<number, PasswordEntry>()
        );
    }

    public static fromSerialized(password: string, s: string): PasswordContainer | null {
        let j = JSON.parse(s);

        // Verify the data works
        if (j['version'] !== VERSION) {
            throw "Parsing Invalid Version";
        }
        if (!('manager' in j)) {
            throw "Parsing invalid object, missing manager prop";
        }
        if (!('values' in j)) {
            throw "Parsing invalid object, missing data prop";
        }
        if (!('nextId' in j)) {
            throw "Parsing invalid object, missing nextId prop";
        }

        let manager = EncryptionManager.fromSerialized(password, j['manager']);
        if (!manager) {
            throw "No manager"
            return null;
        }

        // Now use the manager to parse our data
        let data_map = new Map<number, PasswordEntry>();
        let data = manager.decrypt(j['values']);
        let data_obj : {[id:string]: PasswordEntry} = JSON.parse(data);

        for (let key in data_obj) {
            data_map.set(parseInt(key), data_obj[key]);
        }

        return new PasswordContainer(j['nextId'], data_map);
    }

    public addEntry(entry: PasswordEntry) {
        this._entries.set(this.nextId++, entry);
    }

    public updateEntry(idx: number, entry: PasswordEntry) {
        this._entries.set(idx, entry);
    }

    public get(idx: number): PasswordEntry {
        return this._entries.get(idx)!;
    }

    public entries(): IterableIterator<[number, PasswordEntry]> 
    {
            return this._entries.entries();
    }

    // Serialize the database into a JSON string
    public encryptSerialized(manager: EncryptionManager): string {

        // Entries will be serialized into an object version of the map
        var obj : any = {};
        for (let entry of this._entries) {
            obj[entry[0].toString()] = entry[1];
        }
        let data = JSON.stringify(obj);
        // Encrypt it
        data = manager.encrypt(data);
        let s = JSON.stringify({
            version: VERSION,
            values: data,
            nextId: this.nextId,
            // Manager should be unencrypted
            manager: manager.serialize(),
        });
        return s;
    }
}


export default PasswordContainer;
