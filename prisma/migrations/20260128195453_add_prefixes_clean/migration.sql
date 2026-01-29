-- CreateTable
CREATE TABLE "users" (
    "number_id" SERIAL NOT NULL,
    "text_email" TEXT NOT NULL,
    "text_password" TEXT NOT NULL,
    "text_name" TEXT,
    "text_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text_updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("number_id")
);

-- CreateTable
CREATE TABLE "pages" (
    "number_id" SERIAL NOT NULL,
    "number_parent_id" INTEGER,
    "checkbox_published" BOOLEAN NOT NULL DEFAULT false,
    "text_titre" VARCHAR(150) NOT NULL,
    "text_slug" VARCHAR(150) NOT NULL,
    "number_page_position" INTEGER NOT NULL,
    "text_langue" VARCHAR(10) NOT NULL,
    "blocs" TEXT NOT NULL,
    "text_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text_updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("number_id")
);

-- CreateTable
CREATE TABLE "headers" (
    "number_id" SERIAL NOT NULL,
    "number_page_id" INTEGER NOT NULL,
    "text_nom_site" VARCHAR(100),
    "text_background_url" TEXT,

    CONSTRAINT "headers_pkey" PRIMARY KEY ("number_id")
);

-- CreateTable
CREATE TABLE "footers" (
    "number_id" SERIAL NOT NULL,
    "number_page_id" INTEGER NOT NULL,
    "color_background_color" VARCHAR(20),
    "text_nom_site_adresse" VARCHAR(100),
    "text_adresse_footer" VARCHAR(255),
    "text_code_postal" VARCHAR(20),

    CONSTRAINT "footers_pkey" PRIMARY KEY ("number_id")
);

-- CreateTable
CREATE TABLE "medias" (
    "number_id" SERIAL NOT NULL,
    "text_titre" VARCHAR(255),
    "color_couleur_bg" VARCHAR(20),
    "text_image_lien" TEXT,
    "number_position_image" INTEGER,
    "image_url" TEXT NOT NULL,
    "number_header_logo_id" INTEGER,
    "number_header_favicon_id" INTEGER,
    "number_header_reseaux_id" INTEGER,
    "number_footer_id" INTEGER,

    CONSTRAINT "medias_pkey" PRIMARY KEY ("number_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_text_email_key" ON "users"("text_email");

-- CreateIndex
CREATE UNIQUE INDEX "pages_text_slug_key" ON "pages"("text_slug");

-- CreateIndex
CREATE INDEX "pages_number_parent_id_idx" ON "pages"("number_parent_id");

-- CreateIndex
CREATE INDEX "pages_text_slug_idx" ON "pages"("text_slug");

-- CreateIndex
CREATE UNIQUE INDEX "headers_number_page_id_key" ON "headers"("number_page_id");

-- CreateIndex
CREATE UNIQUE INDEX "footers_number_page_id_key" ON "footers"("number_page_id");

-- CreateIndex
CREATE UNIQUE INDEX "medias_number_header_logo_id_key" ON "medias"("number_header_logo_id");

-- CreateIndex
CREATE UNIQUE INDEX "medias_number_header_favicon_id_key" ON "medias"("number_header_favicon_id");

-- CreateIndex
CREATE INDEX "medias_number_header_reseaux_id_idx" ON "medias"("number_header_reseaux_id");

-- CreateIndex
CREATE INDEX "medias_number_footer_id_idx" ON "medias"("number_footer_id");

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_number_parent_id_fkey" FOREIGN KEY ("number_parent_id") REFERENCES "pages"("number_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "headers" ADD CONSTRAINT "headers_number_page_id_fkey" FOREIGN KEY ("number_page_id") REFERENCES "pages"("number_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footers" ADD CONSTRAINT "footers_number_page_id_fkey" FOREIGN KEY ("number_page_id") REFERENCES "pages"("number_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_number_footer_id_fkey" FOREIGN KEY ("number_footer_id") REFERENCES "footers"("number_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_number_header_favicon_id_fkey" FOREIGN KEY ("number_header_favicon_id") REFERENCES "headers"("number_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_number_header_logo_id_fkey" FOREIGN KEY ("number_header_logo_id") REFERENCES "headers"("number_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_number_header_reseaux_id_fkey" FOREIGN KEY ("number_header_reseaux_id") REFERENCES "headers"("number_id") ON DELETE CASCADE ON UPDATE CASCADE;
