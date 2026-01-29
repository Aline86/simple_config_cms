// helpers/changeComponentPosition.ts (ou similaire)

export function reorderArray<T>(
  array: T[],
  dragged: T,
  target: T,
  positionKey: keyof T,
): T[] {
  const draggedIndex = array.indexOf(dragged);
  const targetIndex = array.indexOf(target);

  if (draggedIndex === -1 || targetIndex === -1) return array;

  const newArray = [...array];

  // Retirer l'élément dragué
  newArray.splice(draggedIndex, 1);

  // Calculer le nouvel index
  const insertIndex = draggedIndex < targetIndex ? targetIndex : targetIndex;

  // Insérer à la nouvelle position
  newArray.splice(insertIndex, 0, dragged);

  // ✅ Mettre à jour les positions
  return newArray.map((item, index) => ({
    ...item, // ✅ Spread pour copier toutes les propriétés
    [positionKey]: index,
  }));
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
