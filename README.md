# PostHog Adapter Example

Uses [Flags SDK](https://flags-sdk.dev) `pnpm i flags` and PostHog `pnpm i posthog-node` with Next.js

```
pnpm i
pnpm run dev
```

### Linked packages

This example expects to live next to a clone of the Flags SDK repository: https://github.com/vercel/flags

It `pnpm install`'s the local source code to assist with development of the adapter.

### Environment Variables

See `.env.example` for the required environment variables.

### Flags SDK usage

See `flags.ts` to understand how the PostHog adapter is used with the Flags SDK.

### Deploy to Vercel

```bash
# If you imported the project from Github to Vercel
vercel link

# If you have environment variables in Vercel, pull them down
vercel env pull

# Develop using your project settings
vercel dev

# Build locally (Since we are using linked packages)
vercel --prod

# Deploy to vercel
vercel deploy --prebuilt
```