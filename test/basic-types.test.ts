import {Clone} from "../src/Clone";

test("primitives", () => {
    let destination: any;
    expect.assertions(4);
    destination = Clone.deep(null);
    expect(destination).toBe(null);
    destination = Clone.deep(true);
    expect(destination).toBe(true);
    destination = Clone.deep(123);
    expect(destination).toBe(123);
    destination = Clone.deep("test");
    expect(destination).toBe("test");
});

test("simple object", () => {
    const source: Record<string, any> = {
        name: "Doodad",
        color: "Blue",
        model: 1234
    }

    const destination = Clone.deep(source);
    expect.assertions(4);
    expect(destination).toBeInstanceOf(Object);
    expect(destination.name).toEqual("Doodad");
    expect(destination.color).toEqual("Blue");
    expect(destination.model).toEqual(1234);
});

test("simple class instance", () => {
    class Widget {
        name: string;
        color: string;
        model: number;
    }

    const source = Object.assign<Widget, Widget>(new Widget, {
        name: "Doodad",
        color: "Blue",
        model: 1234
    });

    const destination = Clone.deep(source);
    expect.assertions(4);
    expect(destination).toBeInstanceOf(Widget);
    expect(destination.name).toEqual("Doodad");
    expect(destination.color).toEqual("Blue");
    expect(destination.model).toEqual(1234);
});

test("primitive arrays", () => {
    const source = [1, 2, 3, 4];
    const destination = Clone.deep(source);
    expect.assertions(2);
    expect(Array.isArray(destination)).toBeTruthy();
    expect(destination).toEqual([1, 2, 3, 4]);
});
