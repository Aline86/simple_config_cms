import { produce } from "immer";

type UpdateResult<T> = {
  updated: boolean;
  data: T;
};

const UNSAFE_KEYS = ["__proto__", "constructor", "prototype"];

export function updateObjectByPath<T>(
  obj: T,
  path: string,
  value: unknown,
): UpdateResult<T> {
  const keys = path.split(".");

  // Validation simple
  if (keys.some((key) => UNSAFE_KEYS.includes(key))) {
    throw new Error("Unsafe path detected");
  }

  let updated = false;

  const result = produce(obj, (draft: any) => {
    let current = draft;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]] || typeof current[keys[i]] !== "object") {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    const lastKey = keys[keys.length - 1];
    if (current[lastKey] !== value) {
      current[lastKey] = value;
      updated = true;
    }
  });

  return { updated, data: result };
}
