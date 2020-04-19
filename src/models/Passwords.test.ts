import {DataEncryptor} from './Passwords';


// Test encryption
// Test decryption

let secretString = 'Hello world!';
let password = 'pass';

test('Encrypt + Decrypt resolve to original value', () => {
    let encryptedString = DataEncryptor.encrypt(secretString, password);
    let decryptedString = DataEncryptor.decrypt(encryptedString, password);
    expect(decryptedString).toEqual(secretString);
});

test('Encrypt creates base64 string', () => {
    let encryptedString = DataEncryptor.encrypt(secretString, password);

    // https://stackoverflow.com/questions/475074/regex-to-parse-or-validate-base64-data
    // https://www.ietf.org/rfc/rfc4648.txt
    let base64Regex = new RegExp('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$');
    expect(encryptedString).toMatch(base64Regex);
});

test('Encrypt passsword collection')
