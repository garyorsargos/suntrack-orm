FROM node:20-bullseye

WORKDIR /app

# Install OpenSSL 1.1.x
RUN apt-get update && \
    apt-get install -y openssl=1.1.* && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

COPY . .

# Generate Prisma Client
RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"] 