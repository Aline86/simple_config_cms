import { BlocObject } from "../database/model/Bloc";
import { ArticleObject } from "../database/model/bloc/Article";
import { FooterObject } from "../database/model/bloc/Footer";
import { HeaderObject } from "../database/model/bloc/Header";
import { MediaObject } from "../database/model/bloc/MediaObject";
import { PageObject, TypeBloc } from "../database/model/Page";
import { updateObjectByPath } from "../lib/helpers/updateByPath";

jest.mock("nanoid", () => ({
  nanoid: jest.fn(() => "test-id-123"),
}));

describe("updateObjectByPath - Security checks", () => {
  describe("Security checks", () => {
    it("should throw error for __proto__ in path", () => {
      const obj = { name: "Johnny" };
      expect(() => {
        updateObjectByPath(obj, "__proto__.polluted", "value");
      }).toThrow("Unsafe path detected");
    });

    it("should throw error for constructor in path", () => {
      const obj = { name: "Johnny" };
      expect(() => {
        updateObjectByPath(obj, "constructor.polluted", "value");
      }).toThrow("Unsafe path detected");
    });

    it("should throw error for prototype in path", () => {
      const obj = { name: "Johnny" };
      expect(() => {
        updateObjectByPath(obj, "prototype.polluted", "value");
      }).toThrow("Unsafe path detected");
    });
  });

  describe("ArticleObject - Testing nested Objects", () => {
    let article: ArticleObject;

    beforeEach(() => {
      article = new ArticleObject({
        id: "article-1",
        text_bloc_id: "bloc-1",
        number_text_width: 100,
        number_height: 200,
        number_text_margins: 30,
        text_images_position: "top",
        images: [
          new MediaObject({
            text_titre: "Image 1",
            color_couleur_bg: "#ffffff",
            text_image_lien: "https://example.fr/1",
            number_position_image: 0,
            image_url: "/images/img1.jpg",
          }),
          new MediaObject({
            text_titre: "Image 2",
            color_couleur_bg: "#000000",
            text_image_lien: "https://example.fr/2",
            number_position_image: 1,
            image_url: "/images/img2.jpg",
          }),
          new MediaObject({
            text_titre: "Image 3",
            color_couleur_bg: "#ff0000",
            text_image_lien: "https://example.fr/3",
            number_position_image: 2,
            image_url: "/images/img3.jpg",
          }),
        ],
      });
    });

    it("should update first image title in images array", () => {
      const result = updateObjectByPath(
        article,
        "images.0.text_titre",
        "Updated Image 1",
      );

      expect(result.updated).toBe(true);
      expect(result.data.images[0].text_titre).toBe("Updated Image 1");
      expect(result.data.images[1].text_titre).toBe("Image 2");
      expect(result.data.images[2].text_titre).toBe("Image 3");
      // Vérifier l'immutabilité
      expect(article.images[0].text_titre).toBe("Image 1");
    });

    it("should update second image background color", () => {
      const result = updateObjectByPath(
        article,
        "images.1.color_couleur_bg",
        "#00ff00",
      );

      expect(result.updated).toBe(true);
      expect(result.data.images[1].color_couleur_bg).toBe("#00ff00");
      expect(result.data.images[0].color_couleur_bg).toBe("#ffffff");
      expect(article.images[1].color_couleur_bg).toBe("#000000");
    });

    it("should update third image URL", () => {
      const result = updateObjectByPath(
        article,
        "images.2.image_url",
        "/new/path/img3.jpg",
      );

      expect(result.updated).toBe(true);
      expect(result.data.images[2].image_url).toBe("/new/path/img3.jpg");
      expect(article.images[2].image_url).toBe("/images/img3.jpg");
    });

    it("should update nested image link", () => {
      const result = updateObjectByPath(
        article,
        "images.0.text_image_lien",
        "https://welcomepoitiers.fr",
      );

      expect(result.updated).toBe(true);
      expect(result.data.images[0].text_image_lien).toBe(
        "https://welcomepoitiers.fr",
      );
    });

    it("should update image position in array", () => {
      const result = updateObjectByPath(
        article,
        "images.1.number_position_image",
        10,
      );

      expect(result.updated).toBe(true);
      expect(result.data.images[1].number_position_image).toBe(10);
    });

    it("should not update if value is same", () => {
      const result = updateObjectByPath(
        article,
        "images.0.text_titre",
        "Image 1",
      );

      expect(result.updated).toBe(false);
      expect(result.data.images[0].text_titre).toBe("Image 1");
    });

    it("should update article properties while preserving images", () => {
      const result = updateObjectByPath(article, "number_text_width", 80);

      expect(result.updated).toBe(true);
      expect(result.data.number_text_width).toBe(80);
      expect(result.data.images.length).toBe(3);
      expect(result.data.images[0].text_titre).toBe("Image 1");
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
      const result = updateObjectByPath(article, "text_article", newContent);

      expect(result.updated).toBe(true);
      expect(result.data.text_article).toEqual(newContent);
    });
  });

  describe("HeaderObject - Testing logo, favicon and networks", () => {
    let header: HeaderObject;

    beforeEach(() => {
      header = new HeaderObject(
        {
          number_id: 1,
          text_nom_site: "Mon Super Site",
          text_background_url: "/bg-header.jpg",
          logo: new MediaObject({
            text_titre: "Logo Principal",
            image_url: "/logo.png",
            color_couleur_bg: "#ffffff",
          }),
          favicon: new MediaObject({
            text_titre: "Favicon",
            image_url: "/favicon.ico",
            color_couleur_bg: "#000000",
          }),
          reseaux: [
            new MediaObject({
              text_titre: "Facebook",
              text_image_lien: "https://facebook.fr/mypage",
              image_url: "/icons/fb.svg",
              number_position_image: 0,
            }),
            new MediaObject({
              text_titre: "Twitter",
              text_image_lien: "https://twitter.fr/myhandle",
              image_url: "/icons/twitter.svg",
              number_position_image: 1,
            }),
            new MediaObject({
              text_titre: "Instagram",
              text_image_lien: "https://instagram.fr/myprofile",
              image_url: "/icons/insta.svg",
              number_position_image: 2,
            }),
          ],
        },
        "edition",
      );
    });

    it("should update logo image URL", () => {
      const result = updateObjectByPath(
        header,
        "logo.image_url",
        "/new-logo.png",
      );

      expect(result.updated).toBe(true);
      expect(result.data.logo?.image_url).toBe("/new-logo.png");
      expect(header.logo?.image_url).toBe("/logo.png");
    });

    it("should update logo title", () => {
      const result = updateObjectByPath(
        header,
        "logo.text_titre",
        "Nouveau Logo",
      );

      expect(result.updated).toBe(true);
      expect(result.data.logo?.text_titre).toBe("Nouveau Logo");
    });

    it("should update logo background color", () => {
      const result = updateObjectByPath(
        header,
        "logo.color_couleur_bg",
        "#ff0000",
      );

      expect(result.updated).toBe(true);
      expect(result.data.logo?.color_couleur_bg).toBe("#ff0000");
    });

    it("should update favicon URL", () => {
      const result = updateObjectByPath(
        header,
        "favicon.image_url",
        "/new-favicon.ico",
      );

      expect(result.updated).toBe(true);
      expect(result.data.favicon?.image_url).toBe("/new-favicon.ico");
      expect(header.favicon?.image_url).toBe("/favicon.ico");
    });

    it("should update first social network link", () => {
      const result = updateObjectByPath(
        header,
        "reseaux.0.text_image_lien",
        "https://facebook.fr/newpage",
      );

      expect(result.updated).toBe(true);
      expect(result.data.reseaux[0].text_image_lien).toBe(
        "https://facebook.fr/newpage",
      );
      expect(header.reseaux[0].text_image_lien).toBe(
        "https://facebook.fr/mypage",
      );
    });

    it("should update second social network icon", () => {
      const result = updateObjectByPath(
        header,
        "reseaux.1.image_url",
        "/icons/x.svg",
      );

      expect(result.updated).toBe(true);
      expect(result.data.reseaux[1].image_url).toBe("/icons/x.svg");
      expect(result.data.reseaux[1].text_titre).toBe("Twitter");
    });

    it("should update third social network title", () => {
      const result = updateObjectByPath(header, "reseaux.2.text_titre", "IG");

      expect(result.updated).toBe(true);
      expect(result.data.reseaux[2].text_titre).toBe("IG");
    });

    it("should update site name while preserving nested objects", () => {
      const result = updateObjectByPath(header, "text_nom_site", "Nouveau Nom");

      expect(result.updated).toBe(true);
      expect(result.data.text_nom_site).toBe("Nouveau Nom");
      expect(result.data.logo?.image_url).toBe("/logo.png");
      expect(result.data.reseaux.length).toBe(3);
    });

    it("should update background URL", () => {
      const result = updateObjectByPath(
        header,
        "text_background_url",
        "/new-bg.jpg",
      );

      expect(result.updated).toBe(true);
      expect(result.data.text_background_url).toBe("/new-bg.jpg");
    });
  });

  describe("FooterObject - Tests profonds avec réseaux sociaux", () => {
    let footer: FooterObject;

    beforeEach(() => {
      footer = new FooterObject(
        {
          number_id: 1,
          text_nom_site_adresse: "Welcome Poitiers",
          text_adresse_footer: "rue des fleurs",
          text_code_postal: "75001",
          color_background_color: "#f5f5f5",
          reseaux: [
            new MediaObject({
              text_titre: "LinkedIn",
              text_image_lien: "https://linkedin.fr/company/mysociety",
              image_url: "/icons/linkedin.svg",
              color_couleur_bg: "#0077b5",
            }),
            new MediaObject({
              text_titre: "YouTube",
              text_image_lien: "https://youtube.fr/@mychannel",
              image_url: "/icons/youtube.svg",
              color_couleur_bg: "#ff0000",
            }),
          ],
        },
        "edition",
      );
    });

    it("should update footer address", () => {
      const result = updateObjectByPath(
        footer,
        "text_adresse_footer",
        "456 Avenue des Champs",
      );

      expect(result.updated).toBe(true);
      expect(result.data.text_adresse_footer).toBe("456 Avenue des Champs");
      expect(footer.text_adresse_footer).toBe("rue des fleurs");
    });

    it("should update postal code", () => {
      const result = updateObjectByPath(footer, "text_code_postal", "75008");

      expect(result.updated).toBe(true);
      expect(result.data.text_code_postal).toBe("75008");
    });

    it("should update background color", () => {
      const result = updateObjectByPath(
        footer,
        "color_background_color",
        "#333333",
      );

      expect(result.updated).toBe(true);
      expect(result.data.color_background_color).toBe("#333333");
    });

    it("should update first social network in footer", () => {
      const result = updateObjectByPath(
        footer,
        "reseaux.0.text_image_lien",
        "https://linkedin.fr/company/new",
      );

      expect(result.updated).toBe(true);
      expect(result.data.reseaux[0].text_image_lien).toBe(
        "https://linkedin.fr/company/new",
      );
    });

    it("should update second social network background color", () => {
      const result = updateObjectByPath(
        footer,
        "reseaux.1.color_couleur_bg",
        "#cc0000",
      );

      expect(result.updated).toBe(true);
      expect(result.data.reseaux[1].color_couleur_bg).toBe("#cc0000");
      expect(footer.reseaux[1].color_couleur_bg).toBe("#ff0000");
    });

    it("should update company name while preserving reseaux", () => {
      const result = updateObjectByPath(
        footer,
        "text_nom_site_adresse",
        "Nouvelle Société",
      );

      expect(result.updated).toBe(true);
      expect(result.data.text_nom_site_adresse).toBe("Nouvelle Société");
      expect(result.data.reseaux.length).toBe(2);
      expect(result.data.reseaux[0].text_titre).toBe("LinkedIn");
    });
  });

  describe("PageObject - Tests profonds avec blocs imbriqués", () => {
    let page: PageObject;

    beforeEach(() => {
      // Note: Vous devrez adapter selon votre implémentation de BlocObject
      page = new PageObject({
        number_id: 1,
        text_titre: "Ma Page",
        text_description: "Description de la page",
        text_slug: "ma-page",
        checkbox_published: true,
        checkbox_home_page: false,
        number_page_position: 1,
        text_langue: "fr_FR",
        blocs: [
          // Si BlocObject existe et peut contenir des articles
        ],
      });
    });

    it("should update page title", () => {
      const result = updateObjectByPath(page, "text_titre", "Nouveau Titre");

      expect(result.updated).toBe(true);
      expect(result.data.text_titre).toBe("Nouveau Titre");
      expect(page.text_titre).toBe("Ma Page");
    });

    it("should update published status", () => {
      const result = updateObjectByPath(page, "checkbox_published", false);

      expect(result.updated).toBe(true);
      expect(result.data.checkbox_published).toBe(false);
      expect(page.checkbox_published).toBe(true);
    });

    it("should update slug", () => {
      const result = updateObjectByPath(page, "text_slug", "nouveau-slug");

      expect(result.updated).toBe(true);
      expect(result.data.text_slug).toBe("nouveau-slug");
    });

    it("should update page position", () => {
      const result = updateObjectByPath(page, "number_page_position", 5);

      expect(result.updated).toBe(true);
      expect(result.data.number_page_position).toBe(5);
    });

    it("should update language", () => {
      const result = updateObjectByPath(page, "text_langue", "en_US");

      expect(result.updated).toBe(true);
      expect(result.data.text_langue).toBe("en_US");
    });

    it("should update home page flag", () => {
      const result = updateObjectByPath(page, "checkbox_home_page", true);

      expect(result.updated).toBe(true);
      expect(result.data.checkbox_home_page).toBe(true);
    });

    it("should update description", () => {
      const result = updateObjectByPath(
        page,
        "text_description",
        "Nouvelle description",
      );

      expect(result.updated).toBe(true);
      expect(result.data.text_description).toBe("Nouvelle description");
    });
  });

  describe("MediaObject - Tests profonds individuels", () => {
    let media: MediaObject;

    beforeEach(() => {
      media = new MediaObject({
        id: "media-123",
        text_bloc_id: "bloc-456",
        text_titre: "Mon Image",
        color_couleur_bg: "#ffffff",
        text_image_lien: "https://example.fr",
        number_position_image: 5,
        image_url: "/uploads/image.jpg",
      });
    });

    it("should update media title", () => {
      const result = updateObjectByPath(media, "text_titre", "Titre Modifié");

      expect(result.updated).toBe(true);
      expect(result.data.text_titre).toBe("Titre Modifié");
      expect(media.text_titre).toBe("Mon Image");
    });

    it("should update background color", () => {
      const result = updateObjectByPath(media, "color_couleur_bg", "#000000");

      expect(result.updated).toBe(true);
      expect(result.data.color_couleur_bg).toBe("#000000");
    });

    it("should update image link", () => {
      const result = updateObjectByPath(
        media,
        "text_image_lien",
        "https://welcomepoitiers.fr",
      );

      expect(result.updated).toBe(true);
      expect(result.data.text_image_lien).toBe("https://welcomepoitiers.fr");
    });

    it("should update position", () => {
      const result = updateObjectByPath(media, "number_position_image", 10);

      expect(result.updated).toBe(true);
      expect(result.data.number_position_image).toBe(10);
    });

    it("should update image URL", () => {
      const result = updateObjectByPath(
        media,
        "image_url",
        "/new/path/image.png",
      );

      expect(result.updated).toBe(true);
      expect(result.data.image_url).toBe("/new/path/image.png");
    });

    it("should not update when value is identical", () => {
      const result = updateObjectByPath(media, "text_titre", "Mon Image");

      expect(result.updated).toBe(false);
    });
  });

  describe("Cas complexes - Structures profondément imbriquées", () => {
    it("should handle deeply nested article with multiple images", () => {
      const article = new ArticleObject({
        images: [
          new MediaObject({ text_titre: "Image 1", number_position_image: 0 }),
          new MediaObject({ text_titre: "Image 2", number_position_image: 1 }),
          new MediaObject({ text_titre: "Image 3", number_position_image: 2 }),
          new MediaObject({ text_titre: "Image 4", number_position_image: 3 }),
          new MediaObject({ text_titre: "Image 5", number_position_image: 4 }),
        ],
      });

      const result = updateObjectByPath(
        article,
        "images.4.text_titre",
        "Last Image Updated",
      );

      expect(result.updated).toBe(true);
      expect(result.data.images[4].text_titre).toBe("Last Image Updated");
      expect(result.data.images[0].text_titre).toBe("Image 1");
    });

    it("should handle header with multiple reseaux updates", () => {
      const header = new HeaderObject(
        {
          reseaux: [
            new MediaObject({ text_titre: "FB", text_image_lien: "fb.fr" }),
            new MediaObject({ text_titre: "TW", text_image_lien: "tw.fr" }),
            new MediaObject({ text_titre: "IG", text_image_lien: "ig.fr" }),
            new MediaObject({ text_titre: "LI", text_image_lien: "li.fr" }),
          ],
        },
        "edition",
      );

      const result = updateObjectByPath(
        header,
        "reseaux.3.text_image_lien",
        "linkedin.fr",
      );

      expect(result.updated).toBe(true);
      expect(result.data.reseaux[3].text_image_lien).toBe("linkedin.fr");
    });

    it("should preserve all other properties when updating nested property", () => {
      const article = new ArticleObject({
        id: "art-1",
        number_text_width: 100,
        number_height: 200,
        images: [
          new MediaObject({
            text_titre: "Img",
            color_couleur_bg: "#fff",
            image_url: "/img.jpg",
          }),
        ],
      });

      const result = updateObjectByPath(
        article,
        "images.0.color_couleur_bg",
        "#000",
      );

      expect(result.data.id).toBe("art-1");
      expect(result.data.number_text_width).toBe(100);
      expect(result.data.number_height).toBe(200);
      expect(result.data.images[0].text_titre).toBe("Img");
      expect(result.data.images[0].image_url).toBe("/img.jpg");
      expect(result.data.images[0].color_couleur_bg).toBe("#000");
    });
  });

  describe("Edge cases et valeurs spéciales", () => {
    it("should handle null values", () => {
      const media = new MediaObject({ text_titre: "Test" });
      const result = updateObjectByPath(media, "text_titre", null);

      expect(result.updated).toBe(true);
      expect(result.data.text_titre).toBeNull();
    });

    it("should handle empty string", () => {
      const media = new MediaObject({ text_titre: "Test" });
      const result = updateObjectByPath(media, "text_titre", "");

      expect(result.updated).toBe(true);
      expect(result.data.text_titre).toBe("");
    });

    it("should handle zero as value", () => {
      const article = new ArticleObject({ number_text_width: 100 });
      const result = updateObjectByPath(article, "number_text_width", 0);

      expect(result.updated).toBe(true);
      expect(result.data.number_text_width).toBe(0);
    });

    it("should handle boolean false", () => {
      const page = new PageObject({ checkbox_published: true });
      const result = updateObjectByPath(page, "checkbox_published", false);

      expect(result.updated).toBe(true);
      expect(result.data.checkbox_published).toBe(false);
    });
  });

  describe("BlocObject - Tests profonds avec medias et articles", () => {
    let bloc: BlocObject;

    beforeEach(() => {
      bloc = new BlocObject(
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
            new MediaObject({
              text_titre: "Media 1",
              image_url: "/meditest1.jpg",
              color_couleur_bg: "#ffffff",
              number_position_image: 0,
            }),
            new MediaObject({
              text_titre: "Media 2",
              image_url: "/meditest-2.jpg",
              color_couleur_bg: "#000000",
              number_position_image: 1,
            }),
            new MediaObject({
              text_titre: "Media 3",
              image_url: "/meditest-3.jpg",
              color_couleur_bg: "#ff0000",
              number_position_image: 2,
            }),
          ],
          articles: [
            new ArticleObject({
              id: "article-1",
              number_text_width: 100,
              number_height: 200,
              images: [
                new MediaObject({
                  text_titre: "Article Image 1",
                  image_url: "/article-img1.jpg",
                }),
              ],
            }),
            new ArticleObject({
              id: "article-2",
              number_text_width: 80,
              number_height: 150,
              images: [
                new MediaObject({
                  text_titre: "Article Image 2",
                  image_url: "/article-img2.jpg",
                }),
              ],
            }),
          ],
        },
        "edition",
      );
    });

    it("should update bloc title", () => {
      const result = updateObjectByPath(
        bloc,
        "text_titre",
        "Nouveau Titre Bloc",
      );

      expect(result.updated).toBe(true);
      expect(result.data.text_titre).toBe("Nouveau Titre Bloc");
      expect(bloc.text_titre).toBe("Mon Bloc");
    });

    it("should update bloc description", () => {
      const result = updateObjectByPath(
        bloc,
        "text_description",
        "Nouvelle description",
      );

      expect(result.updated).toBe(true);
      expect(result.data.text_description).toBe("Nouvelle description");
    });

    it("should update bloc background color", () => {
      const result = updateObjectByPath(
        bloc,
        "color_background_color",
        "#333333",
      );

      expect(result.updated).toBe(true);
      expect(result.data.color_background_color).toBe("#333333");
    });

    it("should update bloc width", () => {
      const result = updateObjectByPath(bloc, "number_width", 100);

      expect(result.updated).toBe(true);
      expect(result.data.number_width).toBe(100);
    });

    it("should update bloc height", () => {
      const result = updateObjectByPath(bloc, "number_height", 50);

      expect(result.updated).toBe(true);
      expect(result.data.number_height).toBe(50);
    });

    it("should update bloc gap", () => {
      const result = updateObjectByPath(bloc, "number_gap", 20);

      expect(result.updated).toBe(true);
      expect(result.data.number_gap).toBe(20);
    });

    it("should update bloc columns", () => {
      const result = updateObjectByPath(bloc, "number_columns", 4);

      expect(result.updated).toBe(true);
      expect(result.data.number_columns).toBe(4);
    });

    it("should update full width checkbox", () => {
      const result = updateObjectByPath(bloc, "checkbox_is_full_width", true);

      expect(result.updated).toBe(true);
      expect(result.data.checkbox_is_full_width).toBe(true);
    });

    it("should update bloc position", () => {
      const result = updateObjectByPath(bloc, "bloc_position", 5);

      expect(result.updated).toBe(true);
      expect(result.data.bloc_position).toBe(5);
    });

    it("should update first media title in bloc", () => {
      const result = updateObjectByPath(
        bloc,
        "image_medias.0.text_titre",
        "Updated Media 1",
      );

      expect(result.updated).toBe(true);
      expect(result.data.image_medias[0].text_titre).toBe("Updated Media 1");
      expect(bloc.image_medias[0].text_titre).toBe("Media 1");
    });

    it("should update second media image URL", () => {
      const result = updateObjectByPath(
        bloc,
        "image_medias.1.image_url",
        "/new-meditest-2.jpg",
      );

      expect(result.updated).toBe(true);
      expect(result.data.image_medias[1].image_url).toBe("/new-meditest-2.jpg");
      expect(bloc.image_medias[1].image_url).toBe("/meditest-2.jpg");
    });

    it("should update third media background color", () => {
      const result = updateObjectByPath(
        bloc,
        "image_medias.2.color_couleur_bg",
        "#00ff00",
      );

      expect(result.updated).toBe(true);
      expect(result.data.image_medias[2].color_couleur_bg).toBe("#00ff00");
      expect(bloc.image_medias[2].color_couleur_bg).toBe("#ff0000");
    });

    it("should update media position in bloc", () => {
      const result = updateObjectByPath(
        bloc,
        "image_medias.0.number_position_image",
        10,
      );

      expect(result.updated).toBe(true);
      expect(result.data.image_medias[0].number_position_image).toBe(10);
    });

    it("should update first article text width", () => {
      const result = updateObjectByPath(
        bloc,
        "articles.0.number_text_width",
        90,
      );

      expect(result.updated).toBe(true);
      expect(result.data.articles[0].number_text_width).toBe(90);
      expect(bloc.articles[0].number_text_width).toBe(100);
    });

    it("should update second article height", () => {
      const result = updateObjectByPath(bloc, "articles.1.number_height", 200);

      expect(result.updated).toBe(true);
      expect(result.data.articles[1].number_height).toBe(200);
      expect(bloc.articles[1].number_height).toBe(150);
    });

    it("should update image inside article inside bloc", () => {
      const result = updateObjectByPath(
        bloc,
        "articles.0.images.0.text_titre",
        "Updated Article Image",
      );

      expect(result.updated).toBe(true);
      expect(result.data.articles[0].images[0].text_titre).toBe(
        "Updated Article Image",
      );
      expect(bloc.articles[0].images[0].text_titre).toBe("Article Image 1");
    });

    it("should update image URL inside article inside bloc", () => {
      const result = updateObjectByPath(
        bloc,
        "articles.1.images.0.image_url",
        "/new-article-img.jpg",
      );

      expect(result.updated).toBe(true);
      expect(result.data.articles[1].images[0].image_url).toBe(
        "/new-article-img.jpg",
      );
      expect(bloc.articles[1].images[0].image_url).toBe("/article-img2.jpg");
    });

    it("should preserve all properties when updating nested media", () => {
      const result = updateObjectByPath(
        bloc,
        "image_medias.1.text_titre",
        "Changed",
      );

      expect(result.data.text_titre).toBe("Mon Bloc");
      expect(result.data.number_width).toBe(75);
      expect(result.data.image_medias.length).toBe(3);
      expect(result.data.articles.length).toBe(2);
      expect(result.data.image_medias[0].text_titre).toBe("Media 1");
      expect(result.data.image_medias[2].text_titre).toBe("Media 3");
    });
  });

  describe("PageObject avec BlocObjects imbriqués - Tests ultra-profonds", () => {
    let page: PageObject;

    beforeEach(() => {
      page = new PageObject({
        number_id: 1,
        text_titre: "Ma Page Complète",
        text_description: "Description de la page",
        text_slug: "ma-page-complete",
        checkbox_published: true,
        blocs: [
          new BlocObject(
            {
              id: "bloc-1",
              text_titre: "Bloc 1",
              type: TypeBloc.IMAGE_GROUPE,
              number_width: 100,
              image_medias: [
                new MediaObject({
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
                new MediaObject({
                  text_titre: "Image Bloc 2-1",
                  image_url: "/bloc2-img1.jpg",
                }),
                new MediaObject({
                  text_titre: "Image Bloc 2-2",
                  image_url: "/bloc2-img2.jpg",
                }),
              ],
              articles: [
                new ArticleObject({
                  id: "article-bloc2",
                  number_text_width: 100,
                  images: [
                    new MediaObject({
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
                new ArticleObject({
                  id: "article-1-bloc3",
                  number_text_width: 100,
                  images: [
                    new MediaObject({
                      text_titre: "Img 1",
                      image_url: "/img1.jpg",
                    }),
                    new MediaObject({
                      text_titre: "Img 2",
                      image_url: "/img2.jpg",
                    }),
                  ],
                }),
                new ArticleObject({
                  id: "article-2-bloc3",
                  number_text_width: 80,
                  images: [
                    new MediaObject({
                      text_titre: "Img 3",
                      image_url: "/img3.jpg",
                    }),
                  ],
                }),
              ],
            },
            "edition",
          ),
        ],
      });
    });

    it("should update first bloc title", () => {
      const result = updateObjectByPath(
        page,
        "blocs.0.text_titre",
        "Nouveau Titre Bloc 1",
      );

      expect(result.updated).toBe(true);
      expect(result.data.blocs[0].text_titre).toBe("Nouveau Titre Bloc 1");
      expect(page.blocs[0].text_titre).toBe("Bloc 1");
    });

    it("should update second bloc width", () => {
      const result = updateObjectByPath(page, "blocs.1.number_width", 100);

      expect(result.updated).toBe(true);
      expect(result.data.blocs[1].number_width).toBe(100);
      expect(page.blocs[1].number_width).toBe(80);
    });

    it("should update image in first bloc", () => {
      const result = updateObjectByPath(
        page,
        "blocs.0.image_medias.0.text_titre",
        "Updated Image",
      );

      expect(result.updated).toBe(true);
      expect(result.data.blocs[0].image_medias[0].text_titre).toBe(
        "Updated Image",
      );
      expect(page.blocs[0].image_medias[0].text_titre).toBe("Image Bloc 1");
    });

    it("should update second image in second bloc", () => {
      const result = updateObjectByPath(
        page,
        "blocs.1.image_medias.1.image_url",
        "/new-bloc2-img2.jpg",
      );

      expect(result.updated).toBe(true);
      expect(result.data.blocs[1].image_medias[1].image_url).toBe(
        "/new-bloc2-img2.jpg",
      );
      expect(page.blocs[1].image_medias[1].image_url).toBe("/bloc2-img2.jpg");
    });

    it("should update article in second bloc", () => {
      const result = updateObjectByPath(
        page,
        "blocs.1.articles.0.number_text_width",
        90,
      );

      expect(result.updated).toBe(true);
      expect(result.data.blocs[1].articles[0].number_text_width).toBe(90);
      expect(page.blocs[1].articles[0].number_text_width).toBe(100);
    });

    it("should update image inside article inside second bloc", () => {
      const result = updateObjectByPath(
        page,
        "blocs.1.articles.0.images.0.text_titre",
        "Super Updated",
      );

      expect(result.updated).toBe(true);
      expect(result.data.blocs[1].articles[0].images[0].text_titre).toBe(
        "Super Updated",
      );
      expect(page.blocs[1].articles[0].images[0].text_titre).toBe(
        "Article Image Bloc 2",
      );
    });

    it("should update first image in first article in third bloc", () => {
      const result = updateObjectByPath(
        page,
        "blocs.2.articles.0.images.0.text_titre",
        "Modified Img 1",
      );

      expect(result.updated).toBe(true);
      expect(result.data.blocs[2].articles[0].images[0].text_titre).toBe(
        "Modified Img 1",
      );
      expect(page.blocs[2].articles[0].images[0].text_titre).toBe("Img 1");
    });

    it("should update second image in first article in third bloc", () => {
      const result = updateObjectByPath(
        page,
        "blocs.2.articles.0.images.1.image_url",
        "/modified-img2.jpg",
      );

      expect(result.updated).toBe(true);
      expect(result.data.blocs[2].articles[0].images[1].image_url).toBe(
        "/modified-img2.jpg",
      );
      expect(page.blocs[2].articles[0].images[1].image_url).toBe("/img2.jpg");
    });

    it("should update image in second article in third bloc", () => {
      const result = updateObjectByPath(
        page,
        "blocs.2.articles.1.images.0.text_titre",
        "Modified Img 3",
      );

      expect(result.updated).toBe(true);
      expect(result.data.blocs[2].articles[1].images[0].text_titre).toBe(
        "Modified Img 3",
      );
      expect(page.blocs[2].articles[1].images[0].text_titre).toBe("Img 3");
    });

    it("should update page title and preserve all blocs", () => {
      const result = updateObjectByPath(
        page,
        "text_titre",
        "Nouveau Titre Page",
      );

      expect(result.updated).toBe(true);
      expect(result.data.text_titre).toBe("Nouveau Titre Page");
      expect(result.data.blocs.length).toBe(3);
      expect(result.data.blocs[0].text_titre).toBe("Bloc 1");
      expect(result.data.blocs[1].text_titre).toBe("Bloc 2");
      expect(result.data.blocs[2].text_titre).toBe("Bloc 3");
    });

    it("should preserve entire structure when updating deep nested property", () => {
      const result = updateObjectByPath(
        page,
        "blocs.2.articles.0.images.1.text_titre",
        "Deep Update",
      );

      // Vérifier la structure complète
      expect(result.data.text_titre).toBe("Ma Page Complète");
      expect(result.data.blocs.length).toBe(3);
      expect(result.data.blocs[0].image_medias.length).toBe(1);
      expect(result.data.blocs[1].image_medias.length).toBe(2);
      expect(result.data.blocs[1].articles.length).toBe(1);
      expect(result.data.blocs[2].articles.length).toBe(2);
      expect(result.data.blocs[2].articles[0].images.length).toBe(2);

      // Vérifier que seule la valeur ciblée a changé
      expect(result.data.blocs[2].articles[0].images[1].text_titre).toBe(
        "Deep Update",
      );
      expect(result.data.blocs[2].articles[0].images[0].text_titre).toBe(
        "Img 1",
      );
    });

    it("should handle multiple levels of nesting without side effects", () => {
      const result = updateObjectByPath(
        page,
        "blocs.1.articles.0.images.0.image_url",
        "/ultimate-update.jpg",
      );

      expect(result.updated).toBe(true);

      // Vérifier que rien d'autre n'a changé
      expect(result.data.blocs[0].text_titre).toBe("Bloc 1");
      expect(result.data.blocs[1].text_titre).toBe("Bloc 2");
      expect(result.data.blocs[1].image_medias[0].text_titre).toBe(
        "Image Bloc 2-1",
      );
      expect(result.data.blocs[1].articles[0].images[0].text_titre).toBe(
        "Article Image Bloc 2",
      );

      // Vérifier le changement
      expect(result.data.blocs[1].articles[0].images[0].image_url).toBe(
        "/ultimate-update.jpg",
      );

      // Vérifier l'immutabilité
      expect(page.blocs[1].articles[0].images[0].image_url).toBe(
        "/bloc2-article-img.jpg",
      );
    });
  });

  describe("BlocObject avec articles complexes - Tests extrêmes", () => {
    it("should handle bloc with multiple articles with multiple images each", () => {
      const bloc = new BlocObject(
        {
          text_titre: "Complex Bloc",
          articles: [
            new ArticleObject({
              id: "art1",
              images: [
                new MediaObject({
                  text_titre: "test1-1",
                  image_url: "/test11.jpg",
                }),
                new MediaObject({
                  text_titre: "test1-2",
                  image_url: "/test12.jpg",
                }),
                new MediaObject({
                  text_titre: "test1-3",
                  image_url: "/test13.jpg",
                }),
              ],
            }),
            new ArticleObject({
              id: "art2",
              images: [
                new MediaObject({
                  text_titre: "test-2-1",
                  image_url: "/test-21.jpg",
                }),
                new MediaObject({
                  text_titre: "test-2-2",
                  image_url: "/test-22.jpg",
                }),
              ],
            }),
            new ArticleObject({
              id: "art3",
              images: [
                new MediaObject({
                  text_titre: "test-3-1",
                  image_url: "/test-31.jpg",
                }),
              ],
            }),
          ],
        },
        "edition",
      );

      const result = updateObjectByPath(
        bloc,
        "articles.1.images.1.text_titre",
        "Updated test 2",
      );

      expect(result.updated).toBe(true);
      expect(result.data.articles[1].images[1].text_titre).toBe(
        "Updated test 2",
      );
      expect(result.data.articles[0].images.length).toBe(3);
      expect(result.data.articles[1].images.length).toBe(2);
      expect(result.data.articles[2].images.length).toBe(1);
    });

    it("should handle bloc with both medias and articles", () => {
      const bloc = new BlocObject(
        {
          text_titre: "Mixed Bloc",
          image_medias: [
            new MediaObject({
              text_titre: "MediaObject 1",
              image_url: "/test_1.jpg",
            }),
            new MediaObject({ text_titre: "test 2", image_url: "/test_2.jpg" }),
          ],
          articles: [
            new ArticleObject({
              id: "art1",
              images: [
                new MediaObject({
                  text_titre: "test 1",
                  image_url: "/test_1.jpg",
                }),
              ],
            }),
          ],
        },
        "edition",
      );

      // Update media
      let result = updateObjectByPath(
        bloc,
        "image_medias.0.text_titre",
        "Updated test 1",
      );
      expect(result.data.image_medias[0].text_titre).toBe("Updated test 1");
      expect(result.data.articles[0].images[0].text_titre).toBe("test 1");

      // Update article image
      result = updateObjectByPath(
        result.data,
        "articles.0.images.0.text_titre",
        "Updated test 2",
      );
      expect(result.data.articles[0].images[0].text_titre).toBe(
        "Updated test 2",
      );
      expect(result.data.image_medias[0].text_titre).toBe("Updated test 1");
    });
  });
});
