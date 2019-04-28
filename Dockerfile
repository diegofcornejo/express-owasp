FROM diegofcornejo/alpine-node-forever:latest
MAINTAINER Diego Cornejo <diegof.cornejo@gmail.com>

WORKDIR /app
COPY . .
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install
RUN npm rebuild bcrypt --build-from-source
CMD [ "npm", "run", "docker-dev", "--", "--no-orm" ]