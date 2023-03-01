const pm2 = require('@tpp/pm2')

pm2.start({
    script: '/home/pi/nos-terminal/dist_electron/linux-armv7l-unpacked/nos-terminal',
})

console.log("asdf");
