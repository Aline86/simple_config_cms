"use client";

import { BlocObject } from "../database/model/Bloc";
import { ArticleObject } from "../database/model/bloc/Article";
import { FooterObject } from "../database/model/bloc/Footer";
import { HeaderObject } from "../database/model/bloc/Header";
import { MediaObject } from "../database/model/bloc/MediaObject";
import { PageObject, TypeBloc } from "../database/model/Page";
import { updateObjectByPath } from "../lib/helpers/updateByPath";

jest.mock("nanoid", () => ({ nanoid: jest.fn(() => "test-id-123") }));

// ─── Helpers ────────────────────────────────────────────────────────────────

function expectUpdated<T>(obj: T, path: string, value: unknown) {
  const result = updateObjectByPath(obj, path, value);
  expect(result.updated).toBe(true);
  return result;
}

function expectNotUpdated<T>(obj: T, path: string, value: unknown) {
  const result = updateObjectByPath(obj, path, value);
  expect(result.updated).toBe(false);
  return result;
}

function makeMedia(
  overrides: Partial<ConstructorParameters<typeof MediaObject>[0]> = {},
) {
  return new MediaObject({
    text_titre: "Mon Image",
    color_couleur_bg: "#ffffff",
    text_image_lien: "https://example.fr",
    number_position_image: 0,
    image_url: "/uploads/image.jpg",
    ...overrides,
  });
}

function makeArticle(
  overrides: Partial<ConstructorParameters<typeof ArticleObject>[0]> = {},
) {
  return new ArticleObject({
    number_text_width: 100,
    number_height: 200,
    images: [],
    ...overrides,
  });
}

function makeHeader(overrides = {}) {
  return new HeaderObject(
    {
      number_id: 1,
      text_nom_site: "Mon Super Site",
      text_background_url: "/bg-header.jpg",
      logo: makeMedia({ text_titre: "Logo Principal", image_url: "/logo.png" }),
      favicon: makeMedia({
        text_titre: "Favicon",
        image_url: "/favicon.ico",
        color_couleur_bg: "#000000",
      }),
      reseaux: [
        makeMedia({
          text_titre: "Facebook",
          text_image_lien: "https://facebook.fr/mypage",
          image_url: "/icons/fb.svg",
          number_position_image: 0,
        }),
        makeMedia({
          text_titre: "Twitter",
          text_image_lien: "https://twitter.fr/myhandle",
          image_url: "/icons/twitter.svg",
          number_position_image: 1,
        }),
        makeMedia({
          text_titre: "Instagram",
          text_image_lien: "https://instagram.fr/myprofile",
          image_url: "/icons/insta.svg",
          number_position_image: 2,
        }),
      ],
      ...overrides,
    },
    "edition",
  );
}

function makeFooter(overrides = {}) {
  return new FooterObject(
    {
      number_id: 1,
      text_nom_site_adresse: "Welcome Poitiers",
      text_adresse_footer: "rue des fleurs",
      text_code_postal: "75001",
      color_background_color: "#f5f5f5",
      reseaux: [
        makeMedia({
          text_titre: "LinkedIn",
          text_image_lien: "https://linkedin.fr/company/mysociety",
          image_url: "/icons/linkedin.svg",
          color_couleur_bg: "#0077b5",
        }),
        makeMedia({
          text_titre: "YouTube",
          text_image_lien: "https://youtube.fr/@mychannel",
          image_url: "/icons/youtube.svg",
          color_couleur_bg: "#ff0000",
        }),
      ],
      ...overrides,
    },
    "edition",
  );
}

function makeBloc(overrides = {}) {
  return new BlocObject(
    {
      id: "bloc-1",
      text_nom_bloc: "Bloc Principal",
      text_titre: "Mon Bloc",
      text_description: "Description du bloc",
      color_background_color: "#f5f5f5",
      type: TypeBloc.IMAGE_GROUPE,
      bloc_position: 1,
      langue_bloc: "fr_FR",
      checkbox_is_full_width: false,
      number_width: 75,
      number_height: 75,
      number_gap: 30,
      number_columns: 3,
      image_medias: [
        makeMedia({
          text_titre: "Media 1",
          image_url: "/meditest1.jpg",
          number_position_image: 0,
        }),
        makeMedia({
          text_titre: "Media 2",
          image_url: "/meditest-2.jpg",
          color_couleur_bg: "#000000",
          number_position_image: 1,
        }),
        makeMedia({
          text_titre: "Media 3",
          image_url: "/meditest-3.jpg",
          color_couleur_bg: "#ff0000",
          number_position_image: 2,
        }),
      ],
      articles: [
        makeArticle({
          id: "article-1",
          images: [
            makeMedia({
              text_titre: "Article Image 1",
              image_url: "/article-img1.jpg",
            }),
          ],
        }),
        makeArticle({
          id: "article-2",
          number_text_width: 80,
          number_height: 150,
          images: [
            makeMedia({
              text_titre: "Article Image 2",
              image_url: "/article-img2.jpg",
            }),
          ],
        }),
      ],
      ...overrides,
    },
    "edition",
  );
}

function makePage(overrides = {}) {
  return new PageObject({
    number_id: 1,
    text_titre: "Ma Page Complète",
    text_description: "Description de la page",
    text_slug: "ma-page-complete",
    checkbox_published: true,
    checkbox_home_page: false,
    number_page_position: 1,
    text_langue: "fr_FR",
    blocs: [
      new BlocObject(
        {
          id: "bloc-1",
          text_titre: "Bloc 1",
          type: TypeBloc.IMAGE_GROUPE,
          number_width: 100,
          image_medias: [
            makeMedia({
              text_titre: "Image Bloc 1",
              image_url: "/bloc1-img.jpg",
            }),
          ],
          articles: [],
        },
        "edition",
      ),
      new BlocObject(
        {
          id: "bloc-2",
          text_titre: "Bloc 2",
          type: TypeBloc.TEXTE,
          number_width: 80,
          image_medias: [
            makeMedia({
              text_titre: "Image Bloc 2-1",
              image_url: "/bloc2-img1.jpg",
            }),
            makeMedia({
              text_titre: "Image Bloc 2-2",
              image_url: "/bloc2-img2.jpg",
            }),
          ],
          articles: [
            makeArticle({
              id: "article-bloc2",
              images: [
                makeMedia({
                  text_titre: "Article Image Bloc 2",
                  image_url: "/bloc2-article-img.jpg",
                }),
              ],
            }),
          ],
        },
        "edition",
      ),
      new BlocObject(
        {
          id: "bloc-3",
          text_titre: "Bloc 3",
          type: TypeBloc.CAROUSEL,
          number_width: 90,
          image_medias: [],
          articles: [
            makeArticle({
              id: "article-1-bloc3",
              images: [
                makeMedia({ text_titre: "Img 1", image_url: "/img1.jpg" }),
                makeMedia({ text_titre: "Img 2", image_url: "/img2.jpg" }),
              ],
            }),
            makeArticle({
              id: "article-2-bloc3",
              number_text_width: 80,
              images: [
                makeMedia({ text_titre: "Img 3", image_url: "/img3.jpg" }),
              ],
            }),
          ],
        },
        "edition",
      ),
    ],
    ...overrides,
  });
}

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("updateObjectByPath", () => {
  describe("Security checks", () => {
    const obj = { name: "Johnny" };

    it.each([
      ["__proto__", "__proto__.polluted"],
      ["constructor", "constructor.polluted"],
      ["prototype", "prototype.polluted"],
    ])("should throw for %s in path", (_, path) => {
      expect(() => updateObjectByPath(obj, path, "value")).toThrow(
        "Unsafe path detected",
      );
    });
  });

  describe("MediaObject", () => {
    let media: MediaObject;
    beforeEach(() => {
      media = makeMedia({
        id: "media-123",
        text_bloc_id: "bloc-456",
        text_titre: "Mon Image",
        number_position_image: 5,
      });
    });

    it.each([
      ["text_titre", "Titre Modifié", "text_titre", "Mon Image"],
      ["color_couleur_bg", "#000000", "color_couleur_bg", "#ffffff"],
      [
        "text_image_lien",
        "https://welcomepoitiers.fr",
        "text_image_lien",
        "https://example.fr",
      ],
      ["number_position_image", 10, "number_position_image", 5],
      ["image_url", "/new/path/image.png", "image_url", "/uploads/image.jpg"],
    ] as const)("should update %s", (path, newVal, key, originalVal) => {
      const result = expectUpdated(media, path, newVal);
      expect(result.data[key]).toBe(newVal);
      expect(media[key]).toBe(originalVal);
    });

    it("should not update when value is identical", () => {
      expectNotUpdated(media, "text_titre", "Mon Image");
    });
  });

  describe("ArticleObject", () => {
    let article: ArticleObject;
    beforeEach(() => {
      article = makeArticle({
        id: "article-1",
        text_bloc_id: "bloc-1",
        number_text_margins: 30,
        text_images_position: "top",
        images: [
          makeMedia({
            text_titre: "Image 1",
            image_url: "/images/img1.jpg",
            number_position_image: 0,
          }),
          makeMedia({
            text_titre: "Image 2",
            color_couleur_bg: "#000000",
            image_url: "/images/img2.jpg",
            text_image_lien: "https://example.fr/2",
            number_position_image: 1,
          }),
          makeMedia({
            text_titre: "Image 3",
            color_couleur_bg: "#ff0000",
            image_url: "/images/img3.jpg",
            text_image_lien: "https://example.fr/3",
            number_position_image: 2,
          }),
        ],
      });
    });

    const cases: [string, unknown][] = [
      ["images.0.text_titre", "Updated Image 1"],
      ["images.1.color_couleur_bg", "#00ff00"],
      ["images.2.image_url", "/new/path/img3.jpg"],
      ["images.0.text_image_lien", "https://welcomepoitiers.fr"],
      ["images.1.number_position_image", 10],
    ];

    it.each(cases)("should update %s", (path, newVal) => {
      const result = expectUpdated(article, path, newVal);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const got = path
        .split(".")
        .reduce((o: any, k) => (isNaN(+k) ? o[k] : o[+k]), result.data);
      expect(got).toBe(newVal);
    });

    it("should not update if value is same", () => {
      expectNotUpdated(article, "images.0.text_titre", "Image 1");
    });

    it("should update article properties while preserving images", () => {
      const result = expectUpdated(article, "number_text_width", 80);
      expect(result.data.number_text_width).toBe(80);
      expect(result.data.images.length).toBe(3);
    });

    it("should update text_article JSONContent", () => {
      const newContent = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Hello world" }],
          },
        ],
      };
      const result = expectUpdated(article, "text_article", newContent);
      expect(result.data.text_article).toEqual(newContent);
    });
  });

  describe("HeaderObject", () => {
    let header: HeaderObject;
    beforeEach(() => {
      header = makeHeader();
    });

    it.each([
      ["logo.image_url", "/new-logo.png", "logo.image_url", "/logo.png"],
      ["logo.text_titre", "Nouveau Logo", "logo.text_titre", "Logo Principal"],
      ["logo.color_couleur_bg", "#ff0000", "logo.color_couleur_bg", "#ffffff"],
      [
        "favicon.image_url",
        "/new-favicon.ico",
        "favicon.image_url",
        "/favicon.ico",
      ],
      [
        "reseaux.0.text_image_lien",
        "https://facebook.fr/newpage",
        "reseaux.0.text_image_lien",
        "https://facebook.fr/mypage",
      ],
      [
        "reseaux.1.image_url",
        "/icons/x.svg",
        "reseaux.1.image_url",
        "/icons/twitter.svg",
      ],
      ["reseaux.2.text_titre", "IG", "reseaux.2.text_titre", "Instagram"],
      [
        "text_background_url",
        "/new-bg.jpg",
        "text_background_url",
        "/bg-header.jpg",
      ],
    ] as const)("should update %s", (path, newVal, checkPath, originalVal) => {
      const result = expectUpdated(header, path, newVal);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const got = checkPath
        .split(".")
        .reduce((o: any, k) => (isNaN(+k) ? o[k] : o[+k]), result.data);
      expect(got).toBe(newVal);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const original = checkPath
        .split(".")
        .reduce((o: any, k) => (isNaN(+k) ? o[k] : o[+k]), header);
      expect(original).toBe(originalVal);
    });

    it("should update site name while preserving nested objects", () => {
      const result = expectUpdated(header, "text_nom_site", "Nouveau Nom");
      expect(result.data.logo?.image_url).toBe("/logo.png");
      expect(result.data.reseaux.length).toBe(3);
    });
  });

  describe("FooterObject", () => {
    let footer: FooterObject;
    beforeEach(() => {
      footer = makeFooter();
    });

    it.each([
      ["text_adresse_footer", "456 Avenue des Champs", "rue des fleurs"],
      ["text_code_postal", "75008", "75001"],
      ["color_background_color", "#333333", "#f5f5f5"],
      [
        "reseaux.0.text_image_lien",
        "https://linkedin.fr/company/new",
        "https://linkedin.fr/company/mysociety",
      ],
      ["reseaux.1.color_couleur_bg", "#cc0000", "#ff0000"],
    ] as const)("should update %s", (path, newVal, originalVal) => {
      const result = expectUpdated(footer, path, newVal);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const got = path
        .split(".")
        .reduce((o: any, k) => (isNaN(+k) ? o[k] : o[+k]), result.data);
      expect(got).toBe(newVal);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const original = path
        .split(".")
        .reduce((o: any, k) => (isNaN(+k) ? o[k] : o[+k]), footer);
      expect(original).toBe(originalVal);
    });

    it("should update company name while preserving reseaux", () => {
      const result = expectUpdated(
        footer,
        "text_nom_site_adresse",
        "Nouvelle Société",
      );
      expect(result.data.reseaux.length).toBe(2);
      expect(result.data.reseaux[0].text_titre).toBe("LinkedIn");
    });
  });

  describe("PageObject", () => {
    let page: PageObject;
    beforeEach(() => {
      page = new PageObject({
        number_id: 1,
        text_titre: "Ma Page",
        text_description: "Description de la page",
        text_slug: "ma-page",
        checkbox_published: true,
        checkbox_home_page: false,
        number_page_position: 1,
        text_langue: "fr_FR",
        blocs: [],
      });
    });

    it.each([
      ["text_titre", "Nouveau Titre", "Ma Page"],
      ["checkbox_published", false, true],
      ["text_slug", "nouveau-slug", "ma-page"],
      ["number_page_position", 5, 1],
      ["text_langue", "en_US", "fr_FR"],
      ["checkbox_home_page", true, false],
      ["text_description", "Nouvelle description", "Description de la page"],
    ] as const)("should update %s", (path, newVal, originalVal) => {
      const result = expectUpdated(page, path, newVal);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.data as any)[path]).toBe(newVal);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((page as any)[path]).toBe(originalVal);
    });
  });

  describe("BlocObject", () => {
    let bloc: BlocObject;
    beforeEach(() => {
      bloc = makeBloc();
    });

    it.each([
      ["text_titre", "Nouveau Titre Bloc", "Mon Bloc"],
      ["text_description", "Nouvelle description", "Description du bloc"],
      ["color_background_color", "#333333", "#f5f5f5"],
      ["number_width", 100, 75],
      ["number_height", 50, 75],
      ["number_gap", 20, 30],
      ["number_columns", 4, 3],
      ["checkbox_is_full_width", true, false],
      ["bloc_position", 5, 1],
    ] as const)("should update %s", (path, newVal, originalVal) => {
      const result = expectUpdated(bloc, path, newVal);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.data as any)[path]).toBe(newVal);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((bloc as any)[path]).toBe(originalVal);
    });

    it.each([
      ["image_medias.0.text_titre", "Updated Media 1"],
      ["image_medias.1.image_url", "/new-meditest-2.jpg"],
      ["image_medias.2.color_couleur_bg", "#00ff00"],
      ["image_medias.0.number_position_image", 10],
      ["articles.0.number_text_width", 90],
      ["articles.1.number_height", 200],
      ["articles.0.images.0.text_titre", "Updated Article Image"],
      ["articles.1.images.0.image_url", "/new-article-img.jpg"],
    ] as const)("should update nested %s", (path, newVal) => {
      const result = expectUpdated(bloc, path, newVal as never);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const getVal = (obj: any) =>
        path.split(".").reduce((o, k) => (isNaN(+k) ? o[k] : o[+k]), obj);
      expect(getVal(result.data)).toBe(newVal);
    });

    it("should preserve all properties when updating nested media", () => {
      const result = expectUpdated(
        bloc,
        "image_medias.1.text_titre",
        "Changed",
      );
      expect(result.data.text_titre).toBe("Mon Bloc");
      expect(result.data.number_width).toBe(75);
      expect(result.data.image_medias.length).toBe(3);
      expect(result.data.articles.length).toBe(2);
    });
  });

  describe("PageObject avec BlocObjects imbriqués", () => {
    let page: PageObject;
    beforeEach(() => {
      page = makePage();
    });

    it.each([
      ["blocs.0.text_titre", "Nouveau Titre Bloc 1", "Bloc 1"],
      ["blocs.1.number_width", 100, 80],
      ["blocs.0.image_medias.0.text_titre", "Updated Image", "Image Bloc 1"],
      [
        "blocs.1.image_medias.1.image_url",
        "/new-bloc2-img2.jpg",
        "/bloc2-img2.jpg",
      ],
      ["blocs.1.articles.0.number_text_width", 90, 100],
      [
        "blocs.1.articles.0.images.0.text_titre",
        "Super Updated",
        "Article Image Bloc 2",
      ],
      ["blocs.2.articles.0.images.0.text_titre", "Modified Img 1", "Img 1"],
      [
        "blocs.2.articles.0.images.1.image_url",
        "/modified-img2.jpg",
        "/img2.jpg",
      ],
      ["blocs.2.articles.1.images.0.text_titre", "Modified Img 3", "Img 3"],
    ] as const)("should update %s", (path, newVal, originalVal) => {
      const result = expectUpdated(page, path, newVal);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const getVal = (obj: any) =>
        path.split(".").reduce((o, k) => (isNaN(+k) ? o[k] : o[+k]), obj);
      expect(getVal(result.data)).toBe(newVal);
      expect(getVal(page)).toBe(originalVal);
    });

    it("should update page title and preserve all blocs", () => {
      const result = expectUpdated(page, "text_titre", "Nouveau Titre Page");
      expect(result.data.blocs.length).toBe(3);
      expect(result.data.blocs.map((b: BlocObject) => b.text_titre)).toEqual([
        "Bloc 1",
        "Bloc 2",
        "Bloc 3",
      ]);
    });

    it("should preserve entire structure on deep update", () => {
      const result = expectUpdated(
        page,
        "blocs.2.articles.0.images.1.text_titre",
        "Deep Update",
      );
      expect(result.data.blocs.length).toBe(3);
      expect(result.data.blocs[0].image_medias.length).toBe(1);
      expect(result.data.blocs[1].image_medias.length).toBe(2);
      expect(result.data.blocs[2].articles[0].images[1].text_titre).toBe(
        "Deep Update",
      );
      expect(result.data.blocs[2].articles[0].images[0].text_titre).toBe(
        "Img 1",
      );
    });

    it("should handle multiple levels without side effects", () => {
      const result = expectUpdated(
        page,
        "blocs.1.articles.0.images.0.image_url",
        "/ultimate-update.jpg",
      );
      expect(result.data.blocs[0].text_titre).toBe("Bloc 1");
      expect(result.data.blocs[1].image_medias[0].text_titre).toBe(
        "Image Bloc 2-1",
      );
      expect(result.data.blocs[1].articles[0].images[0].image_url).toBe(
        "/ultimate-update.jpg",
      );
      expect(page.blocs[1].articles[0].images[0].image_url).toBe(
        "/bloc2-article-img.jpg",
      );
    });
  });

  describe("Edge cases", () => {
    it.each([
      ["null value", "text_titre", null, null],
      ["empty string", "text_titre", "", ""],
      ["zero", "number_text_width", 0, 0],
      ["boolean false", "checkbox_published", false, false],
    ] as const)("should handle %s", (_, path, value, expected) => {
      const obj =
        path === "checkbox_published"
          ? new PageObject({ checkbox_published: true })
          : path === "number_text_width"
            ? makeArticle({ number_text_width: 100 })
            : makeMedia({ text_titre: "Test" });
      const result = updateObjectByPath(obj, path, value);
      expect(result.updated).toBe(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.data as any)[path]).toBe(expected);
    });
  });

  describe("Cas complexes", () => {
    it("should handle bloc with multiple articles with multiple images", () => {
      const bloc = new BlocObject(
        {
          text_titre: "Complex Bloc",
          articles: [
            makeArticle({
              id: "art1",
              images: [
                makeMedia({ text_titre: "test1-1" }),
                makeMedia({ text_titre: "test1-2" }),
                makeMedia({ text_titre: "test1-3" }),
              ],
            }),
            makeArticle({
              id: "art2",
              images: [
                makeMedia({ text_titre: "test-2-1" }),
                makeMedia({ text_titre: "test-2-2" }),
              ],
            }),
            makeArticle({
              id: "art3",
              images: [makeMedia({ text_titre: "test-3-1" })],
            }),
          ],
        },
        "edition",
      );

      const result = expectUpdated(
        bloc,
        "articles.1.images.1.text_titre",
        "Updated test 2",
      );
      expect(result.data.articles[1].images[1].text_titre).toBe(
        "Updated test 2",
      );
      expect(
        result.data.articles.map((a: ArticleObject) => a.images.length),
      ).toEqual([3, 2, 1]);
    });

    it("should handle bloc with both medias and articles, chained updates", () => {
      const bloc = new BlocObject(
        {
          text_titre: "Mixed Bloc",
          image_medias: [
            makeMedia({ text_titre: "MediaObject 1" }),
            makeMedia({ text_titre: "test 2" }),
          ],
          articles: [
            makeArticle({
              id: "art1",
              images: [makeMedia({ text_titre: "test 1" })],
            }),
          ],
        },
        "edition",
      );

      const r1 = expectUpdated(
        bloc,
        "image_medias.0.text_titre",
        "Updated test 1",
      );
      expect(r1.data.articles[0].images[0].text_titre).toBe("test 1");

      const r2 = expectUpdated(
        r1.data,
        "articles.0.images.0.text_titre",
        "Updated test 2",
      );
      expect(r2.data.articles[0].images[0].text_titre).toBe("Updated test 2");
      expect(r2.data.image_medias[0].text_titre).toBe("Updated test 1");
    });
  });
});
