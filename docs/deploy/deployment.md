# How to deploy the CMS in production with a free hosting plan?

This guide covers deploying the CMS using **Neon** (free PostgreSQL), **Cloudinary** (free media hosting), and **Netlify** (free app hosting) — all on free tiers.

---

## Prerequisites

- A local environment with **Node.js 20+**
- A free account on [Neon](https://neon.com) (PostgreSQL database)
- A free account on [Cloudinary](https://console.cloudinary.com) (media storage)
- A free account on [Netlify](https://app.netlify.com) (hosting)
- A GitHub repository with the project pushed to it

---

## Step 1 — Clone and install the project

```bash
git clone https://github.com/Aline86/simple_config_cms.git
cd simple_config_cms
npm install
```

> Allow a few minutes for dependencies to install.

---

## Step 2 — Configure environment variables

Create a `.env` file at the root of the project with the following variables:

```env
NEXT_PUBLIC_APP_URL=https://your-production-url.netlify.app

JWT_SECRET=a_random_secret_string_only_you_know

# Cloudinary — see Step 3 below
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER=

# Neon — see Step 4 below
DATABASE_URL=
```

---

## Step 3 — Set up Cloudinary

1. Go to [https://console.cloudinary.com](https://console.cloudinary.com) and create a free account.
2. Retrieve your API credentials: click the **gear icon → API Keys → Generate New API Key**.

![Cloudinary API Keys](../cloudinary_api_key.png)

3. Fill in the following variables in your `.env`:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER`

4. Create an **unsigned preset** to enable the Cloudinary image picker used in the app:

![Cloudinary unsigned preset](../unigned_preset.png)

![Cloudinary picker](../cloudinary_picker.png)

---

## Step 4 — Set up Neon (PostgreSQL)

1. Go to [https://neon.com](https://neon.com) and create a new project.
2. Click on your newly created database → **Dashboard** → **Connect**.
3. Copy the connection URL (with the plain-text password) and set it as the value of `DATABASE_URL` in your `.env`.

4. Run the following Prisma commands from your local environment to push the schema to your Neon database:

```bash
npx prisma generate
npx prisma migrate dev
```

---

## Step 5 — Create the first admin user

For security reasons, there is no automated seed script for production. You need to manually create your user with a hashed password.

A `hash.js` file is already available at the root of the project. Run the following command, replacing `yourPassword123` with your chosen password:

```bash
node hash.js yourPassword123
```

Copy the output hash, then go to your **Neon dashboard → Tables → User** and insert a new row with:

- your email address
- your hashed password (the output from the command above)
- any other required fields for your site

> ⚠️ Do not commit the `hash.js` file or your `.env` file to your repository.

---

## Step 6 — Deploy to Netlify

1. Push your project to a GitHub repository.
2. Go to [https://app.netlify.com](https://app.netlify.com) and click **Add new project → Import an existing project → GitHub**.
3. Select your repository.
4. In the **Build Command** field, enter:

```bash
npx prisma generate --schema=prisma/schema.prisma && next build
```

5. Add all your `.env` variables in the **Environment Variables** section.
6. Leave all other settings as default and click **Deploy**.

> To update environment variables later: **Project Configuration → Environment Variables**.

7. Once deployed, go to **Deploys → Trigger Deploy** to redeploy manually if needed.

---

## Summary

| Service                              | Purpose                      | Free tier |
| ------------------------------------ | ---------------------------- | --------- |
| [Neon](https://neon.com)             | PostgreSQL database          | ✅ Yes    |
| [Cloudinary](https://cloudinary.com) | Media storage & optimization | ✅ Yes    |
| [Netlify](https://netlify.com)       | App hosting                  | ✅ Yes    |
