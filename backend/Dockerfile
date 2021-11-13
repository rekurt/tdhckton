FROM node:14
# App directory
WORKDIR /usr/src/app

# App dependencies
COPY package*.json ./
RUN npm i
#RUN npm run build

# Copy app source code
# COPY . .

# Env setup
#COPY .env.example .env

#Expose port and begin application
EXPOSE 900

# Start the app
CMD [ "npm", "run", "start:dev"]
