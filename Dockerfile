FROM resin/raspberrypi3-node:7.2.1
RUN apt-get update
RUN  apt-get clean
RUN apt-get install -y libbluetooth-dev
RUN apt-get install -y git

# use apt-get if you need to install dependencies,
# for instance if you need ALSA sound utils, just uncomment the lines below.
# RUN apt-get update && apt-get install -yq \
#    alsa-utils libasound2-dev && \
#    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set our working directory
WORKDIR /usr/src/app

# Copy requirements.txt first for better cache on later pushes
COPY ./l2ping l2ping
COPY ./l2ping/conf /etc/l2ping
WORKDIR /usr/src/app/l2ping

RUN npm install
CMD ["node", "index.js"]
