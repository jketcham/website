# builder web assets
from node:8-alpine

WORKDIR /usr/src/app

COPY ./web /usr/src/app

RUN npm install

RUN ./node_modules/.bin/webpack

# build server
from python:3.6.1-alpine

WORKDIR /usr/src/app

COPY ./requirements.txt /usr/src/app
COPY ./gunicorn.py /usr/src/app/gunicorn.py
COPY ./website /usr/src/app/website
COPY ./config /usr/src/app/config

# include web assets
COPY --from=0 /usr/src/app/dist /usr/src/app/website/static/html

# install additional deps on top of alpine required by bcrypt and Pillow (jpeg-dev)
# TODO: remove these deps after bcrypt installed to create smaller image
RUN apk add --no-cache gcc libffi libffi-dev libc-dev openssl-dev jpeg-dev

RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

ENV ENV=dev

EXPOSE 8000

CMD ["/usr/local/bin/gunicorn", "--config=gunicorn.py", "website.app:get_app()"]
