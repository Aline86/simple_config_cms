export function reorderArray<T extends Record<string, any>>(
  array: T[],
  dragged: T,
  target: T,
): T[] {
  const fromIndex = array.findIndex((item) => item === dragged);
  const toIndex = array.findIndex((item) => item === target);

  if (fromIndex === -1 || toIndex === -1) return array;

  const copy = [...array];
  const [moved] = copy.splice(fromIndex, 1);
  copy.splice(toIndex, 0, moved);

  return copy.map((item, index) => {
    return { ...item, [index]: index + 1 };
  });
}
export function deleteItemAndReorder<T extends Record<string, any>>(
  prev: T[],
  itemToDelete: T,
  idKey: keyof T,
): T[] {
  // Supprimer l'élément ciblé
  const filtered = prev.filter((p) => p[idKey] !== itemToDelete[idKey]);

  // Réordonner les positions de manière consécutive en créant de nouveaux objets
  const reordered = filtered
    .sort((a, b) => (a[idKey] ?? 0) - (b[idKey] ?? 0))
    .map((item, index) => ({
      ...item,
      [idKey]: index + 1, // mise à jour dynamique de la clé
    }));

  return reordered;
}
