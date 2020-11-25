export abstract class Clone {
    private static knownTypes: Record<string, Function> = {
        "[object Date]": Clone.date,
        "[object RegExp]": Clone.regExp,
        "[object ArrayBuffer]": Clone.arrayBuffer
    }

    static deep<T>(source: T): T {
        // Check for null
        if (source === null) {
            return source;
        }

        // Handle known types
        const sourceType = Object.prototype.toString.call(source);
        if (Clone.knownTypes[sourceType]) {
            return Clone.knownTypes[sourceType](source);
        }

        // Handle arrays
        if (Array.isArray(source)) {
            return Clone.array(source as any[]) as any as T;
        }

        // Handle objects
        if (typeof source === "object") {
            // No need to check for null as we do it above
            const constructor: any = (source as any).constructor;
            const destination = new constructor();

            for (const key of Object.keys(source)) {
                destination[key] = Clone.deep((source as any)[key]);
            }

            return destination;
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

    private static regExp(targetRegexp: RegExp): RegExp {
        const result = new RegExp(targetRegexp.source, targetRegexp.flags);
        result.lastIndex = targetRegexp.lastIndex;
        return result;
    }

    private static arrayBuffer(arrayBuffer: ArrayBuffer): ArrayBuffer {
        const destination = new ArrayBuffer(arrayBuffer.byteLength);
        new Uint8Array(destination).set(new Uint8Array(arrayBuffer));
        return destination;
    }
}
