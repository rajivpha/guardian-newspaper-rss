FROM node:16.5.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY . .

# Install Nest.js dependencies
RUN npm install --legacy-peer-deps

RUN npm run build

# Expose the port that the Nest.js application will run on (if needed)
EXPOSE 3001

# Set environment variables (RabbitMQ connection info)
ENV NODE_ENV development
ENV TZ=Asia/Kathmandu
ENV DB_HOST=localhost
ENV DB_PORT=3306
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=postgres
ENV DB_DATABASE=nestdb

ENV REDIS_HOST=localhost
ENV REDIS_PORT=6379

ENV JWT_SECRET=make-one

ENV GUARDIAN_BASEURL=https://content.guardianapis.com
ENV GUARDIAN_API_KEY=test

# Define the command to run your Nest.js application

CMD ["npm", "run", "start"]