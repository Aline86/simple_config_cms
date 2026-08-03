-- CreateTable
CREATE TABLE "configurations" (
    "number_id" SERIAL NOT NULL,
    "text_taille" VARCHAR(50) NOT NULL,
    "color_main_color" VARCHAR(25) NOT NULL,
    "text_police" VARCHAR(100) NOT NULL,
    "text_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text_updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "configurations_pkey" PRIMARY KEY ("number_id")
);
