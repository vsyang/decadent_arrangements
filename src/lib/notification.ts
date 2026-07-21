// src/lib/notification.ts
// lib/sendOwnerEmail.ts

import nodemailer from "nodemailer";

// This function sends a short email notification to the business owner.
export async function sendOwnerEmail({
  orderCode,
}: {
  orderCode: string;
}) {
  const emailUser = process.env.EMAIL_USER;
  const emailAppPassword = process.env.EMAIL_APP_PASSWORD;
  const ownerEmail = process.env.OWNER_EMAIL;

  // If any email setting is missing, skip sending the email instead of breaking the order.
  if (!emailUser || !emailAppPassword || !ownerEmail) {
    console.warn("Owner email was not sent. Missing email environment variables.");
    return;
  }

  // Connect to Gmail using the business Gmail account and app password.
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailAppPassword,
    },
  });

  // Send a short email to the business owner.
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  await transporter.sendMail({

    from: `"Decadent Arrangements Website" <${emailUser}>`,
    to: ownerEmail,
    subject: `New Order Received!`,
    text:
      `New order received! Confirmation code: ${orderCode}\n\n` +
      `To view order details, please log in.`,
    html: `
      <p>
        New order received! Confirmation code: <strong>${orderCode}</strong>
      </p>

      <p>
        To view order details,
        <a href="${appUrl}/api/auth/signin">
          please log in.
        </a>
      </p>
    `,
  });
}