#!/bin/sh
echo [Enter to client folder]
cd apps/client
npm install

echo [Enter to api folder]
cd ../..
cd apps/api
npm install

echo [Generate prisma]
npm run prisma:generate

echo [Return to root]
cd ../..