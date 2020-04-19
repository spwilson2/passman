export interface PasswordEntryIface {
    name: string,
    login: string,
    password: string,
    tags: string[],
    notes: string,
}

export class PasswordEntry {
    public name: string;
    public login: string;
    public password: string;
    public tags: string[];
    public notes: string;
    //public data: PasswordEntryIface;

    public constructor(
        name: string, 
        password: string, 
        login: string, 
        {notes = '', tags = []} = {}) {
        this.name = name;
        this.password = password;
        this.login = login;
        this.notes = notes;
        this.tags = tags;
    }
}

export class ValueError extends Error {
    constructor(m: string) {
        super(m);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ValueError.prototype);
    }
}

class PasswordContainerDTO {
    public constructor(
        public data: PasswordEntryIface[],
        public nextId: number,
    ) {
    }

    public static newFromSerialized(obj: any) {

        if (obj.nextId === undefined)
            throw Error("Missing nextId field");
        if (obj.data === undefined)
            throw Error("Missing data field");
        return new PasswordContainerDTO(obj.data, obj.nextId);
    }
}

// A simple database of password entries
export class PasswordContainer {
    private constructor(
        private nextId: number,
        private _entries: Map<number, PasswordEntryIface>) 
    {
    }

    public static newEmpty(nextId: number=1): PasswordContainer {
        return new PasswordContainer(nextId, new Map<number, PasswordEntryIface>());
    }

    public static newFromSerialized(serialized: string): PasswordContainer {
        let j = JSON.parse(serialized);
        // NOTE: Should be of format PasswordContainerDTO

        if (j === undefined) {
            throw new ValueError("Data could not be parsed as JSON");
        }

        let obj: PasswordContainerDTO = PasswordContainerDTO.newFromSerialized(j);

        // Now use the manager to parse our data
        let dataMap = new Map<number, PasswordEntryIface>();

        for (let idx in obj.data) {
            dataMap.set(parseInt(idx), obj.data[idx]);
        }
        return new PasswordContainer(obj.nextId, dataMap);
    }


    public add(entry: PasswordEntryIface): number {
        let id = this.nextId++;
        this._entries.set(id, entry);
        return id;
    }

    public update(id: number, entry: PasswordEntryIface) {
        return this._entries.get(id);
    }

    public getCopyOf(id: number): PasswordEntryIface | undefined {
        let oldEntry = this._entries.get(id);
        if (oldEntry === undefined)
            return undefined;
        return Object.assign({}, oldEntry);
    }

    public keys(): IterableIterator<number> {
        return this._entries.keys();
    }

    public size(): number {
        return this._entries.size;
    }

    public serialize(): string {
        // Entries will be serialized into an object version of the Map
        let data: any = {};
        for (let [key, val] of this._entries) {
            data[key.toString()] = val;
        }

        let obj = new PasswordContainerDTO(data, this.nextId);
        return JSON.stringify(obj);
    }
}
