import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'
import { RedditPost } from '../types/reddit'

export class Mailer {
  private email: string
  private transporter: nodemailer.Transporter

  constructor({ email, password }: { email: string; password: string }) {
    this.email = email

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.email,
        pass: password,
      },
    })

    this.transporter.use(
      'compile',
      hbs({
        viewEngine: {
          partialsDir: path.resolve(__dirname, '../templates'),
          defaultLayout: '',
        },
        viewPath: path.resolve(__dirname, '../templates'),
      })
    )
  }

  async sendMail(
    subreddits: {
      name: string
      posts: RedditPost
    }[]
  ) {
    const mailOptions = {
      from: this.email,
      to: this.email,
      subject: `Reddit Newsletter from ${new Date().toLocaleDateString(
        'fr-FR'
      )}`,
      template: 'email',
      context: {
        subreddits,
      },
    }

    const result = await this.transporter.sendMail(mailOptions)

    return result
  }
}
