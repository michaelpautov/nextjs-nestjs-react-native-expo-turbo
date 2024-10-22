import fs from "node:fs/promises";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Handlebars from "handlebars";
import nodemailer from "nodemailer";

import { AllConfigType } from "../../config/config.type";

@Injectable()
export class MailerService {
  private readonly transporter: nodemailer.Transporter;
  constructor(private readonly configService: ConfigService<AllConfigType>) {
    this.transporter = nodemailer?.createTransport({
      host: configService.get("mail.MAIL_HOST", { infer: true }),
      port: configService.get("mail.MAIL_PORT", { infer: true }),
      ignoreTLS: configService.get("mail.MAIL_IGNORE_TLS", { infer: true }),
      secure: configService.get("mail.MAIL_SECURE", { infer: true }),
      requireTLS: configService.get("mail.MAIL_REQUIRE_TLS", { infer: true }),
      auth: {
        user: configService.get("mail.MAIL_USER", { infer: true }),
        pass: configService.get("mail.MAIL_PASSWORD", { infer: true }),
      },
    });
  }

  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: nodemailer.SendMailOptions & {
    templatePath: string;
    context: Record<string, unknown>;
  }): Promise<void> {
    let html: string | undefined;
    if (templatePath) {
      const template = await fs.readFile(templatePath, "utf-8");
      html = Handlebars.compile(template, {
        strict: true,
      })(context);
    }

    await this.transporter.sendMail({
      ...mailOptions,
      from: mailOptions.from
        ? mailOptions.from
        : `"${this.configService.get("mail.MAIL_DEFAULT_NAME", {
            infer: true,
          })}" <${this.configService.get("mail.MAIL_DEFAULT_EMAIL", {
            infer: true,
          })}>`,
      html: mailOptions.html ? mailOptions.html : html,
    });
  }
}
