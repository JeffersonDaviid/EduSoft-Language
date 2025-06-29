import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
	service: 'gmail', // Puedes usar cualquier servicio de correo electrónico
	auth: {
		user: 'c99652451@gmail.com',
		pass: 'rttr jofk gczq oljm',
	},
});

 
