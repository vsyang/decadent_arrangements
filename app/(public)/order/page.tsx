// app/(public)/order/page.tsx

// This page will display the customer order form.
// Customers use this form to request an arrangement and enter delivery details.
export default function OrderPage() {
  return (
    <main>
      {/* Page title */}
      <h1>Place an Order</h1>

      {/* Main order form */}
      <form>
        {/* Customer information section */}
        <div>
          <h3>Customer Information</h3>

          {/* Basic customer information */}
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
            />
          </div>

          <div>
            <label >Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
            />
          </div>
        </div>

        {/* Arrangement information section */}
        <div>
          <h3>
            Arrangement Information
          </h3>

          {/* Customer selects the arrangement size */}
          <div>
            <label>Arrangement Size</label>
            <select
              name="arrangementSize"
              required
            >
              <option value="">Select a size</option>
              <option value="10-15">10-15 people</option>
              <option value="15-20">15-20 people</option>
              <option value="20-30">20-30 people</option>
              <option value="50-plus">Table arrangement, 50+ people</option>
            </select>
          </div>

          {/* Event date and time */}
          <div>
            <div>
              <label>Event Date</label>
              <input
                type="date"
                name="eventDate"
                required
              />
            </div>

            <div>
              <label>Event Time</label>
              <input
                type="time"
                name="eventTime"
                required
              />
            </div>
          </div>

          {/* Special requests */}
          <div>
            <label>Special Requests</label>
            <textarea
              name="specialRequests"
              rows={4}
              placeholder="Colors, theme, allergies, dietary restrictions, or other details."
            />
          </div>
        </div>

        {/* Delivery information section */}
        <div>
          <h3>Delivery Information</h3>

          {/* Delivery address */}
          <div>
            <label>Street Address</label>
            <input
              type="text"
              name="streetAddress"
              required
            />
          </div>

          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              required
            />
          </div>

          <div>
            <label>State</label>
            <input
              type="text"
              name="state"
              required
            />
          </div>

          <div>
            <label>Zip Code</label>
            <input
              type="text"
              name="postalCode"
              required
            />
          </div>

          {/* Extra delivery instructions */}
          <div>
            <label>Delivery Notes</label>
            <textarea
              name="deliveryNotes"
              rows={3}
              placeholder="Apartment number, gate code, or drop-off instructions."
            />
          </div>
        </div>

        {/* Payment confirmation section */}
        <div>
          <h3>Payment Notice</h3>

          {/* Required confirmation checkbox */}
          <label>
            <input type="checkbox" name="agreeToPayment" required />
            <span>
              I understand that my order will not begin until payment is
              received. (something about payment).
            </span>
          </label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
