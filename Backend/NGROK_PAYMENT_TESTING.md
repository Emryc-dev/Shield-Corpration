# NotchPay payment tests with ngrok

## Start the local services

Start the API:

```powershell
npm run dev
```

Confirm that `http://localhost:4000/api/health` returns an OK response.

In another terminal, authenticate ngrok once:

```powershell
npx ngrok config add-authtoken YOUR_NGROK_TOKEN
```

Then open the backend tunnel:

```powershell
npm run tunnel
```

Copy the HTTPS forwarding URL shown by ngrok.

## Configure NotchPay

In the test-mode NotchPay dashboard, register this complete webhook URL (the ngrok base URL alone is not sufficient):

```text
https://your-backend.ngrok-free.app/api/payments/webhook/notchpay
```

Subscribe at least to:

- `payment.complete`
- `payment.failed`
- `payment.canceled`

Copy the webhook signing secret to `NOTCHPAY_WEBHOOK_SECRET`, then restart the API.

The frontend can remain on `http://localhost:3000` with:

```env
VITE_API_BASE_URL=http://localhost:4000
```

Only replace it with the ngrok URL when the browser itself must call the tunneled backend.

## Security

- Use NotchPay test mode and test API keys only.
- Never commit `.env`.
- Never enter a real card in test mode.
- Free ngrok URLs can change after each restart; update the NotchPay webhook accordingly.
