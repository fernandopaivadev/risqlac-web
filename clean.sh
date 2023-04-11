APP_NAME="risqlac-web"

echo "==> START <=="

echo "==> stop container"
podman stop $APP_NAME

echo "==> prune containers"
podman container prune -f

echo "==> prune images"
podman image prune -f

echo "==> DONE <=="
