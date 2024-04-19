import { FastifyRequest } from "fastify/types/request";
import nodemailer from "nodemailer";

export interface NodeMailerOptions {
  to: string;
  subject: string;
  html: string;
}

export type SendEmailInt = (
  options: NodeMailerOptions,
  request: FastifyRequest
) => Promise<string>;

export const sendEmail: SendEmailInt = async (
  options: NodeMailerOptions,
  request: FastifyRequest
) => {
  const { nodeMailerConfig } = request.server.diContainer.cradle;
  const transporter = nodemailer.createTransport({
    host: nodeMailerConfig.host,
    port: 587,
    secure: false, // true for 465, false for other ports
    tls: { rejectUnauthorized: false },
    auth: {
      user: nodeMailerConfig.user,
      pass: nodeMailerConfig.pass,
    },
  });

  const { to, subject, html } = options;
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });

  return `Message sent: %s ${info.messageId}`;
};

export default sendEmail;
