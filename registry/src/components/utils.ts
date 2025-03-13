/**
 * Recursively merges two objects, preserving the original values unless overridden.
 *
 * - If a property in `source` is an object, it will be deeply merged into `target`.
 * - Otherwise, the value from `source` will overwrite the corresponding value in `target`.
 *
 * @template T The type of `target`, which must be an object.
 * @param {T} target The base object to be merged into.
 * @param {Partial<T>} source The object containing override values (can have missing properties).
 * @returns {T} A new merged object, leaving the original `target` unchanged.
 *
 * @memberof Utils
 */
export function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  if (!source) return target;

  return Object.keys(source).reduce(
    (acc, key) => {
      const targetValue = (target as any)[key];
      const sourceValue = (source as any)[key];

      if (
        typeof targetValue === 'object' &&
        targetValue !== null &&
        typeof sourceValue === 'object' &&
        sourceValue !== null
      ) {
        (acc as any)[key] = deepMerge(targetValue, sourceValue);
      } else {
        (acc as any)[key] = sourceValue;
      }

      return acc;
    },
    { ...target }
  );
}

/**
 * Deeply clones an object, preserving special types like Date, Map, and Set.
 *
 * - Supports deep cloning of objects, arrays, primitives, Date, Map, and Set.
 * - Handles circular references by tracking visited objects.
 * - Does not clone functions, class instances, or prototype chains.
 *
 * @template T The type of the object to be cloned.
 * @param {T} obj The object to be deeply cloned.
 * @param {WeakMap<object, any>} [seen=new WeakMap()] A map to track circular references.
 * @returns {T} A new object that is a deep copy of the original.
 *
 * @memberof Utils
 */
export function deepCloneObject<T>(obj: T, seen = new WeakMap<object, any>()): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Handle circular references
  if (seen.has(obj as object)) {
    return seen.get(obj as object);
  }

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj) as T;
  }

  // Handle Map
  if (obj instanceof Map) {
    const mapCopy = new Map();
    seen.set(obj, mapCopy);
    obj.forEach((value, key) => {
      mapCopy.set(deepCloneObject(key, seen), deepCloneObject(value, seen));
    });
    return mapCopy as T;
  }

  // Handle Set
  if (obj instanceof Set) {
    const setCopy = new Set();
    seen.set(obj, setCopy);
    obj.forEach((value) => {
      setCopy.add(deepCloneObject(value, seen));
    });
    return setCopy as T;
  }

  // Handle Array
  if (Array.isArray(obj)) {
    const arrayCopy: any[] = [];
    seen.set(obj, arrayCopy);
    obj.forEach((item, index) => {
      arrayCopy[index] = deepCloneObject(item, seen);
    });
    return arrayCopy as T;
  }

  // Handle Object
  const objCopy = Object.create(Object.getPrototypeOf(obj));
  seen.set(obj, objCopy);
  Object.keys(obj).forEach((key) => {
    (objCopy as any)[key] = deepCloneObject((obj as any)[key], seen);
  });

  return objCopy as T;
}
