import nodemailer from "nodemailer";

import { emailStyles } from "./emailStyles";

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

// Prevents user-entered text from being interpreted as email HTML.
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

function createLogoHeader() {
  return `
    <div style="${emailStyles.logoHeader}">
      <img
        src="${logoUrl}"
        alt="Decadent Arrangements logo"
        width="420"
        style="${emailStyles.logo}"
      />
    </div>
  `;
}

// Sends a notification to the owner when a customer submits an order.
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
      <div style="${emailStyles.wrapper}">
        <div style="${emailStyles.ownerContainer}">
          ${createLogoHeader()}

          <div style="${emailStyles.content}">
            <h1 style="${emailStyles.heading}">
              A new order is waiting for review.
            </h1>

            <p style="${emailStyles.bodyText}">
              A customer has submitted a new order through the
              Decadent Arrangements website.
            </p>

            <div style="${emailStyles.confirmationBox}">
              <p style="${emailStyles.confirmationLabel}">
                Confirmation Code
              </p>

              <p style="${emailStyles.confirmationCode}">
                ${safeOrderCode}
              </p>
            </div>

            <a href="${signInUrl}" style="${emailStyles.button}">
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
      <div style="${emailStyles.wrapper}">
        <div style="${emailStyles.container}">
          ${createLogoHeader()}

          <div style="${emailStyles.content}">
            <h1 style="${emailStyles.heading}">
              Thank you, ${safeCustomerName}.
            </h1>

            <p style="${emailStyles.bodyText}">
              Your order has been received and is currently awaiting
              review. Below is a copy of your order.
            </p>

            <div style="${emailStyles.confirmationBox}">
              <p style="${emailStyles.confirmationLabel}">
                Confirmation Code
              </p>

              <p style="${emailStyles.confirmationCode}">
                ${safeOrderCode}
              </p>
            </div>

            <h2 style="${emailStyles.subheading}">
              Order Snapshot
            </h2>

            <table
              role="presentation"
              cellspacing="0"
              cellpadding="0"
              border="0"
              width="100%"
              style="${emailStyles.table}"
            >
              <tr>
                <td style="${emailStyles.labelCell}">
                  Customer Name
                </td>
                <td style="${emailStyles.valueCell}">
                  ${safeCustomerName}
                </td>
              </tr>

              <tr>
                <td style="${emailStyles.labelCell}">
                  Email
                </td>
                <td style="${emailStyles.valueCell}">
                  ${safeCustomerEmail}
                </td>
              </tr>

              <tr>
                <td style="${emailStyles.labelCell}">
                  Phone
                </td>
                <td style="${emailStyles.valueCell}">
                  ${safeCustomerPhone}
                </td>
              </tr>

              <tr>
                <td style="${emailStyles.labelCell}">
                  Arrangement
                </td>
                <td style="${emailStyles.valueCell}">
                  ${safeProductName}
                </td>
              </tr>

              <tr>
                <td style="${emailStyles.labelCell}">
                  Capacity
                </td>
                <td style="${emailStyles.valueCell}">
                  ${safeProductCapacity}
                </td>
              </tr>

              <tr>
                <td style="${emailStyles.labelCell}">
                  Event Date and Time
                </td>
                <td style="${emailStyles.valueCell}">
                  ${safeFormattedDate}
                </td>
              </tr>

              <tr>
                <td style="${emailStyles.labelCell}">
                  Price
                </td>
                <td style="${emailStyles.valueCell}">
                  <strong>${safeFormattedPrice}</strong>
                </td>
              </tr>

              <tr>
                <td style="${emailStyles.labelCell}">
                  Payment Preference
                </td>
                <td style="${emailStyles.valueCell}">
                  ${safePaymentPreference}
                </td>
              </tr>

              <tr>
                <td style="${emailStyles.labelCell}">
                  Delivery Address
                </td>
                <td style="${emailStyles.valueCell}">
                  ${safeStreetAddress}<br />
                  ${safeCity}, ${safeState} ${safePostalCode}
                </td>
              </tr>

              <tr>
                <td style="${emailStyles.labelCell}">
                  Delivery Notes
                </td>
                <td style="${emailStyles.valueCell}">${safeDeliveryNotes}</td>
              </tr>

              <tr>
                <td style="${emailStyles.labelCell}">
                  Dietary Restrictions
                </td>
                <td style="${emailStyles.valueCell}">
                  ${safeDietaryRestrictions}
                </td>
              </tr>

              <tr>
                <td style="${emailStyles.lastLabelCell}">
                  Special Requests
                </td>
                <td style="${emailStyles.lastValueCell}">
                  ${safeSpecialRequests}
                </td>
              </tr>
            </table>

            <div style="${emailStyles.notice}">
              <p style="${emailStyles.noticeText}">
                Please keep this email for your records. Your order
                will not begin until payment has been received.
              </p>
            </div>

            <p style="${emailStyles.signature}">
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
      `Yours Truly,\n` +
      `Decadent Arrangements`,

    html: `
      <div style="${emailStyles.wrapper}">
        <div style="${emailStyles.deliveryContainer}">
          ${createLogoHeader()}

          <div style="${emailStyles.content}">
            <h1 style="${emailStyles.heading}">
              Your order is on its way.
            </h1>

            <p style="${emailStyles.deliveryGreeting}">
              Hello ${safeCustomerName},
            </p>

            <p style="${emailStyles.bodyText}">
              Great news! Your
              <strong style="color: #252525;">
                ${safeProductName}
              </strong>
              order is on its way to you.
            </p>

            <div style="${emailStyles.notice}">
              <p style="${emailStyles.noticeText}">
                Thank you for choosing Decadent Arrangements.
                We hope you love your order!
              </p>
            </div>

            <p style="${emailStyles.signature}">
              Yours Truly,<br />
              Decadent Arrangements
            </p>
          </div>
        </div>
      </div>
    `,
  });
}