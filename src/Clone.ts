export abstract class Clone {
    private static knownTypes: Record<string, Function> = {
        "[object Date]": Clone.date,
        "[object RegExp]": Clone.regExp,
        "[object ArrayBuffer]": Clone.arrayBuffer
    }

    static deep<T>(source: T): T {
        // Handle known types
        const sourceType = Object.prototype.toString.call(source);
        if (Clone.knownTypes[sourceType]) {
            return Clone.knownTypes[sourceType](source) as T;
        }

        // Handle arrays
        if (Array.isArray(source)) {
            return Clone.array(source as any[]) as any as T;
        }

        // Handle objects
        if (typeof source === "object" && source !== null) {
            const constructor: any = (source as any).constructor;
            const destination = new constructor();

            for (const key of Object.keys(source)) {
                destination[key] = Clone.deep((source as any)[key]);
            }

            return destination as T;
        }

        // Handle primitives
        return source;
    }

    private static array<T>(source: T[]): T[] {
        const destination: T[] = [];
        for (const element of source) {
            destination.push(Clone.deep(element));
        }

        return destination;
    }

    private static date(source: Date): Date {
        return new Date(source.getTime());
    }

    private static regExp(source: RegExp): RegExp {
        const destination = new RegExp(source.source, source.flags);
        destination.lastIndex = source.lastIndex;
        return destination;
    }

    private static arrayBuffer(source: ArrayBuffer): ArrayBuffer {
        const destination = new ArrayBuffer(source.byteLength);
        new Uint8Array(destination).set(new Uint8Array(source));
        return destination;
    }
}
