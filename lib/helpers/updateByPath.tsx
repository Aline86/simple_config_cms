import { produce } from "immer";

type UpdateResult<T> = {
  updated: boolean;
  data: T;
};

export function updateObjectByPath<T>(
  obj: T,
  path: string,
  value: unknown,
): UpdateResult<T> {
  const keys = path.split(".");
  let updated = false;
  console.log("keys", keys);
  const result = produce(obj, (draft: unknown) => {
    let current = draft;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key] || typeof current[key] !== "object") {
        current[key] = {};
      }
      current = current[key];
    }

    const lastKey = keys[keys.length - 1];
    if (current[lastKey] !== value) {
      current[lastKey] = value;
      updated = true;
    }
  });

  return { updated, data: result };
}
