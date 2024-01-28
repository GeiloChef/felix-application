FROM node:20-alpine AS builder

COPY package.json .

RUN npm install --non-interactive

COPY . .

RUN npm build-only --force

FROM sebp/lighttpd

COPY --from=builder dist /var/www/localhost/htdocs