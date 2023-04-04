APP_NAME="risqlac-web"
PORT=3000

echo "==> START <=="

echo "==> git pull"
git pull

echo "==> stop container"
podman stop $APP_NAME

echo "==> prune containers"
podman container prune -f

echo "==> prune images"
podman image prune -f

echo "==> build image"
podman build -t $APP_NAME .

echo "==> run image"
podman run -d --name $APP_NAME -p 3000:$PORT $APP_NAME

echo "==> DONE <=="
