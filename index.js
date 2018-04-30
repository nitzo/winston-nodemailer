const {Transport} = require('winston')

class WinstonNodemailer extends Transport {

  constructor(props){
    super(props)
    this.name = 'WinstonNodemailer'
    this.level = props.level || 'info'
    this.mailOptions = props.mailOptions
    this.transporter = props.transporter
  }

  log(level, msg, meta, callback){
    
    if (arguments.length === 2) { // New winston version
      callback = msg;
      msg = level.message;
      meta = level;
      level = level.level;
    }

    
    const self = this

    const {transporter, mailOptions} = self

    if (self.silent) return callback(null, true)

    const defaultOptions = {
      subject: `Winston logger: new ${level.toUpperCase()}!`,
      html: `
        ${msg}</br>
        </br>
        ${JSON.stringify(meta || {})}</br>
        </br>
      `
    }

    try {

      const finalOptions = typeof mailOptions === 'function'
        ? mailOptions(level, msg, meta)
        : mailOptions

      transporter.sendMail({...defaultOptions, ...finalOptions}, (err, info) => {
        if (err) return self.emit('error', err)
        self.emit('logged')
        callback(null, true)
      })

    } catch(err) {
      self.emit('error', err)
    }
  }

}

module.exports = WinstonNodemailer
