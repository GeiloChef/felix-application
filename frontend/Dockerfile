FROM node:20-alpine AS builder

COPY package.json .

COPY package-lock.json .

RUN npm install --non-interactive

COPY . .

RUN npm run build-only --force --production

FROM rtsp/lighttpd

COPY --from=builder dist /var/www/html/

COPY router.conf /etc/lighttpd/conf.d