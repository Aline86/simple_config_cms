import { CloudinaryParameter } from "../validators/MediaValidator";
import { Parameter } from "../validators/NumberValidator";
import { TextParameter } from "../validators/TextValidator";

export type FieldParameter = TextParameter | CloudinaryParameter | Parameter;

const FIELD_CONFIGS: Record<string, FieldParameter> = {
  number_columns: new Parameter({
    type: "range",
    min: 1,
    max: 4,
    step: 1,
    integer: true,
    positive: true,
    defaultValue: 4,
    errorMessages: {
      min: "La largeur minimale est 1 colonne",
      max: "La largeur maximale est 4 colonnes",
      integer: "La largeur doit être un nombre entier",
    },
  }),
  text_createdAt: new TextParameter({
    isDate: true,
  }),
  text_updatedAt: new TextParameter({
    isDate: true,
  }),

  number_gap: new Parameter({
    type: "range",
    min: 0,
    max: 30,
    step: 1,
    defaultValue: 15,
    integer: true,
    positive: true,
    errorMessages: {
      min: "La largeur minimale est 75px",
      max: "La largeur maximale est 250px",
    },
  }),
  number_width: new Parameter({
    type: "range",
    min: 75,
    max: 250,
    step: 10,
    defaultValue: 150,
    integer: true,
    positive: true,
    errorMessages: {
      min: "La largeur minimale est 75px",
      max: "La largeur maximale est 250px",
    },
  }),
  number_height: new Parameter({
    type: "range",
    min: 75,
    max: 250,
    step: 10,
    defaultValue: 150,
    integer: true,
    positive: true,
    errorMessages: {
      min: "La largeur minimale est 75px",
      max: "La largeur maximale est 250px",
    },
  }),
  text_bloc_id: new Parameter({
    integer: true,
    positive: true,
    required: false,
    errorMessages: {
      integer: "L'id du bloc doit être un nombre entier",
      positive: "L'id du bloc doit être positif",
    },
  }),
  // car est égal à #000000
  text_empty: new TextParameter({
    maxLength: 7,

    trim: true,
    type: "hidden",
    errorMessages: {
      maxLength: "Le titre ne peut pas dépasser 255 caractères",
      required: "Le titre est obligatoire",
    },
  }),
  // à faire
  text_url_interne: new TextParameter({
    maxLength: 0,
    isInternUrl: true,
    trim: true,
    type: "hidden",
    errorMessages: {
      maxLength: "Le titre ne peut pas dépasser 255 caractères",
      required: "Le titre est obligatoire",
    },
  }),
  text_nom_site_adresse: new TextParameter({
    maxLength: 40,
    required: true,
    trim: true,
    placeholder: "Entrez le titre",
    errorMessages: {
      maxLength: "Le titre ne peut pas dépasser 255 caractères",
      required: "Le titre est obligatoire",
    },
  }),
  text_adresse_footer: new TextParameter({
    maxLength: 255,
    required: true,
    trim: true,
    placeholder: "Entrez le titre",
    errorMessages: {
      maxLength: "Le titre ne peut pas dépasser 255 caractères",
      required: "Le titre est obligatoire",
    },
  }),
  text_code_postal: new TextParameter({
    maxLength: 50,
    required: true,
    trim: true,
    placeholder: "Entrez le titre",
    errorMessages: {
      maxLength: "Le titre ne peut pas dépasser 255 caractères",
      required: "Le titre est obligatoire",
    },
  }),
  text_image_lien: new TextParameter({
    url: true,
    required: false,
    trim: true,
    errorMessages: {
      url: "Le lien doit être une URL valide",
    },
  }),
  text_description: new TextParameter({
    maxLength: 255,
    required: false,
    trim: true,
    multiline: 3,
    placeholder: "Décrivez votre contenu...",
    errorMessages: {
      maxLength: "La text_description ne peut pas dépasser 500 caractères",
    },
  }),
  number_position_image: new Parameter({
    integer: true,
    nonnegative: true,
    required: false,
    errorMessages: {
      integer: "La position doit être un nombre entier",
      nonnegative: "La position ne peut pas être négative",
    },
  }),
  text_titre: new TextParameter({
    maxLength: 255,
    required: true,
    trim: true,
    placeholder: "Entrez le titre",
    errorMessages: {
      maxLength: "Le titre ne peut pas dépasser 255 caractères",
      required: "Le titre est obligatoire",
    },
  }),
  color_background_color: new TextParameter({
    maxLength: 7,
    required: true,
    trim: true,
  }),
  checkbox_home_page: new TextParameter({}),
  text_nom_site: new TextParameter({
    maxLength: 100,
    required: true,
    trim: true,
    placeholder: "Entrez le nom du site",
    errorMessages: {
      maxLength: "Le titre ne peut pas dépasser 255 caractères",
      required: "Le titre est obligatoire",
    },
  }),

  text_email: new TextParameter({
    email: true,
    required: true,
    trim: true,
    lowercase: true,
    placeholder: "email@exemple.com",
    errorMessages: {
      email: "Veuillez entrer une adresse email valide",
      required: "L'email est obligatoire",
    },
  }),
  text_url: new TextParameter({
    url: true,
    required: false,
    trim: true,
    placeholder: "https://...",
    errorMessages: {
      url: "Veuillez entrer une URL valide",
    },
  }),
  image_url: new CloudinaryParameter({
    required: true,
    resourceTypes: ["image"], // uniquement les images
    allowedFormats: ["jpg", "jpeg", "png", "webp"], // formats autorisés
    errorMessages: {
      required: "L'image est obligatoire",
      cloudinary: "L'image doit provenir de Cloudinary",
      format: "Formats autorisés : jpg, jpeg, png, webp",
    },
  }),
};

export default FIELD_CONFIGS;
