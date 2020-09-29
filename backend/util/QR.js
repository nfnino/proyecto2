const QRCode = require('qrcode')

module.exports = {
    functionSave (path, obj) {
        const str = JSON.stringify(obj)
        QRCode.toFile(path, str, {
            color: {
                dark: '#000',
                light: '#FFF'
            },
            scale: 4,
            margin: 4 
        }, function(err) {
            if (err) throw err
            console.log("done")
        })
    }
}