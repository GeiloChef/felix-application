module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try{
      await strapi
        .plugin('email-designer')
        .service('email')
        .sendTemplatedEmail(
          {
            // required
            to: process.env.STANDARD_MAIL_RECEIVER,

            // optional if /config/plugins.js -> email.settings.defaultFrom is set
            from: process.env.STANDARD_MAIL_SENDER,

            // optional if /config/plugins.js -> email.settings.defaultReplyTo is set
            replyTo: process.env.STANDARD_MAIL_REPLY_TO,

            // optional array of files
            attachments: [],
          },
          {
            // required - Ref ID defined in the template designer (won't change on import)
            templateReferenceId: 1,

            // If provided here will override the template's subject.
            // Can include variables like `Thank you for your order {{= USER.firstName }}!`
            // subject: `Thank you for your order`,
          },
          {
            // this object must include all variables you're using in your email template
            request: result
          }
        );
    } catch(err) {
      strapi.log.debug('📺: ', err);
      return ctx.badRequest(null, err);
    }
  }
}
