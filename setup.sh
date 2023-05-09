#!/usr/bin/env bash
image_version=`date +%Y%m%d%H%M`;
# node_app
docker stop node_app || true;
# node_app
docker rm node_app || true;
# 删除node_app镜像
docker rmi --force $(docker images | grep node_app | awk '{print $3}')
# 构建node_app:$image_version镜像
docker build . -t node_app:$image_version;
# 查看镜像列表
docker images;

# 打tag
# docker tag node_app:$image_version /tag node_app:$image_version
echo '启动'
# 基于node_app 镜像 构建一个容器 node_app
docker run -p 9423:3000 --restart=always -d --name node_app node_app:$image_version;
# 查看日志
docker logs node_app;
# 删除build过程中产生的镜像    #docker image prune -a -f
# docker rmi $(docker images -f "dangling=true" -q)
# 对空间进行自动清理
docker system prune -f
# docker system prune -a -f