FROM node:16.17.0

# 将根目录下的文件都copy到container（运行此镜像的容器）文件系统的app文件夹下
ADD . /app/
# cd到app文件夹下
WORKDIR /app
# 安装项目依赖包
RUN  npm install -g pnpm rollup && pnpm i --force
# 配置环境变量
ENV APP_ENV production \
    REDIS_CONFIG_PORT 6379 \
    REDIS_CONFIG_HOST 172.16.39.136 \
    REDIS_CONFIG_USER default \
    REDIS_CONFIG_PWD ph123456 \
    MYSQL_CONFIG_PORT 3306 \
    MYSQL_CONFIG_HOST 172.16.39.136 \
    MYSQL_CONFIG_USER root \
    MYSQL_CONFIG_PWD 123456 \
    MYSQL_CONFIG_DB nodeapp \
# 容器对外暴露的端口号
EXPOSE 3000
# 容器启动时执行的命令
RUN npm run build
CMD ["node", "dist/bundle.js"]
# CMD ["npm", "start"]