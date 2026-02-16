FROM node:20

WORKDIR /cms

RUN npm install -g tsx

COPY prisma ./prisma/

COPY package.json package-lock.json* ./

RUN npm ci

RUN mkdir -p .next

RUN chmod -R 777 .next


EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "run", "dev"]


