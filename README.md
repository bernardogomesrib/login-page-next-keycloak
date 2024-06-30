## Getting Started

First, run the development server:

```bash
docker-compose up -d
# then
npm i
# then
npx prisma db push
# then
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:8080] configure the keycloak with the export file, configure the google settings to be able to log in with yout google account too, if you want it...

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) with your browser to see the result.


This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
shadcn-ui to show one single button and prisma to handle image search but i could just use the jwt, i didn't but i could

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
