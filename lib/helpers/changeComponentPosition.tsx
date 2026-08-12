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

  newArray.splice(draggedIndex, 1);

  const insertIndex = draggedIndex < targetIndex ? targetIndex : targetIndex;

  newArray.splice(insertIndex, 0, dragged);

  return newArray.map((item, index) => ({
    ...item,
    [positionKey]: index,
  }));
}

export function deleteItemAndReorder(
  prev: MediaObject[],
  itemToDelete: MediaObject,
  idKey: string,
): MediaObject[] {
  const filtered = prev.filter((p) => p[idKey] !== itemToDelete[idKey]);
  if (filtered.length > 0) {
    const reordered = filtered
      .sort((a, b) => a[idKey] - b[idKey])
      .map((item, index) => {
        const media = new MediaObject(item);
        media[idKey] = index;
        return media;
      });
    return reordered;
  }

  const reordered = filtered.map((item, index) => {
    const media = new MediaObject(item);
    media[idKey] = index;
    return media;
  });
  return reordered;
  
}
