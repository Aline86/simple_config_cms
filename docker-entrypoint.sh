#!/bin/sh
set -e

echo "Waiting for PostgreSQL to be ready..."



echo "PostgreSQL is ready!"

echo "Generating Prisma client..."
npx prisma generate

echo "Running database migrations..."
npx prisma migrate deploy

echo "Seeding database..."
node prisma/seed.js

echo "Starting Next.js dev server..."
npm run dev
