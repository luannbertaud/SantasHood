FROM python:3.8
WORKDIR /app
COPY . .

RUN pip3 install -r requirements.txt --disable-pip-version-check

ARG SERV_URL SERV_ENABLE_SSL JWT_SECRET JWT_VALIDITY_DELTA SERV_ENCRYPT_KEY POSTGRES_PASSWORD POSTGRES_USER POSTGRES_PORT POSTGRES_HOST POSTGRES_DB_NAME
ENV SERV_URL $SERV_URL
ENV SERV_ENABLE_SSL $SERV_ENABLE_SSL
ENV JWT_SECRET $JWT_SECRET
ENV JWT_VALIDITY_DELTA $JWT_VALIDITY_DELTA
ENV SERV_ENCRYPT_KEY $SERV_ENCRYPT_KEY
ENV POSTGRES_PASSWORD $POSTGRES_PASSWORD
ENV POSTGRES_USER $POSTGRES_USER
ENV POSTGRES_PORT $POSTGRES_PORT
ENV POSTGRES_HOST $POSTGRES_HOST
ENV POSTGRES_DB_NAME $POSTGRES_DB_NAME

ENV PYTHONUNBUFFERED=1
ENV FLASK_APP="/app/app:app"
EXPOSE 5000

CMD ["bash", "-c", "./run.sh"]