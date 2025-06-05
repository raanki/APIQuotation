FROM node:20

WORKDIR /app
COPY . .

ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}

RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
