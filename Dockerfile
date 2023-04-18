# /usr/src/nodejs/hello-docker/Dockerfile
FROM node:14.16.0

# 在容器中创建一个目录
RUN mkdir -p /usr/src/nodejs/
RUN mkdir -p /data/logs/app.log

# 定位到容器的工作目录
WORKDIR /usr/src/nodejs/

# RUN/COPY 是分层的，package.json 提前，只要没修改，就不会重新安装包
# COPY package.json /usr/src/nodejs/package.json
COPY package.json /usr/src/app/package.json
# RUN cd /usr/src/app/


# 把当前目录下的所有文件拷贝到 Image 的 /usr/src/nodejs/ 目录下
COPY . /usr/src/nodejs/

RUN npm config set registry https://registry.npmmirror.com
RUN npm i
ENV NODE_ENV=development
EXPOSE 3002:3002
CMD ["npm","start"]