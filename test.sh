npm run buildserver
npm run build
mv testbuild/server.js build/server.js
pm2 delete server
pm2 start build/server.js --watch