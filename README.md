#﻿ @walandemar/winston-nodemailer

[![NPM](https://nodei.co/npm/@walandemar/winston-nodemailer.png?downloads=true&downloadRank=true)](https://nodei.co/npm/@walandemar/winston-nodemailer/)

This is mail transport for [Winston](https://www.npmjs.com/package/winston) logger on top of the [Nodemailer](https://www.npmjs.com/package/nodemailer). Send log e-mails from Node.js - easy as cake! 🍰✉️

## Prerequisites

 - This package does't require and install any external dependencies by itself, but it uses your current project's dependency of `winston`
 - You need to install `nodemailer` in order to create (or use existance) transporter and pass it into `WinstonNodemailer` class.

## Installing

```bash
    npm i winston nodemailer @walandemar/winston-nodemailer
```

## Usage

```js
    const WinstonNodemailer = require('@walandemar/winston-nodemailer')

    const logger = new winston.Logger({
      transports: [
        new WinstonNodemailer(options)
      ]
    })

    // or

    const logger = new winston.Logger()

    logger.add(WinstonNodemailer, options)
```
See [API](#api) for list of available options.

## Example

```js
    const winston = require('winston')

    const nodemailer = require('nodemailer')

    const WinstonNodemailer = require('@walandemar/winston-nodemailer')

    const logger = new winston.Logger({
      transports: [
        new winston.transports.Console(),
        new WinstonNodemailer({
          level: 'warn',
          handleExceptions: true,

          /* Set mail options as Object */
          mailOptions: {
            from: '"EXAMPLE ERRORS" errors@example.com',
            to: 'developer@example.com',
            subject: 'Winston logger: new warning occurred'
          },

          /* OR set mail options as function */
          mailOptions: (level, msg, meta) => {
            from: '"EXAMPLE ERRORS" errors@example.com',
            to: 'developer@example.com',
            subject: `Winston logger: new ${level} occurred`,
            html: `
      			  ${msg}</br>
      		      </br>
      		      ${JSON.stringify(meta || {})}</br>
      		      </br>
      		  `
          },

          transporter: nodemailer.createTransport({
            host: 'smtp.example.com',
            port: 465,
            secure: true,
            auth: {user: 'errors@example.com', pass: 'SuperSecretPassword'}
          })
        })
      ]
    })

    logger.info('This message will use only Console transport')

    logger.warn('This message will use both Console and WinstonNodemailer transports. Pls check your e-mail inbox:)')
```

## API

`WinstonNodemailer` extends `winston.Transport` class with it's standart available options, such as: level, silent, handleExceptions, etc. There are also package specific options:

 - **mailOptions**: *Object* or *Function(level, msg, meta)* that returns message configuration for `nodemailer`. See [full list of available options](https://nodemailer.com/message/)  at Nodemailer homepage. [REQUIRED]
	 - **from**: the email address of the sender. [REQUIRED]
	 - **to**: the email address of recipient/recipients. [REQUIRED]
 - **transporter**: valid *Nodemailer transporter* that is used to finally send email using *mailOptions*. [REQUIRED]

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
