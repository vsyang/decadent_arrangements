// src/lib/notification.ts

import nodemailer from "nodemailer";

const appUrl = process.env.NEXT_PUBLIC_APP_URL;
const logoUrl = `${appUrl}/images/Decadentarrangements_logo.png`;

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

// Prevents customer-entered text from being interpreted as HTML.
function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatEmailDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatPaymentMethod(value: string) {
  const paymentNames: Record<string, string> = {
    venmo: "Venmo",
    paypal: "PayPal",
    zelle: "Zelle",
  };

  return paymentNames[value] ?? value;
}

function formatCapacity(value: string) {
  if (value === "50-plus") {
    return "50+ people";
  }

  return `${value} people`;
}

// Sends a notification to the business owner when a customer submits an order.
export async function sendOwnerEmail({
  orderCode,
}: {
  orderCode: string;
}) {
  const emailUser = process.env.EMAIL_USER;
  const ownerEmail = process.env.OWNER_EMAIL;

  if (!emailUser || !ownerEmail) {
    console.warn(
      "Owner email was not sent. Missing email environment variables.",
    );
    return;
  }

  const transporter = createEmailTransporter();
  const signInUrl = `${appUrl}/api/auth/signin`;
  const safeOrderCode = escapeHtml(orderCode);

  await transporter.sendMail({
    from: `"Decadent Arrangements Website" <${emailUser}>`,
    to: ownerEmail,
    subject: `New order received — ${orderCode}`,

    text:
      `You have a new order!\n\n` +
      `Confirmation code: ${orderCode}\n\n` +
      `Please log in to view the order details:\n` +
      `${signInUrl}`,

    html: `
      <div
        style="
          margin: 0;
          padding: 24px 12px;
          color: #252525;
          font-family: Arial, Helvetica, sans-serif;
        "
      >
        <div
          style="
            max-width: 600px;
            margin: 0 auto;
            overflow: hidden;
            border: 1px solid #d8d2ca;
          "
        >
          <div
            style="
              padding: 36px 20px;
              text-align: center;
              border-bottom: 3px solid #00bcd4;
            "
          >
            <img
              src="${logoUrl}"
              alt="Decadent Arrangements logo"
              width="420"
              style="
                display: block;
                width: 420px;
                max-width: 90%;
                height: auto;
                margin: 0 auto;
                border: 0;
              "
            />
          </div>

          <div style="padding: 34px 28px;">
            <h1
              style="
                margin: 0 0 18px;
                color: #252525;
                font-family: Georgia, 'Times New Roman', serif;
                font-size: 30px;
                line-height: 1.2;
                font-weight: normal;
              "
            >
              A new order is waiting for review.
            </h1>

            <p
              style="
                margin: 0;
                color: #545454;
                font-size: 15px;
                line-height: 1.7;
              "
            >
              A customer has submitted a new order through the
              Decadent Arrangements website.
            </p>

            <div
              style="
                margin: 26px 0;
                padding: 20px;
                background-color: #f4f0ea;
                border: 1px solid #d8d2ca;
              "
            >
              <p
                style="
                  margin: 0 0 7px;
                  color: #545454;
                  font-size: 12px;
                  font-weight: bold;
                "
              >
                Confirmation Code
              </p>

              <p
                style="
                  margin: 0;
                  color: #252525;
                  font-family: Georgia, 'Times New Roman', serif;
                  font-size: 28px;
                  font-weight: bold;
                "
              >
                ${safeOrderCode}
              </p>
            </div>

            <a
              href="${signInUrl}"
              style="
                display: inline-block;
                padding: 15px 24px;
                background-color: #111111;
                color: #ffffff;
                font-size: 11px;
                font-weight: bold;
                letter-spacing: 1.5px;
                text-decoration: none;
                text-transform: uppercase;
              "
            >
              View Order Details
            </a>
          </div>
        </div>
      </div>
    `,
  });
}

type CustomerOrderConfirmationEmailProps = {
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  orderCode: string;
  productName: string;
  productCapacity: string;
  eventDate: Date;
  totalPrice: string | number;
  paymentPreference: string;
  specialRequests: string;
  dietaryRestrictions: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  deliveryNotes: string;
};

// Sends the customer a full copy of the submitted order.
export async function sendCustomerConfirmation({
  customerEmail,
  customerName,
  customerPhone,
  orderCode,
  productName,
  productCapacity,
  eventDate,
  totalPrice,
  paymentPreference,
  specialRequests,
  dietaryRestrictions,
  streetAddress,
  city,
  state,
  postalCode,
  deliveryNotes,
}: CustomerOrderConfirmationEmailProps) {
  const emailUser = process.env.EMAIL_USER;

  if (!emailUser) {
    throw new Error("Missing EMAIL_USER.");
  }

  const transporter = createEmailTransporter();

  const formattedEventDate = formatEmailDate(eventDate);

  const formattedPrice = Number(totalPrice).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formattedPaymentPreference =
    formatPaymentMethod(paymentPreference);

  const formattedProductCapacity =
    formatCapacity(productCapacity);

  const safeCustomerEmail = escapeHtml(customerEmail);
  const safeCustomerName = escapeHtml(customerName);
  const safeCustomerPhone = escapeHtml(customerPhone);
  const safeOrderCode = escapeHtml(orderCode);
  const safeProductName = escapeHtml(productName);
  const safeProductCapacity = escapeHtml(
    formattedProductCapacity,
  );
  const safeFormattedDate = escapeHtml(formattedEventDate);
  const safeFormattedPrice = escapeHtml(formattedPrice);
  const safePaymentPreference = escapeHtml(
    formattedPaymentPreference,
  );
  const safeStreetAddress = escapeHtml(streetAddress);
  const safeCity = escapeHtml(city);
  const safeState = escapeHtml(state);
  const safePostalCode = escapeHtml(postalCode);

  const safeDeliveryNotes = escapeHtml(
    deliveryNotes || "None provided",
  );

  const safeDietaryRestrictions = escapeHtml(
    dietaryRestrictions || "None provided",
  );

  const safeSpecialRequests = escapeHtml(
    specialRequests || "None provided",
  );

  const deliveryAddress =
    `${streetAddress}, ${city}, ${state} ${postalCode}`;

  await transporter.sendMail({
    from: `"Decadent Arrangements" <${emailUser}>`,
    to: customerEmail,
    subject: `We received your order — ${orderCode}`,

    text:
      `Hello ${customerName},\n\n` +
      `Thank you for placing an order with Decadent Arrangements.\n` +
      `Your order has been received and is awaiting review.\n\n` +
      `ORDER SNAPSHOT\n\n` +
      `Confirmation code: ${orderCode}\n` +
      `Customer name: ${customerName}\n` +
      `Email: ${customerEmail}\n` +
      `Phone: ${customerPhone}\n` +
      `Arrangement: ${productName}\n` +
      `Capacity: ${formattedProductCapacity}\n` +
      `Event date and time: ${formattedEventDate}\n` +
      `Price: ${formattedPrice}\n` +
      `Payment preference: ${formattedPaymentPreference}\n` +
      `Delivery address: ${deliveryAddress}\n` +
      `Delivery notes: ${deliveryNotes || "None provided"}\n` +
      `Dietary restrictions: ${
        dietaryRestrictions || "None provided"
      }\n` +
      `Special requests: ${specialRequests || "None provided"}\n\n` +
      `Please keep this email for your records.\n` +
      `Your order will not begin until payment has been received.\n\n` +
      `Yours Truly,\n` +
      `Decadent Arrangements`,

    html: `
      <div
        style="
          margin: 0;
          padding: 24px 12px;
          color: #252525;
          font-family: Arial, Helvetica, sans-serif;
        "
      >
        <div
          style="
            max-width: 660px;
            margin: 0 auto;
            overflow: hidden;
            border: 1px solid #d8d2ca;
          "
        >
          <div
            style="
              padding: 36px 20px;
              text-align: center;
              border-bottom: 3px solid #00bcd4;
            "
          >
            <img
              src="${logoUrl}"
              alt="Decadent Arrangements logo"
              width="420"
              style="
                display: block;
                width: 420px;
                max-width: 90%;
                height: auto;
                margin: 0 auto;
                border: 0;
              "
            />
          </div>

          <div
            style="
              padding: 34px 28px;
            "
          >
            <h1
              style="
                margin: 0 0 18px;
                color: #252525;
                font-family: Georgia, 'Times New Roman', serif;
                font-size: 32px;
                line-height: 1.2;
                font-weight: normal;
              "
            >
              Thank you, ${safeCustomerName}.
            </h1>

            <p
              style="
                margin: 0;
                color: #545454;
                font-size: 15px;
                line-height: 1.7;
              "
            >
              Your order has been received and is currently awaiting
              review. Below is a copy of your order.
            </p>

            <div
              style="
                margin: 26px 0;
                padding: 20px;
                background-color: #f4f0ea;
                border: 1px solid #d8d2ca;
              "
            >
              <p
                style="
                  margin: 0 0 7px;
                  color: #545454;
                  font-size: 12px;
                  font-weight: bold;
                "
              >
                Confirmation Code
              </p>

              <p
                style="
                  margin: 0;
                  color: #252525;
                  font-family: Georgia, 'Times New Roman', serif;
                  font-size: 28px;
                  font-weight: bold;
                "
              >
                ${safeOrderCode}
              </p>
            </div>

            <h2
              style="
                margin: 30px 0 14px;
                color: #252525;
                font-family: Georgia, 'Times New Roman', serif;
                font-size: 25px;
                font-weight: normal;
              "
            >
              Order Snapshot
            </h2>

            <table
              role="presentation"
              cellspacing="0"
              cellpadding="0"
              border="0"
              width="100%"
              style="
                width: 100%;
                border-collapse: collapse;
                background-color: #ffffff;
                border: 1px solid #d8d2ca;
              "
            >
              <tr>
                <td style="padding: 13px; font-weight: bold; border-bottom: 1px solid #e5e0da;">
                  Customer Name
                </td>
                <td style="padding: 13px; border-bottom: 1px solid #e5e0da;">
                  ${safeCustomerName}
                </td>
              </tr>

              <tr>
                <td style="padding: 13px; font-weight: bold; border-bottom: 1px solid #e5e0da;">
                  Email
                </td>
                <td style="padding: 13px; word-break: break-word; border-bottom: 1px solid #e5e0da;">
                  ${safeCustomerEmail}
                </td>
              </tr>

              <tr>
                <td style="padding: 13px; font-weight: bold; border-bottom: 1px solid #e5e0da;">
                  Phone
                </td>
                <td style="padding: 13px; border-bottom: 1px solid #e5e0da;">
                  ${safeCustomerPhone}
                </td>
              </tr>

              <tr>
                <td style="padding: 13px; font-weight: bold; border-bottom: 1px solid #e5e0da;">
                  Arrangement
                </td>
                <td style="padding: 13px; border-bottom: 1px solid #e5e0da;">
                  ${safeProductName}
                </td>
              </tr>

              <tr>
                <td style="padding: 13px; font-weight: bold; border-bottom: 1px solid #e5e0da;">
                  Capacity
                </td>
                <td style="padding: 13px; border-bottom: 1px solid #e5e0da;">
                  ${safeProductCapacity}
                </td>
              </tr>

              <tr>
                <td style="padding: 13px; font-weight: bold; border-bottom: 1px solid #e5e0da;">
                  Event Date and Time
                </td>
                <td style="padding: 13px; border-bottom: 1px solid #e5e0da;">
                  ${safeFormattedDate}
                </td>
              </tr>

              <tr>
                <td style="padding: 13px; font-weight: bold; border-bottom: 1px solid #e5e0da;">
                  Price
                </td>
                <td style="padding: 13px; font-weight: bold; border-bottom: 1px solid #e5e0da;">
                  ${safeFormattedPrice}
                </td>
              </tr>

              <tr>
                <td style="padding: 13px; font-weight: bold; border-bottom: 1px solid #e5e0da;">
                  Payment Preference
                </td>
                <td style="padding: 13px; border-bottom: 1px solid #e5e0da;">
                  ${safePaymentPreference}
                </td>
              </tr>

              <tr>
                <td style="padding: 13px; font-weight: bold; vertical-align: top; border-bottom: 1px solid #e5e0da;">
                  Delivery Address
                </td>
                <td style="padding: 13px; line-height: 1.6; border-bottom: 1px solid #e5e0da;">
                  ${safeStreetAddress}<br />
                  ${safeCity}, ${safeState} ${safePostalCode}
                </td>
              </tr>

              <tr>
                <td style="padding: 13px; font-weight: bold; vertical-align: top; border-bottom: 1px solid #e5e0da;">
                  Delivery Notes
                </td>
                <td style="padding: 13px; border-bottom: 1px solid #e5e0da;">${safeDeliveryNotes}</td>
              </tr>

              <tr>
                <td style="padding: 13px; font-weight: bold; vertical-align: top; border-bottom: 1px solid #e5e0da;">
                  Dietary Restrictions
                </td>
                <td style="padding: 13px; border-bottom: 1px solid #e5e0da;">${safeDietaryRestrictions}</td>
              </tr>

              <tr>
                <td style="padding: 13px; font-weight: bold; vertical-align: top;">
                  Special Requests
                </td>
                <td style="padding: 13px;">${safeSpecialRequests}</td>
              </tr>
            </table>

            <div
              style="
                margin-top: 24px;
                padding: 18px;
                background-color: #f4f0ea;
              "
            >
              <p
                style="
                  margin: 0;
                  color: #252525;
                  font-size: 14px;
                  line-height: 1.7;
                "
              >
                Please keep this email for your records. Your order
                will not begin until payment has been received.
              </p>
            </div>

            <p
              style="
                margin: 30px 0 0;
                color: #545454;
                font-family: Georgia, 'Times New Roman', serif;
                font-size: 17px;
                font-style: italic;
                line-height: 1.6;
              "
            >
              Yours Truly,<br />
              Decadent Arrangements
            </p>
          </div>
        </div>
      </div>
    `,
  });
}

// Sends an email when the owner updates an order as delivered.
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

  const safeCustomerName = escapeHtml(customerName);
  const safeProductName = escapeHtml(productName);

  await transporter.sendMail({
    from: `"Decadent Arrangements" <${emailUser}>`,
    to: customerEmail,
    subject: "Your Decadent Arrangements order is on its way!",

    text:
      `Hello ${customerName},\n\n` +
      `Great news! Your ${productName} order is on its way to you.\n\n` +
      `Thank you for choosing Decadent Arrangements. ` +
      `We hope you love your order!\n\n` +
      `Yours truly,\n` +
      `Decadent Arrangements`,

    html: `
      <div
        style="
          margin: 0;
          padding: 24px 12px;
          background-color: #ffffff;
          color: #252525;
          font-family: Arial, Helvetica, sans-serif;
        "
      >
        <div
          style="
            max-width: 620px;
            margin: 0 auto;
            overflow: hidden;
            background-color: #ffffff;
            border: 1px solid #d8d2ca;
          "
        >
          <div
            style="
              padding: 36px 20px;
              text-align: center;
              border-bottom: 3px solid #00bcd4;
            "
          >
            <img
              src="${logoUrl}"
              alt="Decadent Arrangements logo"
              width="420"
              style="
                display: block;
                width: 420px;
                max-width: 90%;
                height: auto;
                margin: 0 auto;
                border: 0;
              "
            />
          </div>

          <div
            style="
              padding: 34px 28px;
              background-color: #ffffff;
            "
          >
            <h1
              style="
                margin: 0 0 22px;
                color: #252525;
                font-family: Georgia, 'Times New Roman', serif;
                font-size: 32px;
                line-height: 1.2;
                font-weight: normal;
              "
            >
              Your order is on its way.
            </h1>

            <p
              style="
                margin: 0 0 18px;
                color: #545454;
                font-size: 15px;
                line-height: 1.7;
              "
            >
              Hello ${safeCustomerName},
            </p>

            <p
              style="
                margin: 0;
                color: #545454;
                font-size: 15px;
                line-height: 1.7;
              "
            >
              Great news! Your
              <strong style="color: #252525;">
                ${safeProductName}
              </strong>
              order is on its way to you.
            </p>

            <div
              style="
                margin-top: 24px;
                padding: 18px;
                background-color: #f4f0ea;
              "
            >
              <p
                style="
                  margin: 0;
                  color: #252525;
                  font-size: 14px;
                  line-height: 1.7;
                "
              >
                Thank you for choosing Decadent Arrangements.
                We hope you love your order!
              </p>
            </div>

            <p
              style="
                margin: 30px 0 0;
                color: #545454;
                font-family: Georgia, 'Times New Roman', serif;
                font-size: 17px;
                font-style: italic;
                line-height: 1.6;
              "
            >
              Yours Truly,<br />
              Decadent Arrangements
            </p>
          </div>
        </div>
      </div>
    `,
  });
}