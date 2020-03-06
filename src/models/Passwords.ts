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
class EncryptionManager {
    private static DUMMY_DATA = "WhatsInTheBox:" + VERSION;
    private masterPassword: string;
    // Dummy data used to test password decryption
    private dummyData: string;

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
            throw "Decrypted some non-manager data";
        } catch (e) {
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
        private _entries: Map<number, PasswordEntry>,
        private manager: EncryptionManager) 
    {
    }

    public static fromPassword(password: string): PasswordContainer {
        return new PasswordContainer(
            1,
            new Map<number, PasswordEntry>(),
            EncryptionManager.fromPassword(password)
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
        if (!('data' in j)) {
            throw "Parsing invalid object, missing data prop";
        }
        if (!('nextId' in j)) {
            throw "Parsing invalid object, missing nextId prop";
        }

        let manager = EncryptionManager.fromSerialized(password, j['manager']);
        if (!manager) {
            return null;
        }

        // Now use the manager to parse our data
        let data = manager.decrypt(j['data']);
        let data_obj = JSON.parse(data);
        let data_map = new Map<number, PasswordEntry>(data_obj.entries());

        return new PasswordContainer(j['nextId'], data_map, manager);
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
    public encryptSerialized(): string {

        // Entries will be serialized into an object version of the map
        var obj : any = {};
        for (let entry of this._entries) {
            obj[entry[0].toString()] = entry[1];
        }
        let data = JSON.stringify(obj);
        // Encrypt it
        let s = this.manager.encrypt(data);
        s = JSON.stringify({
            version: VERSION,
            values: data,
            nextId: this.nextId,
            // Manager should be unencrypted
            manager: this.manager.serialize(),
        });
        return s;
    }
}


export default PasswordContainer;
