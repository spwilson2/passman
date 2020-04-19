import * as pw from './Passwords';

let name = "Slippin Jimmy";

test('Serialize empty returns empty object', () =>{
    let container = pw.PasswordContainer.newEmpty();
    let val = container.serialize();
})

test('Serialize roundtrip results in original values.', () =>{
    let container = pw.PasswordContainer.newEmpty();
    container.add(new pw.PasswordEntry(name, 'login', 'pass'))
    let serialized = container.serialize();

    let deserialized = pw.PasswordContainer.newFromSerialized(serialized);
    expect(container).toEqual(deserialized);
})

test('getCopyOf does not affect container value', () => {
    let container = pw.PasswordContainer.newEmpty();
    let entry = new pw.PasswordEntry(name, 'login', 'pass');
    let newId = container.add(entry);
    let newName = name + " Jr.";

    // Ensure that the default name isn't this so the test actually does verify
    // what we think it does.
    expect(entry.name).not.toEqual(newName);

    let copiedEntry = container.getCopyOf(newId)!;
    copiedEntry.name = newName;
    expect(copiedEntry.name).not.toEqual(entry.name);
}) 

test('getCopyOf returns undefined for nonexisting index', () => {
    let container = pw.PasswordContainer.newEmpty();
    expect(container.getCopyOf(100)).toBeUndefined();
}) 

test('getCopyOf sets name from existing entry', () => {
    let container = pw.PasswordContainer.newEmpty();
    let entry = new pw.PasswordEntry(name, 'login', 'pass');
    let idx = container.add(entry);
    expect(container.getCopyOf(idx)!.name).toEqual(name);
}) 
