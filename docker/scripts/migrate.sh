echo [Migrate prisma dev]
docker-compose exec api /bin/sh -c "npm run prisma:migrate:dev;exit"