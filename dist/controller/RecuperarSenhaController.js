"use strict";
// import { HttpStatus, Injectable } from '@nestjs/common';
// import { GestanteService } from 'src/gestante/gestante.service';
// import { PrismaService } from 'src/prisma/prisma.service';
// import * as nodemailer from 'nodemailer';
// import * as bcrypt from 'bcrypt';
// import { ClinicaService } from 'src/clinica/clinica.service';
// interface Gestante {
//   id: number;
//   nome: string;
//   cpf: string;
//   dataNascimento: string;
//   foto: string;
//   email: string;
//   senha: string;
//   idGenero: number;
// }
// interface Clinica {
//   id: number;
//   nome: string;
//   cpf: string;
//   dataNascimento: string;
//   foto: string;
//   email: string;
//   senha: string;
// }
// @Injectable()
// export class RedefinirSenhaService {
//   constructor(
//     private readonly prismaService: PrismaService,
//     private readonly gestanteService: GestanteService,
//     private readonly clinicaService: ClinicaService
//   ) { }
//   private tokenCache: { token: number };
//   gerarNumeroAleatorio() {
//     const token = Math.floor(Math.random() * 9000) + 1000;
//     this.tokenCache = {
//       token: token,
//     };
//     return token;
//   }
//   async enviarTokenPorEmailGestante(email: string): Promise<{}> {
//     let message = {}
//     const gestanteValidation = await this.gestanteService.findEmail(email);
//     if (gestanteValidation) {
//       const token = this.gerarNumeroAleatorio();
//       let htmlEmail = `
//       <!DOCTYPE html>
//         <html>
//         <head>
//             <meta charset="UTF-8">
//             <title>E-mail de Redefinição de Senha</title>
//         </head>
//         <body style="height: 100vh; margin: 0; padding: 0;  font-family: Arial, sans-serif; background-color: #f3f3f3;">
//             <table border="0" cellpadding="0" cellspacing="0" width="100%">
//                 <tr>
//                     <td style="text-align: center;">
//                         <!-- Nome e Logo -->
//                         <table align="center" cellpadding="0" cellspacing="0" width="600">
//                             <tr>
//                                 <td align="center" valign="top" style="padding: 20px 0;">
//                                     <img src="https://encurtador.com.br/gktK6" alt="Logo da Empresa" width="150">
//                                     <h1 style="color: #b6b6f6;">Bebê-Vindo</h1>
//                                 </td>
//                             </tr>
//                         </table>
//                         <!-- Bloco com Cantos Arredondados -->
//                         <table align="center" cellpadding="0" cellspacing="0" width="600" style="height: 40vh; background-color: #ffffff; border-radius: 10px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);">
//                             <tr>
//                                 <td style="vertical-align: top;" align="top">
//                                     <div style="border-radius: 10px 10px 0px 0px ; background-image: url('https://encurtador.com.br/zOX19'); background-repeat: no-repeat; background-size: 100%; background-position: top; position: relative; align-items: center; justify-content: center;">
//                                         <table align="center" cellpadding="0" cellspacing="0" width="600" style="height: 60%;">
//                                             <tr>
//                                                 <td align="center" >
//                                                     <div style="height: 100%;">
//                                                         <h2 style="font-size: 2rem; color: #fff; width: 100%;  ">Recuperação de Senha</h2>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         </table>
//                                     </div>
//                                     <div>
//                                         <table cellpadding="0" cellspacing="0" width="600" style="height: 60%;">
//                                             <tr>
//                                                 <td align="left">
//                                                     <div style="padding-left: 5%; padding-top:2%; height: 100%; padding-bottom:5%;">
//                                                         <h2 style="font-size: 1rem; color: #464444; width: 100%;">
//                                                             Olá!
//                                                         </h2>
//                                                         <p style="font-size: 0.9rem; color: #464444; width: 60%;">
//                                                             Aqui está o seu token de redefinição de senha:
//                                                         </p>
//                                                         <h3 style="font-size: 1.5rem; color: #b6b6f6;">
//                                                             ${token}
//                                                         </h3>
//                                                         <p style="font-size: 0.9rem; color: #464444; width:80%">
//                                                             O token é válido por um curto período de tempo, portanto, 
//                                                             recomendamos que você o utilize imediatamente.
//                                                         </p>
//                                                         <p style="font-size: 0.9rem; color: #464444; width:80%">
//                                                             Se você não solicitou a redefinição de senha, por favor, 
//                                                             entre em contato conosco imediatamente através do e-mail: SEU_EMAIL_DE_SUPORTE
//                                                         </p>
//                                                         <h3 style="font-size: 1rem; color: #464444;">
//                                                             Obrigado,
//                                                         </h3>
//                                                         <h3 style="font-size:1.2rem; color: #b6b6f6;">
//                                                             Equipe BebêVindo.
//                                                         </h3>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         </table>
//                                     </div>
//                                 </td>
//                             </tr>
//                         </table>
//                     </td>
//                 </tr>
//             </table>
//         </body>
//     </html>
//     `
//       const transporter = nodemailer.createTransport({
//         service: 'Gmail', // ou qualquer outro serviço de e-mail
//         auth: {
//           user: `kaue.lima@uxgroup.com.br`,
//           pass: '301906Ka.',
//         },
//       });
//       const mailOptions = {
//         from: 'kaue.lima@uxgroup.com.br',
//         to: email,
//         subject: 'Redefinição de Senha - Conta Bebê-Vindo',
//         text: `Seu código de redefinição de senha: ${token}`,
//         html: `${htmlEmail}`
//       };
//       await transporter.sendMail(mailOptions);
//       message = {
//         result: 'E-mail enviado com sucesso'
//       }
//     } else {
//       message = {
//         result: 'Não foi possível enviar o E-mail'
//       }
//     }
//     return message
//   }
//   async validarTokenGestante(email: string, token: number) {
//     const user = await this.gestanteService.findEmail(email);
//     let message = false
//     if (user) {
//       if (token == this.tokenCache.token) {
//         message = true
//       }
//     } else {
//       return message
//     }
//     return message
//   }
//   async redefinirSenhaGestante(
//     email: string,
//     token: number,
//     novaSenha: string,
//   ): Promise<{}> {
//     const validaToken = await this.validarTokenGestante(email, token);
//     let message = {}
//     if (validaToken === true) {
//       const queryUser = `select * from tbl_gestante where email = '${email}'`;
//       const result: Gestante = await this.prismaService.$queryRawUnsafe(
//         queryUser,
//       );
//       if (result[0]) {
//         const idUser = result[0].id;
//         const novaSenhaa = await bcrypt.hash(novaSenha, 10);
//         const queryResetPassword = `update tbl_gestante set senha = '${novaSenhaa}' where id = ${idUser};`;
//         const resultRedefine = await this.prismaService.$queryRawUnsafe(
//           queryResetPassword,
//         );
//         if (resultRedefine) {
//           console.log('aqui');
//           message = {
//             message: 'Sua senha foi redefinida com sucesso;'
//           }
//         }
//       } else {
//         message = {
//           message: 'Não foi possível redefinir sua senha:;'
//         }
//       }
//       delete this.tokenCache[email];
//     } else {
//       message = 'Token inválido;'
//     }
//     return message
//   }
//   async enviarTokenPorEmailClinica(email: string): Promise<{}> {
//     const clinicaValidation = await this.clinicaService.findEmail(email);
//     let message = {}
//     if (clinicaValidation) {
//       const token = this.gerarNumeroAleatorio();
//       let htmlEmail = `
//       <!DOCTYPE html>
//         <html>
//         <head>
//             <meta charset="UTF-8">
//             <title>E-mail de Redefinição de Senha</title>
//         </head>
//         <body style="height: 100vh; margin: 0; padding: 0;  font-family: Arial, sans-serif; background-color: #f3f3f3;">
//             <table border="0" cellpadding="0" cellspacing="0" width="100%">
//                 <tr>
//                     <td style="text-align: center;">
//                         <!-- Nome e Logo -->
//                         <table align="center" cellpadding="0" cellspacing="0" width="600">
//                             <tr>
//                                 <td align="center" valign="top" style="padding: 20px 0;">
//                                     <img src="https://encurtador.com.br/gktK6" alt="Logo da Empresa" width="150">
//                                     <h1 style="color: #b6b6f6;">Bebê-Vindo</h1>
//                                 </td>
//                             </tr>
//                         </table>
//                         <!-- Bloco com Cantos Arredondados -->
//                         <table align="center" cellpadding="0" cellspacing="0" width="600" style="height: 40vh; background-color: #ffffff; border-radius: 10px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);">
//                             <tr>
//                                 <td style="vertical-align: top;" align="top">
//                                     <div style="border-radius: 10px 10px 0px 0px ; background-image: url('https://encurtador.com.br/zOX19'); background-repeat: no-repeat; background-size: 100%; background-position: top; position: relative; align-items: center; justify-content: center;">
//                                         <table align="center" cellpadding="0" cellspacing="0" width="600" style="height: 60%;">
//                                             <tr>
//                                                 <td align="center" >
//                                                     <div style="height: 100%;">
//                                                         <h2 style="font-size: 2rem; color: #fff; width: 100%;  ">Recuperação de Senha</h2>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         </table>
//                                     </div>
//                                     <div>
//                                         <table cellpadding="0" cellspacing="0" width="600" style="height: 60%;">
//                                             <tr>
//                                                 <td align="left">
//                                                     <div style="padding-left: 5%; padding-top:2%; height: 100%; padding-bottom:5%;">
//                                                         <h2 style="font-size: 1rem; color: #464444; width: 100%;">
//                                                             Olá!
//                                                         </h2>
//                                                         <p style="font-size: 0.9rem; color: #464444; width: 60%;">
//                                                             Aqui está o seu token de redefinição de senha:
//                                                         </p>
//                                                         <h3 style="font-size: 1.5rem; color: #b6b6f6;">
//                                                             ${token}
//                                                         </h3>
//                                                         <p style="font-size: 0.9rem; color: #464444; width:80%">
//                                                             O token é válido por um curto período de tempo, portanto, 
//                                                             recomendamos que você o utilize imediatamente.
//                                                         </p>
//                                                         <p style="font-size: 0.9rem; color: #464444; width:80%">
//                                                             Se você não solicitou a redefinição de senha, por favor, 
//                                                             entre em contato conosco imediatamente através do e-mail: SEU_EMAIL_DE_SUPORTE
//                                                         </p>
//                                                         <h3 style="font-size: 1rem; color: #464444;">
//                                                             Obrigado,
//                                                         </h3>
//                                                         <h3 style="font-size:1.2rem; color: #b6b6f6;">
//                                                             Equipe BebêVindo.
//                                                         </h3>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         </table>
//                                     </div>
//                                 </td>
//                             </tr>
//                         </table>
//                     </td>
//                 </tr>
//             </table>
//         </body>
//     </html>
//     `
//       const transporter = nodemailer.createTransport({
//         service: 'Gmail', // ou qualquer outro serviço de e-mail
//         auth: {
//           user: `bebevindo007@gmail.com`,
//           pass: 'BebeVindo123.',
//         },
//       });
//       const mailOptions = {
//         from: 'bebevindo007@gmail.com',
//         to: email,
//         subject: 'Redefinição de Senha - Conta Bebê-Vindo',
//         text: `Seu código de redefinição de senha: ${token}`,
//         html: `${htmlEmail}`
//       };
//       await transporter.sendMail(mailOptions);
//       message = {
//         result: 'E-mail enviado com sucesso'
//       }
//     } else {
//       message = {
//         result: 'Não foi possivel enviar o E-mail:'
//       }
//     }
//     return message
//   }
//   async validarTokenClinica(email: string, token: number) {
//     const user = await this.clinicaService.findEmail(email);
//     let message = false
//     if (user) {
//       if (token == this.tokenCache.token) {
//         message = true
//       }
//     } else {
//       return message
//     }
//     return message
//   }
//   async redefinirSenhaClinica(
//     email: string,
//     token: number,
//     novaSenha: string,
//   ): Promise<{}> {
//     const validaToken = await this.validarTokenClinica(email, token);
//     let message = {}
//     if (validaToken === true) {
//       const queryUser = `select * from tbl_clinica where email = '${email}'`;
//       const result: Clinica = await this.prismaService.$queryRawUnsafe(
//         queryUser,
//       );
//       if (result[0]) {
//         const idUser = result[0].id;
//         const novaSenhaa = await bcrypt.hash(novaSenha, 10);
//         const queryResetPassword = `update tbl_clinica set senha = '${novaSenhaa}' where id = ${idUser};`;
//         const resultRedefine = await this.prismaService.$queryRawUnsafe(
//           queryResetPassword,
//         );
//         if (resultRedefine) {
//           message = {
//             message: 'Sua senha foi redefinida com sucesso;'
//           }
//         }
//       } else {
//         message = {
//           message: 'Não foi possível redefinir sua senha:;'
//         }
//       }
//       delete this.tokenCache[email];
//     } else {
//       message = {
//         message: 'Token inválido;'
//       }
//     }
//     return message
//   }
// }import { HttpStatus, Injectable } from '@nestjs/common';
// import { GestanteService } from 'src/gestante/gestante.service';
// import { PrismaService } from 'src/prisma/prisma.service';
// import * as nodemailer from 'nodemailer';
// import * as bcrypt from 'bcrypt';
// import { ClinicaService } from 'src/clinica/clinica.service';
// interface Gestante {
//   id: number;
//   nome: string;
//   cpf: string;
//   dataNascimento: string;
//   foto: string;
//   email: string;
//   senha: string;
//   idGenero: number;
// }
// interface Clinica {
//   id: number;
//   nome: string;
//   cpf: string;
//   dataNascimento: string;
//   foto: string;
//   email: string;
//   senha: string;
// }
// @Injectable()
// export class RedefinirSenhaService {
//   constructor(
//     private readonly prismaService: PrismaService,
//     private readonly gestanteService: GestanteService,
//     private readonly clinicaService: ClinicaService
//   ) { }
//   private tokenCache: { token: number };
//   gerarNumeroAleatorio() {
//     const token = Math.floor(Math.random() * 9000) + 1000;
//     this.tokenCache = {
//       token: token,
//     };
//     return token;
//   }
//   async enviarTokenPorEmailGestante(email: string): Promise<{}> {
//     let message = {}
//     const gestanteValidation = await this.gestanteService.findEmail(email);
//     if (gestanteValidation) {
//       const token = this.gerarNumeroAleatorio();
//       let htmlEmail = `
//       <!DOCTYPE html>
//         <html>
//         <head>
//             <meta charset="UTF-8">
//             <title>E-mail de Redefinição de Senha</title>
//         </head>
//         <body style="height: 100vh; margin: 0; padding: 0;  font-family: Arial, sans-serif; background-color: #f3f3f3;">
//             <table border="0" cellpadding="0" cellspacing="0" width="100%">
//                 <tr>
//                     <td style="text-align: center;">
//                         <!-- Nome e Logo -->
//                         <table align="center" cellpadding="0" cellspacing="0" width="600">
//                             <tr>
//                                 <td align="center" valign="top" style="padding: 20px 0;">
//                                     <img src="https://encurtador.com.br/gktK6" alt="Logo da Empresa" width="150">
//                                     <h1 style="color: #b6b6f6;">Bebê-Vindo</h1>
//                                 </td>
//                             </tr>
//                         </table>
//                         <!-- Bloco com Cantos Arredondados -->
//                         <table align="center" cellpadding="0" cellspacing="0" width="600" style="height: 40vh; background-color: #ffffff; border-radius: 10px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);">
//                             <tr>
//                                 <td style="vertical-align: top;" align="top">
//                                     <div style="border-radius: 10px 10px 0px 0px ; background-image: url('https://encurtador.com.br/zOX19'); background-repeat: no-repeat; background-size: 100%; background-position: top; position: relative; align-items: center; justify-content: center;">
//                                         <table align="center" cellpadding="0" cellspacing="0" width="600" style="height: 60%;">
//                                             <tr>
//                                                 <td align="center" >
//                                                     <div style="height: 100%;">
//                                                         <h2 style="font-size: 2rem; color: #fff; width: 100%;  ">Recuperação de Senha</h2>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         </table>
//                                     </div>
//                                     <div>
//                                         <table cellpadding="0" cellspacing="0" width="600" style="height: 60%;">
//                                             <tr>
//                                                 <td align="left">
//                                                     <div style="padding-left: 5%; padding-top:2%; height: 100%; padding-bottom:5%;">
//                                                         <h2 style="font-size: 1rem; color: #464444; width: 100%;">
//                                                             Olá!
//                                                         </h2>
//                                                         <p style="font-size: 0.9rem; color: #464444; width: 60%;">
//                                                             Aqui está o seu token de redefinição de senha:
//                                                         </p>
//                                                         <h3 style="font-size: 1.5rem; color: #b6b6f6;">
//                                                             ${token}
//                                                         </h3>
//                                                         <p style="font-size: 0.9rem; color: #464444; width:80%">
//                                                             O token é válido por um curto período de tempo, portanto, 
//                                                             recomendamos que você o utilize imediatamente.
//                                                         </p>
//                                                         <p style="font-size: 0.9rem; color: #464444; width:80%">
//                                                             Se você não solicitou a redefinição de senha, por favor, 
//                                                             entre em contato conosco imediatamente através do e-mail: SEU_EMAIL_DE_SUPORTE
//                                                         </p>
//                                                         <h3 style="font-size: 1rem; color: #464444;">
//                                                             Obrigado,
//                                                         </h3>
//                                                         <h3 style="font-size:1.2rem; color: #b6b6f6;">
//                                                             Equipe BebêVindo.
//                                                         </h3>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         </table>
//                                     </div>
//                                 </td>
//                             </tr>
//                         </table>
//                     </td>
//                 </tr>
//             </table>
//         </body>
//     </html>
//     `
//       const transporter = nodemailer.createTransport({
//         service: 'Gmail', // ou qualquer outro serviço de e-mail
//         auth: {
//           user: `kaue.lima@uxgroup.com.br`,
//           pass: '301906Ka.',
//         },
//       });
//       const mailOptions = {
//         from: 'kaue.lima@uxgroup.com.br',
//         to: email,
//         subject: 'Redefinição de Senha - Conta Bebê-Vindo',
//         text: `Seu código de redefinição de senha: ${token}`,
//         html: `${htmlEmail}`
//       };
//       await transporter.sendMail(mailOptions);
//       message = {
//         result: 'E-mail enviado com sucesso'
//       }
//     } else {
//       message = {
//         result: 'Não foi possível enviar o E-mail'
//       }
//     }
//     return message
//   }
//   async validarTokenGestante(email: string, token: number) {
//     const user = await this.gestanteService.findEmail(email);
//     let message = false
//     if (user) {
//       if (token == this.tokenCache.token) {
//         message = true
//       }
//     } else {
//       return message
//     }
//     return message
//   }
//   async redefinirSenhaGestante(
//     email: string,
//     token: number,
//     novaSenha: string,
//   ): Promise<{}> {
//     const validaToken = await this.validarTokenGestante(email, token);
//     let message = {}
//     if (validaToken === true) {
//       const queryUser = `select * from tbl_gestante where email = '${email}'`;
//       const result: Gestante = await this.prismaService.$queryRawUnsafe(
//         queryUser,
//       );
//       if (result[0]) {
//         const idUser = result[0].id;
//         const novaSenhaa = await bcrypt.hash(novaSenha, 10);
//         const queryResetPassword = `update tbl_gestante set senha = '${novaSenhaa}' where id = ${idUser};`;
//         const resultRedefine = await this.prismaService.$queryRawUnsafe(
//           queryResetPassword,
//         );
//         if (resultRedefine) {
//           console.log('aqui');
//           message = {
//             message: 'Sua senha foi redefinida com sucesso;'
//           }
//         }
//       } else {
//         message = {
//           message: 'Não foi possível redefinir sua senha:;'
//         }
//       }
//       delete this.tokenCache[email];
//     } else {
//       message = 'Token inválido;'
//     }
//     return message
//   }
//   async enviarTokenPorEmailClinica(email: string): Promise<{}> {
//     const clinicaValidation = await this.clinicaService.findEmail(email);
//     let message = {}
//     if (clinicaValidation) {
//       const token = this.gerarNumeroAleatorio();
//       let htmlEmail = `
//       <!DOCTYPE html>
//         <html>
//         <head>
//             <meta charset="UTF-8">
//             <title>E-mail de Redefinição de Senha</title>
//         </head>
//         <body style="height: 100vh; margin: 0; padding: 0;  font-family: Arial, sans-serif; background-color: #f3f3f3;">
//             <table border="0" cellpadding="0" cellspacing="0" width="100%">
//                 <tr>
//                     <td style="text-align: center;">
//                         <!-- Nome e Logo -->
//                         <table align="center" cellpadding="0" cellspacing="0" width="600">
//                             <tr>
//                                 <td align="center" valign="top" style="padding: 20px 0;">
//                                     <img src="https://encurtador.com.br/gktK6" alt="Logo da Empresa" width="150">
//                                     <h1 style="color: #b6b6f6;">Bebê-Vindo</h1>
//                                 </td>
//                             </tr>
//                         </table>
//                         <!-- Bloco com Cantos Arredondados -->
//                         <table align="center" cellpadding="0" cellspacing="0" width="600" style="height: 40vh; background-color: #ffffff; border-radius: 10px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);">
//                             <tr>
//                                 <td style="vertical-align: top;" align="top">
//                                     <div style="border-radius: 10px 10px 0px 0px ; background-image: url('https://encurtador.com.br/zOX19'); background-repeat: no-repeat; background-size: 100%; background-position: top; position: relative; align-items: center; justify-content: center;">
//                                         <table align="center" cellpadding="0" cellspacing="0" width="600" style="height: 60%;">
//                                             <tr>
//                                                 <td align="center" >
//                                                     <div style="height: 100%;">
//                                                         <h2 style="font-size: 2rem; color: #fff; width: 100%;  ">Recuperação de Senha</h2>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         </table>
//                                     </div>
//                                     <div>
//                                         <table cellpadding="0" cellspacing="0" width="600" style="height: 60%;">
//                                             <tr>
//                                                 <td align="left">
//                                                     <div style="padding-left: 5%; padding-top:2%; height: 100%; padding-bottom:5%;">
//                                                         <h2 style="font-size: 1rem; color: #464444; width: 100%;">
//                                                             Olá!
//                                                         </h2>
//                                                         <p style="font-size: 0.9rem; color: #464444; width: 60%;">
//                                                             Aqui está o seu token de redefinição de senha:
//                                                         </p>
//                                                         <h3 style="font-size: 1.5rem; color: #b6b6f6;">
//                                                             ${token}
//                                                         </h3>
//                                                         <p style="font-size: 0.9rem; color: #464444; width:80%">
//                                                             O token é válido por um curto período de tempo, portanto, 
//                                                             recomendamos que você o utilize imediatamente.
//                                                         </p>
//                                                         <p style="font-size: 0.9rem; color: #464444; width:80%">
//                                                             Se você não solicitou a redefinição de senha, por favor, 
//                                                             entre em contato conosco imediatamente através do e-mail: SEU_EMAIL_DE_SUPORTE
//                                                         </p>
//                                                         <h3 style="font-size: 1rem; color: #464444;">
//                                                             Obrigado,
//                                                         </h3>
//                                                         <h3 style="font-size:1.2rem; color: #b6b6f6;">
//                                                             Equipe BebêVindo.
//                                                         </h3>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         </table>
//                                     </div>
//                                 </td>
//                             </tr>
//                         </table>
//                     </td>
//                 </tr>
//             </table>
//         </body>
//     </html>
//     `
//       const transporter = nodemailer.createTransport({
//         service: 'Gmail', // ou qualquer outro serviço de e-mail
//         auth: {
//           user: `bebevindo007@gmail.com`,
//           pass: 'BebeVindo123.',
//         },
//       });
//       const mailOptions = {
//         from: 'bebevindo007@gmail.com',
//         to: email,
//         subject: 'Redefinição de Senha - Conta Bebê-Vindo',
//         text: `Seu código de redefinição de senha: ${token}`,
//         html: `${htmlEmail}`
//       };
//       await transporter.sendMail(mailOptions);
//       message = {
//         result: 'E-mail enviado com sucesso'
//       }
//     } else {
//       message = {
//         result: 'Não foi possivel enviar o E-mail:'
//       }
//     }
//     return message
//   }
//   async validarTokenClinica(email: string, token: number) {
//     const user = await this.clinicaService.findEmail(email);
//     let message = false
//     if (user) {
//       if (token == this.tokenCache.token) {
//         message = true
//       }
//     } else {
//       return message
//     }
//     return message
//   }
//   async redefinirSenhaClinica(
//     email: string,
//     token: number,
//     novaSenha: string,
//   ): Promise<{}> {
//     const validaToken = await this.validarTokenClinica(email, token);
//     let message = {}
//     if (validaToken === true) {
//       const queryUser = `select * from tbl_clinica where email = '${email}'`;
//       const result: Clinica = await this.prismaService.$queryRawUnsafe(
//         queryUser,
//       );
//       if (result[0]) {
//         const idUser = result[0].id;
//         const novaSenhaa = await bcrypt.hash(novaSenha, 10);
//         const queryResetPassword = `update tbl_clinica set senha = '${novaSenhaa}' where id = ${idUser};`;
//         const resultRedefine = await this.prismaService.$queryRawUnsafe(
//           queryResetPassword,
//         );
//         if (resultRedefine) {
//           message = {
//             message: 'Sua senha foi redefinida com sucesso;'
//           }
//         }
//       } else {
//         message = {
//           message: 'Não foi possível redefinir sua senha:;'
//         }
//       }
//       delete this.tokenCache[email];
//     } else {
//       message = {
//         message: 'Token inválido;'
//       }
//     }
//     return message
//   }
// }
