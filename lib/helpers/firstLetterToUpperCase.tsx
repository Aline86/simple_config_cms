export default function firstLetterToUperCase(
  fieldName: string,
  prefix: string,
) {
  // 1. retirer le préfixe s'il existe
  let name = fieldName.startsWith(prefix)
    ? fieldName.slice(prefix.length)
    : fieldName;

  // 2. remplacer les underscores par des espaces
  name = name.replace(/_/g, " ").trim();

  // 3. mettre la première lettre en majuscule
  if (name.length === 0) return "";
  return name[0].toUpperCase() + name.slice(1);
}
