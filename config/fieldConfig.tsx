import { CloudinaryParameter } from "@/validators/MediaValidator";
import { Parameter } from "@/validators/NumberValidator";
import { TextParameter } from "@/validators/TextValidator";
type FieldParameter = TextParameter | CloudinaryParameter | Parameter;

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

  number_width: new Parameter({
    type: "number",
    min: 20,
    max: 100,
    step: 10,
    integer: true,
    positive: true,
    errorMessages: {
      min: "La largeur minimale est 20% du container",
      max: "La largeur maximale est 100% du container",
    },
  }),
  number_bloc_id: new Parameter({
    integer: true,
    positive: true,
    required: false,
    errorMessages: {
      integer: "L'ID du bloc doit être un nombre entier",
      positive: "L'ID du bloc doit être positif",
    },
  }),
  text_empty: new TextParameter({
    maxLength: 0,

    trim: true,
    type: "hidden",
    errorMessages: {
      maxLength: "Le titre ne peut pas dépasser 255 caractères",
      required: "Le titre est obligatoire",
    },
  }),

  color_background_color: new TextParameter({
    required: true,
    maxLength: 7,
    minLength: 7,
    type: "color",
    errorMessages: {
      required: "La couleur est obligatoire",
      minLength: "La couleur hexadécimale doit être hexadécimale",
      maxLength: "La couleur hexadécimale doit être hexadécimale",
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
  text_description: new TextParameter({
    maxLength: 500,
    required: false,
    trim: true,
    multiline: 3,
    placeholder: "Décrivez votre contenu...",
    errorMessages: {
      maxLength: "La description ne peut pas dépasser 500 caractères",
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
  image_image_url: new CloudinaryParameter({
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
