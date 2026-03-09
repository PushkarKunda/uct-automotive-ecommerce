const nodemailer = require('nodemailer');

const sendOrderConfirmation = async (userEmail, orderDetails) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your preferred email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Order Confirmation - AutoParts Pro',
    text: `Thank you for your order! Your total is $${orderDetails.totalPrice}. Your items will be shipped shortly.`,
    html: `<h1>Thank you for your order!</h1>
           <p>Your total is <strong>$${orderDetails.totalPrice}</strong>.</p>
           <p>Your items will be shipped shortly.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendOrderConfirmation;
