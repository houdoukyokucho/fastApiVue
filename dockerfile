FROM python:3.8
ENV PYTHONUNBUFFERED 1
RUN apt-get update && apt-get install -y \
    nodejs npm && npm install n -g && n 12.22.5 \
    tree \
    git
RUN mkdir /project
WORKDIR /project
ADD requirements.txt /project/
RUN pip install -r requirements.txt
ADD ./frontend/package*.json /project/frontend/
RUN npm --prefix frontend ci project/frontend
ADD . /project/
EXPOSE 8000