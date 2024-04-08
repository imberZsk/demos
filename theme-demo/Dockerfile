FROM node:18-alpine
# 这个指令的意思就是简单粗暴的将当前目录的所有文件拷贝到 /app下
WORKDIR /app
COPY . .
RUN npm install --registry=https://registry.npmmirror.com && npm run build
CMD npm start
EXPOSE 3000