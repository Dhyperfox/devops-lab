sudo docker run -d \
  --name devops-nginx \
  --network devops-network \
  -p 8080:80 \
  --mount type=bind,source=/media/sf_DevOpsProject,target=/usr/share/nginx/html,readonly \
  nginx:latest
