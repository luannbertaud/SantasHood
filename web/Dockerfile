FROM node:16.13.0-alpine
WORKDIR /app
COPY . .

ARG SERV_ENABLE_SSL, SERV_URL
ENV SERV_ENABLE_SSL $SERV_ENABLE_SSL
ENV REACT_APP_SERV_URL $SERV_URL

RUN npm clean-install
RUN npm install -g serve
RUN npm run build

EXPOSE 3000
CMD ["sh", "-c", "./run.sh"]