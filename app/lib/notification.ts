// src/lib/notification.ts

import nodemailer from "nodemailer";

// Creates the Gmail connection used for outgoing emails.
function createEmailTransporter() {
  const emailUser = process.env.EMAIL_USER;
  const emailAppPassword = process.env.EMAIL_APP_PASSWORD;

  if (!emailUser || !emailAppPassword) {
    throw new Error("Missing EMAIL_USER or EMAIL_APP_PASSWORD.");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailAppPassword,
    },
  });
}

// Sends a notification to the business owner when a customer submits a new order.
export async function sendOwnerEmail({ orderCode }: { orderCode: string }) {
  const emailUser = process.env.EMAIL_USER;
  const ownerEmail = process.env.OWNER_EMAIL;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  // Skip the email instead of preventing the order from being submitted.
  if (!emailUser || !ownerEmail) {
    console.warn(
      "Owner email was not sent. Missing email environment variables.",
    );
    return;
  }

  const transporter = createEmailTransporter();

  await transporter.sendMail({
    from: `"Decadent Arrangements Website" <${emailUser}>`,

    to: ownerEmail,

    subject: "New Order Received!",

    text:
      `You have a new order! Confirmation code: ${orderCode}\n\n` +
      `Please log in to view the order details: ` +
      `${appUrl}/api/auth/signin`,

    html: `
      <p>Hello from Decadent Arrangements!</p>

      <p>
        You have a new order!
        Confirmation code:
        <strong>${orderCode}</strong>
      </p>

      <p>
        <a href="${appUrl}/api/auth/signin">
          Please log in to view the order details
        </a>
      </p>
    `,
  });
}

// Sends email to the customer when the business owner updates the order as delivered.
const appUrl = process.env.NEXT_PUBLIC_APP_URL;
const logoUrl = `${appUrl}/images/Decadentarrangements_logo.png`;

export async function sendCustomerDeliveryEmail({
  customerEmail,
  customerName,
  productName,
}: {
  customerEmail: string;
  customerName: string;
  productName: string;
}) {
  const emailUser = process.env.EMAIL_USER;

  if (!emailUser) {
    throw new Error("Missing EMAIL_USER.");
  }

  const transporter = createEmailTransporter();

  await transporter.sendMail({
    from: `"Decadent Arrangements" <${emailUser}>`,
    to: customerEmail,

    subject: "Your Decadent Arrangements order is on its way!",

    text:
      `Hello ${customerName},\n\n` +
      `Great news! Your ${productName} order is on its way to you.\n\n` +
      `Thank you for choosing Decadent Arrangements. ` +
      `We hope you love your order!\n\n\n` +
      `Yours Truly,\n\n` +
      `Decadent Arrangements`,

    html: `
      <p>Hello ${customerName},</p>

      <p>
        Great news! Your 
        <strong>${productName}</strong>
        order is on its way to you.
      </p>

      <p>
        Thank you for choosing Decadent Arrangements.
        We hope you love your order!
      </p>

      <p>
        Yours Truly,
      </p>

       <table
    role="presentation"
    cellspacing="0"
    cellpadding="0"
    border="0"
    style="margin-top: 12px;"
  >
    <tr>
      <td style="vertical-align: middle;">
        <img
          src="${logoUrl}"
          alt="Decadent Arrangements logo"
          width="55"
          style="
            display: block;
            width: 55px;
            height: auto;
          "
        />
      </td>

      <td style="vertical-align: middle;">
        <strong
          style="
            font-family: Arial, sans-serif;
            font-size: 16px;
          "
        >
          Decadent Arrangements
        </strong>
      </td>
    </tr>
  </table>
    `,
  });
}
