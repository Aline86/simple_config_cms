import { MediaObject } from "../database/model/bloc/MediaObject";
import {
  deleteItemAndReorder,
  reorderArray,
} from "../lib/helpers/changeComponentPosition";

jest.mock("nanoid", () => ({ nanoid: jest.fn(() => "generated-id") }));

// ─── Helpers ────────────────────────────────────────────────────────────────

function makeMedia(id: string, position: number, overrides = {}) {
  return new MediaObject({
    id,
    text_titre: `Media ${id}`,
    image_url: `/${id}.jpg`,
    number_position_image: position,
    ...overrides,
  });
}

const ids = (medias: MediaObject[]) => medias.map((m) => m.id);
const positions = (medias: MediaObject[]) =>
  medias.map((m) => m.number_position_image);

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("deleteItemAndReorder", () => {
  it("supprime uniquement le média ciblé (cas nominal)", () => {
    const medias = [makeMedia("a", 0), makeMedia("b", 1), makeMedia("c", 2)];

    const result = deleteItemAndReorder(
      medias,
      medias[1],
      "number_position_image",
    );

    expect(ids(result)).toEqual(["a", "c"]);
  });

  it("supprime uniquement le média ciblé même si deux partagent une position", () => {
    // Deux médias distincts à la position 1 : arrive après un ajout concurrent
    // ou une désynchronisation des positions.
    const medias = [
      makeMedia("a", 0),
      makeMedia("b", 1),
      makeMedia("doublon", 1),
      makeMedia("c", 2),
    ];

    const result = deleteItemAndReorder(
      medias,
      medias[1], // on ne supprime que "b"
      "number_position_image",
    );

    expect(ids(result)).toEqual(["a", "doublon", "c"]);
    expect(result).toHaveLength(3);
  });

  it("ne supprime pas tout quand les positions sont nulles", () => {
    const medias = [
      makeMedia("a", null as unknown as number),
      makeMedia("b", null as unknown as number),
      makeMedia("c", null as unknown as number),
    ];

    const result = deleteItemAndReorder(
      medias,
      medias[0],
      "number_position_image",
    );

    expect(ids(result)).toEqual(["b", "c"]);
  });

  it("réindexe les positions en 0..n-1 après suppression", () => {
    const medias = [
      makeMedia("a", 0),
      makeMedia("b", 1),
      makeMedia("c", 2),
      makeMedia("d", 3),
    ];

    const result = deleteItemAndReorder(
      medias,
      medias[1],
      "number_position_image",
    );

    expect(positions(result)).toEqual([0, 1, 2]);
  });

  it("renvoie un tableau vide quand on supprime le dernier élément", () => {
    const medias = [makeMedia("seul", 0)];

    const result = deleteItemAndReorder(
      medias,
      medias[0],
      "number_position_image",
    );

    expect(result).toEqual([]);
  });

  it("ne mute pas le tableau d'origine", () => {
    const medias = [makeMedia("a", 0), makeMedia("b", 1), makeMedia("c", 2)];

    deleteItemAndReorder(medias, medias[1], "number_position_image");

    expect(ids(medias)).toEqual(["a", "b", "c"]);
    expect(positions(medias)).toEqual([0, 1, 2]);
  });
});

describe("reorderArray", () => {
  let medias: MediaObject[];

  beforeEach(() => {
    medias = [
      makeMedia("a", 0),
      makeMedia("b", 1),
      makeMedia("c", 2),
      makeMedia("d", 3),
    ];
  });

  // CONTRAT : l'élément déplacé prend l'index qu'occupait la cible,
  // que le drag soit ascendant ou descendant.
  // Si vous préférez la convention « toujours inséré AVANT la cible »,
  // changez l'attendu du 1er cas en ["b", "a", "c", "d"] et corrigez
  // insertIndex en `draggedIndex < targetIndex ? targetIndex - 1 : targetIndex`.

  it("place l'élément à l'index de la cible lors d'un drag descendant", () => {
    const result = reorderArray(
      medias,
      medias[0], // on déplace "a"
      medias[2], // sur "c"
      "number_position_image",
    );

    expect(ids(result)).toEqual(["b", "c", "a", "d"]);
    expect(result.indexOf(result.find((m) => m.id === "a")!)).toBe(2);
  });

  it("place l'élément à l'index de la cible lors d'un drag ascendant", () => {
    const result = reorderArray(
      medias,
      medias[3], // on déplace "d"
      medias[1], // sur "b"
      "number_position_image",
    );

    expect(ids(result)).toEqual(["a", "d", "b", "c"]);
    expect(result.indexOf(result.find((m) => m.id === "d")!)).toBe(1);
  });

  it("insère au même endroit que le drag soit ascendant ou descendant", () => {
    // Aller : "a" (index 0) déposé sur "c" (index 2)
    const descendant = reorderArray(
      medias,
      medias[0],
      medias[2],
      "number_position_image",
    );
    const indexApresDescente = descendant.findIndex((m) => m.id === "a");

    // Retour : depuis le résultat précédent, on ramène "a" à sa place initiale
    const cibleRetour = descendant.find((m) => m.id === "b")!;
    const draggedRetour = descendant.find((m) => m.id === "a")!;
    const ascendant = reorderArray(
      descendant,
      draggedRetour,
      cibleRetour,
      "number_position_image",
    );
    const indexApresMontee = ascendant.findIndex((m) => m.id === "a");

    // Dans les deux sens, l'élément atterrit à l'index de sa cible
    expect(indexApresDescente).toBe(2);
    expect(indexApresMontee).toBe(0);
  });

  it("recalcule les positions en 0..n-1", () => {
    const result = reorderArray(
      medias,
      medias[0],
      medias[2],
      "number_position_image",
    );

    expect(positions(result)).toEqual([0, 1, 2, 3]);
  });

  it("renvoie des MediaObject, pas des objets plats", () => {
    const result = reorderArray(
      medias,
      medias[0],
      medias[2],
      "number_position_image",
    );

    result.forEach((m) => expect(m).toBeInstanceOf(MediaObject));
    expect(typeof result[0].toJSON).toBe("function");
  });

  it("renvoie le tableau inchangé si l'élément dragué n'appartient pas au tableau", () => {
    const etranger = makeMedia("etranger", 9);

    const result = reorderArray(
      medias,
      etranger,
      medias[1],
      "number_position_image",
    );

    expect(ids(result)).toEqual(["a", "b", "c", "d"]);
  });

  it("ne mute pas le tableau d'origine", () => {
    reorderArray(medias, medias[0], medias[2], "number_position_image");

    expect(ids(medias)).toEqual(["a", "b", "c", "d"]);
    expect(positions(medias)).toEqual([0, 1, 2, 3]);
  });
});
