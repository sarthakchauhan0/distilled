# Distilled by Starky Labs

Distilled is an edge-native, privacy-first DevTool emphasizing AI efficiency and token optimization. This architecture is designed for a globally distributed, next-generation compute environment securely running the heaviest of logic out on the edge.

## Architecture & Stack

- **Framework**: Next.js App Router (Migrated from Vite)
- **Styling**: Tailwind CSS
- **Animations**: `motion` (Optimized, lightweight implementation representing standard hardware-accelerated animations)
- **Forms & Validation**: `react-hook-form` & `zod`
- **Email Pipeline**: Integrated Resend API for auto-responders and admin notifications

## Features

1. **Global-First Waitlist**: Fully compliant, timezone-agnostic architecture optimized to capture waitlist information without centralized geographic metadata dependencies.
2. **Local Intelligence Processing**: The architecture emphasizes running compute entirely through WASM or isolated clients meaning source code never hits centralized API headquarters indiscriminately.
3. **Optimized SEO Pipeline**: Schema and Layout architecture engineered securely as a universal `SoftwareApplication`, without region-locking.

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file to securely maintain your environment context.
   ```bash
   RESEND_API_KEY=your_resend_api_key_here
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application locally.

## Deployment

This platform is purpose-built to deploy natively to Edge/Serverless environments (such as Vercel). Simply link your GitHub directory (`https://github.com/sarthakchauhan0/distilled`) and configure your environment variables to launch Distilled universally.

## License & Privacy

Please refer to our [Privacy Methodology](/privacy) for greater context into our Local-First Processing standards.

&copy; Starky Labs | Distributed Globally
