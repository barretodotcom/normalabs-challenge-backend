import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "af11ed3cc64d7f",
        pass: "dcbd88a2cc092d"
    },
});

export async function sendTaskRemovingMessage(reason: string, email: string) {

    const mailSent = await transport.sendMail({
        text: `Olá! Você acaba de deletar sua tarefa, o motivo enviado foi o seguinte : ${reason}`,
        subject: "Exclusão de tarefa",
        from: `Norma Labs <${process.env.MAIN_EMAIL}>`,
        to: email
    })
}