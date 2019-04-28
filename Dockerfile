FROM diegofcornejo/alpine-node-forever:latest
MAINTAINER Diego Cornejo <diegof.cornejo@gmail.com>

WORKDIR /app
COPY . .
CMD [ "npm", "run", "docker-dev", "--", "--no-orm" ]