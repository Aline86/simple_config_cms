// tests/models/BlocObject.test.ts
/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { BlocObject } from "../database/model/Bloc";
import { ArticleObject } from "../database/model/bloc/Article";
import { MediaObject } from "../database/model/bloc/MediaObject";
import { TypeBloc } from "../database/model/Page";
import { JSONContent } from "@tiptap/core";

describe("BlocObject", () => {
  describe("Constructor", () => {
    it("creates a BlocObject with default values", () => {
      const bloc = new BlocObject();

      expect(bloc.id).toBeNull();
      expect(bloc.text_nom_bloc).toBe("");
      expect(bloc.text_titre).toBe("");
      expect(bloc.checkbox_is_full_width).toBe(false);
      expect(bloc.number_width).toBe(75);
      expect(bloc.number_height).toBe(75);
      expect(bloc.number_gap).toBe(30);
      expect(bloc.number_columns).toBe(3);
      expect(bloc.image_medias).toEqual([]);
      expect(bloc.articles).toEqual([]);
      expect(bloc.mode).toBe("edition");
    });

    it("creates a BlocObject with provided data", () => {
      const data = {
        id: "bloc-123",
        text_nom_bloc: "CAROUSEL",
        number_page_id: 1,
        text_titre: "Mon Carrousel",
        text_description: "Description du carrousel",
        color_background_color: "#FF0000",
        type: TypeBloc.CAROUSEL,
        bloc_position: 1,
        langue_bloc: "fr",
        checkbox_is_full_width: true,
        number_width: 100,
        number_height: 50,
        number_gap: 20,
        number_columns: 4,
      };

      const bloc = new BlocObject(data);

      expect(bloc.id).toBe("bloc-123");
      expect(bloc.text_nom_bloc).toBe("CAROUSEL");
      expect(bloc.number_page_id).toBe(1);
      expect(bloc.text_titre).toBe("Mon Carrousel");
      expect(bloc.text_description).toBe("Description du carrousel");
      expect(bloc.color_background_color).toBe("#FF0000");
      expect(bloc.type).toBe(TypeBloc.CAROUSEL);
      expect(bloc.bloc_position).toBe(1);
      expect(bloc.langue_bloc).toBe("fr");
      expect(bloc.checkbox_is_full_width).toBe(true);
      expect(bloc.number_width).toBe(100);
      expect(bloc.number_height).toBe(50);
      expect(bloc.number_gap).toBe(20);
      expect(bloc.number_columns).toBe(4);
    });

    it("sets createdAt and updatedAt to current date by default", () => {
      const before = new Date();
      const bloc = new BlocObject();
      const after = new Date();

      expect(bloc.text_createdAt).toBeInstanceOf(Date);
      expect(bloc.text_updatedAt).toBeInstanceOf(Date);
      expect(bloc.text_createdAt!.getTime()).toBeGreaterThanOrEqual(
        before.getTime(),
      );
      expect(bloc.text_createdAt!.getTime()).toBeLessThanOrEqual(
        after.getTime(),
      );
    });

    it("preserves provided dates", () => {
      const customDate = new Date("2024-01-01");
      const bloc = new BlocObject({
        text_createdAt: customDate,
        text_updatedAt: customDate,
      });

      expect(bloc.text_createdAt).toEqual(customDate);
      expect(bloc.text_updatedAt).toEqual(customDate);
    });

    it('sets mode to "visualisation" when provided', () => {
      const bloc = new BlocObject({}, "visualisation");
      expect(bloc.mode).toBe("visualisation");
    });
  });

  describe("Media Management", () => {
    it("hydrates MediaObject instances from plain objects", () => {
      const mediaData = [
        {
          id: "media-1",
          text_titre: "Image 1",
          text_image_lien: "/image1.jpg",
          number_position_image: 1,
        },
        {
          id: "media-2",
          text_titre: "Image 2",
          text_image_lien: "/image2.jpg",
          number_position_image: 2,
        },
      ];

      const bloc = new BlocObject({ image_medias: mediaData });

      expect(bloc.image_medias).toHaveLength(2);
      expect(bloc.image_medias[0]).toBeInstanceOf(MediaObject);
      expect(bloc.image_medias[1]).toBeInstanceOf(MediaObject);
      expect(bloc.image_medias[0].text_titre).toBe("Image 1");
      expect(bloc.image_medias[1].text_image_lien).toBe("/image2.jpg");
    });

    it("preserves existing MediaObject instances", () => {
      const media = new MediaObject({
        id: "media-1",
        text_titre: "Image",
        text_image_lien: "/image.jpg",
      });

      const bloc = new BlocObject({ image_medias: [media] });

      expect(bloc.image_medias[0]).toBe(media);
    });

    it("adds a media to the bloc", () => {
      const bloc = new BlocObject();
      const media = new MediaObject({
        id: "media-1",
        text_titre: "New Image",
        text_image_lien: "/new-image.jpg",
      });

      bloc.addMedia(media);

      expect(bloc.image_medias).toHaveLength(1);
      expect(bloc.image_medias[0]).toBe(media);
    });

    it("removes a media by index", () => {
      const media1 = new MediaObject({ id: "media-1", text_titre: "Image 1" });
      const media2 = new MediaObject({ id: "media-2", text_titre: "Image 2" });
      const media3 = new MediaObject({ id: "media-3", text_titre: "Image 3" });

      const bloc = new BlocObject({ image_medias: [media1, media2, media3] });

      bloc.removeMedia(1);

      expect(bloc.image_medias).toHaveLength(2);
      expect(bloc.image_medias[0].id).toBe("media-1");
      expect(bloc.image_medias[1].id).toBe("media-3");
    });
  });

  describe("Article Management", () => {
    it("hydrates ArticleObject instances from plain objects", () => {
      const validContent1: JSONContent = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Contenu 1" }],
          },
        ],
      };

      const validContent2: JSONContent = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Contenu 2" }],
          },
        ],
      };

      const articleData: any[] = [
        {
          id: "article-1",
          text_article: validContent1,
        },
        {
          id: "article-2",
          text_article: validContent2,
        },
      ];

      const bloc = new BlocObject({ articles: articleData });

      expect(bloc.articles).toHaveLength(2);
      expect(bloc.articles[0]).toBeInstanceOf(ArticleObject);
      expect(bloc.articles[1]).toBeInstanceOf(ArticleObject);
      expect(bloc.articles[0].text_article).toEqual(validContent1);
      expect(bloc.articles[1].text_article).toEqual(validContent2);
    });

    it("preserves existing ArticleObject instances", () => {
      const validContent: JSONContent = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Content" }],
          },
        ],
      };

      const article = new ArticleObject({
        id: "article-1",
        text_article: validContent,
      });

      const bloc = new BlocObject({ articles: [article] });

      expect(bloc.articles[0]).toBe(article);
    });

    it("adds an article to the bloc", () => {
      const validContent: JSONContent = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "New article" }],
          },
        ],
      };

      const bloc = new BlocObject();
      const article = new ArticleObject({
        id: "article-1",
        text_article: validContent,
      });

      bloc.addArticle(article);

      expect(bloc.articles).toHaveLength(1);
      expect(bloc.articles[0]).toBe(article);
    });

    it("removes an article by index", () => {
      const article1 = new ArticleObject({ id: "article-1" });
      const article2 = new ArticleObject({ id: "article-2" });
      const article3 = new ArticleObject({ id: "article-3" });

      const bloc = new BlocObject({ articles: [article1, article2, article3] });

      bloc.removeArticle(1);

      expect(bloc.articles).toHaveLength(2);
      expect(bloc.articles[0].id).toBe("article-1");
      expect(bloc.articles[1].id).toBe("article-3");
    });
  });

  describe("toJSON", () => {
    it("serializes the bloc with all properties", () => {
      const media = new MediaObject({
        id: "media-1",
        text_titre: "Image",
        text_image_lien: "/image.jpg",
        number_position_image: 1,
      });

      const validContent: JSONContent = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Article content" }],
          },
        ],
      };

      const article = new ArticleObject({
        id: "article-1",
        text_article: validContent,
      });

      const bloc = new BlocObject({
        id: "bloc-123",
        text_nom_bloc: "CAROUSEL",
        text_titre: "Mon Bloc",
        image_medias: [media],
        articles: [article],
      });

      const json = bloc.toJSON();

      expect(json.id).toBe("bloc-123");
      expect(json.text_nom_bloc).toBe("CAROUSEL");
      expect(json.text_titre).toBe("Mon Bloc");
      expect(json.image_medias).toHaveLength(1);
      expect(json.articles).toHaveLength(1);
      expect(json.image_medias[0]).toEqual(media.toJSON());
      expect(json.articles[0]).toEqual(article.toJSON());
    });

    it("serializes nested objects correctly", () => {
      const media = new MediaObject({
        id: "media-1",
        text_titre: "Image",
        text_image_lien: "https://cloudinary.com/image.jpg",
      });

      const bloc = new BlocObject({ image_medias: [media] });
      const json = bloc.toJSON();

      expect(typeof json.image_medias[0]).toBe("object");
      expect(json.image_medias[0].text_image_lien).toBe(
        "https://cloudinary.com/image.jpg",
      );
    });
  });

  describe("Edge cases", () => {
    it("handles null and undefined values correctly", () => {
      const bloc = new BlocObject({
        id: null,
        text_nom_bloc: null,
        number_page_id: null,
        color_background_color: null,
      });

      expect(bloc.id).toBeNull();
      expect(bloc.text_nom_bloc).toBe("");
      expect(bloc.number_page_id).toBeNull();
      expect(bloc.color_background_color).toBeNull();
    });

    it("handles empty arrays for medias and articles", () => {
      const bloc = new BlocObject({
        image_medias: [],
        articles: [],
      });

      expect(bloc.image_medias).toEqual([]);
      expect(bloc.articles).toEqual([]);
    });

    it("handles mixed instances and plain objects in arrays", () => {
      const existingMedia = new MediaObject({ id: "media-1" });
      const plainMedia = { id: "media-2", text_titre: "Plain" };

      const bloc = new BlocObject({
        image_medias: [existingMedia, plainMedia],
      });

      expect(bloc.image_medias).toHaveLength(2);
      expect(bloc.image_medias[0]).toBe(existingMedia);
      expect(bloc.image_medias[1]).toBeInstanceOf(MediaObject);
      expect(bloc.image_medias[1].id).toBe("media-2");
    });
  });

  describe("Data integrity", () => {
    it("maintains type safety for TypeBloc enum", () => {
      const bloc = new BlocObject({ type: TypeBloc.CAROUSEL });
      expect(bloc.type).toBe(TypeBloc.CAROUSEL);
    });

    it("allows string type for flexibility", () => {
      const bloc = new BlocObject({ type: "CUSTOM_TYPE" });
      expect(bloc.type).toBe("CUSTOM_TYPE");
    });

    it("preserves boolean values correctly", () => {
      const blocTrue = new BlocObject({ checkbox_is_full_width: true });
      const blocFalse = new BlocObject({ checkbox_is_full_width: false });
      const blocDefault = new BlocObject();

      expect(blocTrue.checkbox_is_full_width).toBe(true);
      expect(blocFalse.checkbox_is_full_width).toBe(false);
      expect(blocDefault.checkbox_is_full_width).toBe(false);
    });

    it("handles numeric values with defaults", () => {
      const bloc = new BlocObject();

      expect(bloc.number_width).toBe(75);
      expect(bloc.number_height).toBe(75);
      expect(bloc.number_gap).toBe(30);
      expect(bloc.number_columns).toBe(3);
    });
  });

  describe("Complete Page Integration", () => {
    it("creates a complete page with multiple blocs of different types", () => {
      // Bloc 1: CAROUSEL avec images
      const carouselMedia1 = new MediaObject({
        id: "carousel-img-1",
        text_titre: "Slide 1",
        text_image_lien: "https://cloudinary.com/carousel1.jpg",
        number_position_image: 1,
      });

      const carouselMedia2 = new MediaObject({
        id: "carousel-img-2",
        text_titre: "Slide 2",
        text_image_lien: "https://cloudinary.com/carousel2.jpg",
        number_position_image: 2,
      });

      const carouselBloc = new BlocObject({
        id: "bloc-carousel-1",
        text_nom_bloc: "CAROUSEL",
        text_titre: "Nos Réalisations",
        text_description: "Découvrez nos derniers projets",
        type: TypeBloc.CAROUSEL,
        bloc_position: 1,
        checkbox_is_full_width: true,
        image_medias: [carouselMedia1, carouselMedia2],
      });

      // Bloc 2: TEXTE avec article
      const articleContent: JSONContent = {
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "À Propos" }],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", text: "Notre entreprise est spécialisée dans " },
              {
                type: "text",
                text: "le développement web moderne",
                marks: [{ type: "bold" }],
              },
              { type: "text", text: "." },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "React & Next.js" }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "TypeScript" }],
                  },
                ],
              },
            ],
          },
        ],
      };

      const article = new ArticleObject({
        id: "article-1",
        text_article: articleContent,
        number_text_width: 80,
        text_images_position: "top",
      });

      const texteBloc = new BlocObject({
        id: "bloc-texte-1",
        text_nom_bloc: "TEXTE",
        text_titre: "Présentation",
        type: TypeBloc.TEXTE,
        bloc_position: 2,
        checkbox_is_full_width: false,
        articles: [article],
      });

      // Bloc 3: IMAGE_GROUPE
      const gallery1 = new MediaObject({
        id: "gallery-img-1",
        text_titre: "Photo 1",
        text_image_lien: "https://cloudinary.com/gallery1.jpg",
        number_position_image: 1,
      });

      const gallery2 = new MediaObject({
        id: "gallery-img-2",
        text_titre: "Photo 2",
        text_image_lien: "https://cloudinary.com/gallery2.jpg",
        number_position_image: 2,
      });

      const gallery3 = new MediaObject({
        id: "gallery-img-3",
        text_titre: "Photo 3",
        text_image_lien: "https://cloudinary.com/gallery3.jpg",
        number_position_image: 3,
      });

      const imageGroupeBloc = new BlocObject({
        id: "bloc-gallery-1",
        text_nom_bloc: "IMAGE_GROUPE",
        text_titre: "Galerie Photos",
        type: TypeBloc.IMAGE_GROUPE,
        bloc_position: 3,
        number_columns: 3,
        number_gap: 20,
        image_medias: [gallery1, gallery2, gallery3],
      });

      // Bloc 4: VIDEO
      const videoMedia = new MediaObject({
        id: "video-1",
        text_titre: "Vidéo de présentation",
        text_image_lien: "https://cloudinary.com/video.mp4",
        number_position_image: 1,
      });

      const videoBloc = new BlocObject({
        id: "bloc-video-1",
        text_nom_bloc: "VIDEO",
        text_titre: "Découvrez-nous en vidéo",
        type: TypeBloc.VIDEO,
        bloc_position: 4,
        checkbox_is_full_width: true,
        image_medias: [videoMedia],
      });

      // Bloc 5: BOUTON
      const boutonBloc = new BlocObject({
        id: "bloc-bouton-1",
        text_nom_bloc: "BOUTON",
        text_titre: "Contactez-nous",
        text_description: "Parlons de votre projet",
        type: TypeBloc.BUTTON,
        bloc_position: 5,
        color_background_color: "#FF6B35",
      });

      // Simuler une page complète
      const pageBlocs = [
        carouselBloc,
        texteBloc,
        imageGroupeBloc,
        videoBloc,
        boutonBloc,
      ];

      // Assertions sur la structure de la page
      expect(pageBlocs).toHaveLength(5);
      expect(pageBlocs[0].type).toBe(TypeBloc.CAROUSEL);
      expect(pageBlocs[1].type).toBe(TypeBloc.TEXTE);
      expect(pageBlocs[2].type).toBe(TypeBloc.IMAGE_GROUPE);
      expect(pageBlocs[3].type).toBe(TypeBloc.VIDEO);
      expect(pageBlocs[4].type).toBe(TypeBloc.BUTTON);

      // Vérifier l'ordre des blocs
      expect(pageBlocs[0].bloc_position).toBe(1);
      expect(pageBlocs[1].bloc_position).toBe(2);
      expect(pageBlocs[2].bloc_position).toBe(3);
      expect(pageBlocs[3].bloc_position).toBe(4);
      expect(pageBlocs[4].bloc_position).toBe(5);

      // Vérifier le contenu du carousel
      expect(carouselBloc.image_medias).toHaveLength(2);
      expect(carouselBloc.checkbox_is_full_width).toBe(true);

      // Vérifier le contenu du texte
      expect(texteBloc.articles).toHaveLength(1);
      expect(texteBloc.articles[0].text_article?.content).toHaveLength(3);

      // Vérifier la galerie
      expect(imageGroupeBloc.image_medias).toHaveLength(3);
      expect(imageGroupeBloc.number_columns).toBe(3);

      // Vérifier la vidéo
      expect(videoBloc.image_medias).toHaveLength(1);
      expect(videoBloc.image_medias[0].text_image_lien).toContain("video.mp4");

      // Vérifier le bouton
      expect(boutonBloc.color_background_color).toBe("#FF6B35");
    });

    it("serializes a complete page to JSON", () => {
      const media = new MediaObject({
        id: "media-1",
        text_titre: "Hero Image",
        text_image_lien: "https://cloudinary.com/hero.jpg",
      });

      const articleContent: JSONContent = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Welcome to our site" }],
          },
        ],
      };

      const article = new ArticleObject({
        id: "article-1",
        text_article: articleContent,
      });

      const bloc1 = new BlocObject({
        id: "bloc-1",
        text_nom_bloc: "CAROUSEL",
        text_titre: "Hero Section",
        type: TypeBloc.CAROUSEL,
        bloc_position: 1,
        image_medias: [media],
      });

      const bloc2 = new BlocObject({
        id: "bloc-2",
        text_nom_bloc: "TEXTE",
        text_titre: "Content",
        type: TypeBloc.TEXTE,
        bloc_position: 2,
        articles: [article],
      });

      const pageBlocs = [bloc1, bloc2];
      const pageJSON = pageBlocs.map((bloc) => bloc.toJSON());

      expect(pageJSON).toHaveLength(2);
      expect(pageJSON[0].id).toBe("bloc-1");
      expect(pageJSON[0].image_medias).toHaveLength(1);
      expect(pageJSON[1].id).toBe("bloc-2");
      expect(pageJSON[1].articles).toHaveLength(1);

      // Vérifier que les objets imbriqués sont sérialisés
      expect(typeof pageJSON[0].image_medias[0]).toBe("object");
      expect(typeof pageJSON[1].articles[0]).toBe("object");
    });

    it("handles bloc reordering", () => {
      const bloc1 = new BlocObject({
        id: "bloc-1",
        text_titre: "First",
        bloc_position: 1,
      });

      const bloc2 = new BlocObject({
        id: "bloc-2",
        text_titre: "Second",
        bloc_position: 2,
      });

      const bloc3 = new BlocObject({
        id: "bloc-3",
        text_titre: "Third",
        bloc_position: 3,
      });

      let blocs = [bloc1, bloc2, bloc3];

      // Simuler un réordonnement (déplacer bloc3 en première position)
      bloc3.bloc_position = 1;
      bloc1.bloc_position = 2;
      bloc2.bloc_position = 3;

      blocs = blocs.sort(
        (a, b) => (a.bloc_position ?? 0) - (b.bloc_position ?? 0),
      );

      expect(blocs[0].id).toBe("bloc-3");
      expect(blocs[1].id).toBe("bloc-1");
      expect(blocs[2].id).toBe("bloc-2");
    });

    it("creates a multilingual page", () => {
      const blocFr = new BlocObject({
        id: "bloc-fr",
        text_titre: "Bienvenue",
        text_description: "Contenu en français",
        langue_bloc: "fr",
        bloc_position: 1,
      });

      const blocEn = new BlocObject({
        id: "bloc-en",
        text_titre: "Welcome",
        text_description: "Content in English",
        langue_bloc: "en",
        bloc_position: 1,
      });

      expect(blocFr.langue_bloc).toBe("fr");
      expect(blocEn.langue_bloc).toBe("en");
      expect(blocFr.text_titre).toBe("Bienvenue");
      expect(blocEn.text_titre).toBe("Welcome");
    });

    it("handles complex nested structure with multiple medias and articles", () => {
      const medias = Array.from(
        { length: 5 },
        (_, i) =>
          new MediaObject({
            id: `media-${i + 1}`,
            text_titre: `Image ${i + 1}`,
            text_image_lien: `https://cloudinary.com/image${i + 1}.jpg`,
            number_position_image: i + 1,
          }),
      );

      const articles = Array.from({ length: 3 }, (_, i) => {
        const content: JSONContent = {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: `Article ${i + 1}` }],
            },
          ],
        };

        return new ArticleObject({
          id: `article-${i + 1}`,
          text_article: content,
        });
      });

      const complexBloc = new BlocObject({
        id: "complex-bloc",
        text_nom_bloc: "SCREEN",
        text_titre: "Section Complète",
        type: TypeBloc.SCREEN,
        image_medias: medias,
        articles: articles,
        bloc_position: 1,
      });

      expect(complexBloc.image_medias).toHaveLength(5);
      expect(complexBloc.articles).toHaveLength(3);

      // Vérifier que tous les médias sont des instances
      complexBloc.image_medias.forEach((media) => {
        expect(media).toBeInstanceOf(MediaObject);
      });

      // Vérifier que tous les articles sont des instances
      complexBloc.articles.forEach((article) => {
        expect(article).toBeInstanceOf(ArticleObject);
      });

      // Test de sérialisation
      const json = complexBloc.toJSON();
      expect(json.image_medias).toHaveLength(5);
      expect(json.articles).toHaveLength(3);
    });
  });
});
