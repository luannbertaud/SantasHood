FROM node:16.13.0-alpine
WORKDIR /app
COPY . .

ARG SERV_ENABLE_SSL
ENV SERV_ENABLE_SSL $SERV_ENABLE_SSL

RUN npm install
RUN npm install -g serve
RUN npm run build

EXPOSE 3000
CMD ["sh", "-c", "./run.sh"]