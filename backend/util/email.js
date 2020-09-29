var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'envio.automatico.cmms@gmail.com',
      pass: 'Ln7Col20Sp-8'
    }
});

var mailOptions = {
    from: 'envio.automatico.cmms@gmail.com',
    to: '',
    subject: 'Materiales requeridos',
    html: ''
};

module.exports = {
    enviarEmailCompras(usuario, activo, destino, texto){
        mailOptions.to = destino+"";
        mailOptions.html = `<p>El usuario ${usuario} ha realizado la siguiente petición 
                            para una tarea de mantenimiento del activo ${activo}: </p>
                            <p>${texto}</p>` 

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });
    }
}