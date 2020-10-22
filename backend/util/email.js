var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "envio.automatico.cmms@gmail.com", 
      pass: "Ln7Col20Sp-8", 
    },
  });

let mailOptions = {
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