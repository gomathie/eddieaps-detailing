# Eddie APS Detailing Website

Eddie APS Detailing is a premium, fully-responsive, and SEO-optimized web platform built for high-end auto detailing services. It features an interactive Booking Wizard, Quote Estimator, Before/After image comparison sliders, a dynamic SEO blog, and a secure Administrative Dashboard.

---

## 🛠️ Tech Stack

- **Frontend & Server Framework:** [Nuxt 3](https://nuxt.com/) (using Nuxt 4 directory structures)
- **UI & Styling:** [Nuxt UI v2](https://ui.nuxt.com/v2) (integrated with Tailwind CSS v3)
- **Database ORM:** [Drizzle ORM](https://orm.drizzle.team/) (using SQLite driver)
- **Cloud Infrastructure:** [Cloudflare Pages & Workers](https://pages.cloudflare.com/)
- **Data Binding Services:**
  - **D1 Database:** For relational user records, bookings, quotes, and blog data.
  - **R2 Storage:** For hosting vehicle inspection and portfolio photos.
  - **KV Storage:** For static config and query caching.

---

## 📂 Key Folders

- `/app/pages/` - Frontend views (Homepage, booking wizard, custom quote reports, and blog posts).
- `/app/components/` - Global components (Navigation header, detail footers, and comparison slider adapters).
- `/app/server/` - Nitro server API routes and administrative security middlewares.
- `/app/server/database/` - Drizzle schemas and D1 database migrations.

---

## 🚀 Getting Started

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Apply Local Database Migrations
Initialize the local SQLite database from Drizzle schema migrations:
```bash
npx wrangler d1 execute eddie-aps-db --local --file=./app/server/database/migrations/0000_fearless_mordo.sql
```
This sets up tables in the local emulator directory (`.wrangler/state/v3/d1`).

### 3. Run Development Server
Spin up the local Nuxt environment under the Wrangler emulator:
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

---

## 🔐 Admin Console access

You can log into the secure Admin Dashboard at `/admin/login` to manage booking schedules, review custom quotes, and handle incoming contact inquiries.

- **Username:** `admin`
- **Password:** `eddie-aps-admin-2026`

---

## 📦 Deployment (Cloudflare Pages)

To compile static assets and deploy your platform directly to Cloudflare Pages, execute:
```bash
npm run deploy
```
This generates the Nitro bundle and triggers `wrangler pages deploy .output/public` to push your workspace updates to production.

---

## ⚙️ Drizzle DB Operations

If you modify the database schema at `app/server/database/schema.ts`, you can update migrations using:

- **Generate Migration SQL:**
  ```bash
  npx drizzle-kit generate
  ```
- **Apply Migration Locally:**
  ```bash
  npx wrangler d1 execute eddie-aps-db --local --file=./app/server/database/migrations/xxxx_migration_name.sql
  ```
- **Open Drizzle Studio (Local Database Inspector):**
  ```bash
  npx drizzle-kit studio
  ```
