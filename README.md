# Northgate Vault

React frontend and Express API for confidential quote requests.

## Local setup

1. Copy `.env.example` to `.env` and provide the required values.
2. Run the SQL in `db/init.sql` once in the Neon SQL editor.
3. Install dependencies: `npm install --cache .npm-cache`
4. Start the frontend locally with `npm run dev`, or use `npm run build` then `npm start` to run the production-style Express service on port 4000.

## Render deployment

Create a Render Blueprint from this repository; Render reads `render.yaml`, builds the Vite site, and serves it through Express. Add `DATABASE_URL`, `RESEND_API_KEY`, and `ADMIN_EMAIL` in Render's environment settings. Set `EMAIL_FROM` to a sender address verified in Resend before production sending.

If the frontend is hosted separately, set `CORS_ORIGIN` to its exact URL. It is not needed when using the bundled Render service.
