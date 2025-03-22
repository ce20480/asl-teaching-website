FROM node:18-slim

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
# Use tsc-alias to transform path aliases in the compiled code
RUN npx tsc-alias

CMD ["npm", "start"] 