# Boilerplate for Next.js integration NextAuth.js v5 (Auth.js)

## NextAuth (v5)

- Server-side: functions from `/src/auth.ts`, only auto update Server-side session.
- Client-side: functions from lib `next-auth/react`, only auto update Client-side session.
- 2 side session not sync.

> E.g. after 'signIn' from auth.ts, it only auto update session server-side, client-side not update.

- Solve:

> Reload page bruh ¬_¬
> Using `update()` from `useSession` to update session after actions.
> Or using correct function from server/client side. Like `signOut` from `next-auth/react` in client component.

- That why in this project, login with OAuth no problem but login with credentials cause error. Because, `OAuth` component is client and it use `signIn` from `next-auth/react`

## Features

1. Login
   - Credentials
   - OAuth
2. Register
3. Verification user (email link)
4. Reset password (email link)
5. 2FA/Verification when login (token)
6. Update settings/profile
7. Case get/test session data from server-side and client-side
8. Middleware to secure route

## Deployment

1. `npm run build`
2. Import environment
3. Update deploy domain in OAuth provider

## Resend

1. Need own domain
2. Add it to resend
3. Set config resend to domain
4. Success -> update mail.ts to new domain

## Docker

1. `docker compose up -d` to start compose
2. `docker compose down -v` to shutdown compose and clear volume

## Prisma

1. `npx prisma generate` to generate prisma client
2. `npx prisma db push` to push schema to db
3. (optional) `npx prisma migrate reset` to reset all data in db
