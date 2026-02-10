FROM node:20-alpine

RUN apk add --no-cache libc6-compat openssl

WORKDIR /cms

# Install tsx globally for Prisma seed (better than ts-node)
RUN npm install -g tsx

# Copy prisma schema first
COPY prisma ./prisma/

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci
# Copy rest of the app
COPY . .
RUN mkdir -p .next

RUN chmod -R 777 .next


EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "run", "dev"]