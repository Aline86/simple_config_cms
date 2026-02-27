import { BlocObject } from "../../database/model/Bloc";
import { PageObject } from "../../database/model/Page";
import { stripImmerable } from "./stripImmerable";

export function clonePageWithBlocs(
  page: PageObject,
  updatedBlocs: BlocObject[],
) {
  const { blocs: _, mode, ...rest } = stripImmerable(page);
  return new PageObject({ ...rest, blocs: updatedBlocs }, mode);
}
