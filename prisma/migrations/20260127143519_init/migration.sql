-- CreateEnum
CREATE TYPE "TypeBloc" AS ENUM ('CAROUSEL', 'IMAGE_GROUPE', 'TEXTE', 'BUTTON', 'SCREEN', 'VIDEO');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "titre" VARCHAR(150) NOT NULL,
    "slug" VARCHAR(150) NOT NULL,
    "page_position" INTEGER NOT NULL,
    "langue" VARCHAR(4) NOT NULL,
    "blocs" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Header" (
    "id" SERIAL NOT NULL,
    "page_id" INTEGER NOT NULL,
    "nom_site" VARCHAR(55),
    "background_url" TEXT,

    CONSTRAINT "Header_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Footer" (
    "id" SERIAL NOT NULL,
    "page_id" INTEGER NOT NULL,
    "background_color" VARCHAR(15),
    "nom_site_adresse" VARCHAR(50),
    "adresse_footer" VARCHAR(255),
    "code_postal" VARCHAR(50),

    CONSTRAINT "Footer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "titre" VARCHAR(255),
    "couleur_bg" VARCHAR(15),
    "image_lien" TEXT,
    "position_image" INTEGER,
    "image_url" TEXT NOT NULL,
    "header_logo_id" INTEGER,
    "header_favicon_id" INTEGER,
    "header_reseaux_id" INTEGER,
    "footer_id" INTEGER,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- CreateIndex
CREATE INDEX "Page_parent_id_idx" ON "Page"("parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "Header_page_id_key" ON "Header"("page_id");

-- CreateIndex
CREATE UNIQUE INDEX "Footer_page_id_key" ON "Footer"("page_id");

-- CreateIndex
CREATE UNIQUE INDEX "Media_header_logo_id_key" ON "Media"("header_logo_id");

-- CreateIndex
CREATE UNIQUE INDEX "Media_header_favicon_id_key" ON "Media"("header_favicon_id");

-- CreateIndex
CREATE INDEX "Media_header_reseaux_id_idx" ON "Media"("header_reseaux_id");

-- CreateIndex
CREATE INDEX "Media_footer_id_idx" ON "Media"("footer_id");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Header" ADD CONSTRAINT "Header_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Footer" ADD CONSTRAINT "Footer_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_header_logo_id_fkey" FOREIGN KEY ("header_logo_id") REFERENCES "Header"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_header_favicon_id_fkey" FOREIGN KEY ("header_favicon_id") REFERENCES "Header"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_header_reseaux_id_fkey" FOREIGN KEY ("header_reseaux_id") REFERENCES "Header"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_footer_id_fkey" FOREIGN KEY ("footer_id") REFERENCES "Footer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
