FROM gcr.io/deeplearning-platform-release/base-cpu
# FROM ubuntu:20.04


# RUN apt-get update \
#   && apt-get install -y python3-pip python3-dev \
#   && cd /usr/local/bin \
#   && ln -s /usr/bin/python3 python \
#   && pip3 install --upgrade pip

# COPY server_requirements.txt /app/server_requirements.txt
# RUN pip3 install -r /app/server_requirements.txt
# COPY requirements.txt /app/requirements.txt
# RUN pip3 install -r /app/requirements.txt



# COPY . /app

WORKDIR /app

CMD ["/bin/bash", "build.sh"]


