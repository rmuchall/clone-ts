import {Clone} from "../src/Clone";

test("Date", () => {
    const source = new Date("1970-01-01T00:00:00.000+00:00");
    const destination = Clone.deep(source);
    expect.assertions(2);
    expect(destination).toBeInstanceOf(Date);
    expect(destination.toISOString()).toBe("1970-01-01T00:00:00.000Z");
});

test("RegExp", () => {
    const source = new RegExp("test", "i");
    const destination = Clone.deep(source);
    expect.assertions(5);
    expect(destination).not.toBe(source);
    expect(destination).toBeInstanceOf(RegExp);
    expect(destination.source).toEqual(source.source);
    expect(destination.flags).toEqual(source.flags);
    expect(destination.lastIndex).toEqual(source.lastIndex);
});

test("ArrayBuffer", () => {
    const source = new ArrayBuffer(16);
    const destination = Clone.deep(source);
    expect.assertions(3);
    expect(destination).not.toBe(source);
    expect(destination).toBeInstanceOf(ArrayBuffer);
    expect(destination.byteLength).toEqual(16);
});
