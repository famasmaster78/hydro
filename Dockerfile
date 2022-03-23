
# Hvilket image skal denne docker baseres på
FROM node:17

# Hvor arbejder denne docker i
WORKDIR /app

# Kopier package.json til Docker maskinen
COPY package*.json ./

# Kør kommando
RUN yarn

# Kopier source filer
COPY . .

# Sæt environvent variable til hvor denne skal hostes
ENV HOST_PORT=3000

# Hvilken port skal offentliggøres / være tilgængelig for omverdenen
EXPOSE 3000

# Start kommando
CMD ["yarn", "start"]