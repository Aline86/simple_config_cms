const folder = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
export const isPdfUrl = (url: string) => {
  return url.toLowerCase().split("?")[0].endsWith(".pdf");
};

export const extractPublicId = (url: string) => {
  const regex = /\/upload\/(?:v\d+\/)?(.+?)(\.[a-zA-Z0-9]+)?$/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
export const convertToFirstPage = (url: string) => {
  const parsed = new URL(url);
  parsed.pathname = parsed.pathname.replace("/upload/", "/upload/pg_1,f_jpg/");
  return parsed.toString();
};

export const getOriginalPdfUrl = (publicId: string) => {
  return `https://res.cloudinary.com/${folder}/image/upload/${publicId}.pdf`;
};
