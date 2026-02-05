// helpers/changeComponentPosition.ts (ou similaire)

import { MediaObject } from "../../database/model/bloc/MediaObject";

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

  //  Mettre à jour les positions
  return newArray.map((item, index) => ({
    ...item, //  Spread pour copier toutes les propriétés
    [positionKey]: index,
  }));
}

export function deleteItemAndReorder(
  prev: MediaObject[],
  itemToDelete: MediaObject,
  idKey: "number_position_image",
): MediaObject[] {
  const filtered = prev.filter((p) => p[idKey] !== itemToDelete[idKey]);

  const reordered = filtered
    .sort((a, b) => a[idKey] - b[idKey])
    .map((item, index) => {
      const media = new MediaObject(item);
      media[idKey] = index + 1;
      return media;
    });

  return reordered;
}
