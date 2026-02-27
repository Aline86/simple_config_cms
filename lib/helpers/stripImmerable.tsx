import { immerable } from "immer";

export function stripImmerable<T extends object>(
  obj: T,
): Omit<T, typeof immerable> {
  const { [immerable]: _, ...rest } = obj as any;
  return rest as Omit<T, typeof immerable>;
}
