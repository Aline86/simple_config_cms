import { produce } from "immer";

type UpdateResult<T> = {
  updated: boolean;
  data: T;
};
export function updateObjectBySetter<T>(
  obj: T,
  path: string,
  value: unknown,
): UpdateResult<T> {
  const keys = path.split(".");
  let updated = false;

  const result = produce(obj, (draft: any) => {
    let current = draft;

    for (let i = 0; i < keys.length - 1; i++) {
      if (current == null) return;

      current = current[keys[i]];
    }

    const lastKey = keys[keys.length - 1];

    if (current?.[lastKey] !== value) {
      current[lastKey] = value;
      updated = true;
    }
  });

  return {
    updated,
    data: updated ? result : obj,
  };
}
