import sjcl from 'sjcl';

export default class Encryptor {
    public static encrypt(data: string, password: string): string {
        // Cast to unknwon as ts type definiton is incorrect
        // https://bitwiseshiftleft.github.io/sjcl/doc/sjcl.json.html
        try {
            return btoa(sjcl.encrypt(password, data) as unknown as string);
        } catch(e) {
            throw new Error(e);
        }
    }

    public static decrypt(data: string, password: string): string {
        try {
            data = atob(data);
            return sjcl.decrypt(password, data);
        } catch(e) {
            throw new Error(e);
        }
    }

}
