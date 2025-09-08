# Build stage
FROM node:22-alpine AS builder

WORKDIR /src

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /src

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /src/dist ./dist

EXPOSE 3001

CMD ["npm", "start"]