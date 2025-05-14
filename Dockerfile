##Stage 1 - Build

# Base on offical Node.js Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/app

# Copy package.json, tsconfig.json and ormconfig.js before other files
COPY package*.json ./

# Copy source files
COPY . .

# Installing pm2 globally
RUN npm install pm2 -g

RUN npm install -g rimraf

#Installing typescript globally
RUN npm i typescript -g

RUN npm i -g @nestjs/cli

# Install dependencies
RUN npm install

# Setting environment variables
ENV HOST 0.0.0.0
ENV PORT 5000
# Expose the listening port
EXPOSE 5000

# RUN npm run migrate:run

# Transpiling the typescript solution
RUN npm run build

# Copying dist folder into root
#COPY ./ ./

# Run npm start script starts
CMD [ "node", "./dist/main.js" ]