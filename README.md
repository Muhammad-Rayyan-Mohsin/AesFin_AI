# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c5fe5001-2a76-4401-b705-208fe95bcc92

## Waitlist Setup with Supabase

This project includes a waitlist feature using Supabase to store email addresses. Follow these steps to set it up:

1. **Create a Supabase account and project**
   - Sign up at [Supabase](https://supabase.com/) if you haven't already
   - Create a new project
   - Once your project is created, go to Project Settings > API to find your URL and anon/public key

2. **Create the waitlist table**
   - In your Supabase dashboard, go to the Table Editor
   - Create a new table called `waitlist` with these columns:
     - `id` (type: uuid, primary key, default: uuid_generate_v4())
     - `email` (type: text, unique: true)
     - `created_at` (type: timestamp with time zone, default: now())

3. **Configure environment variables**
   - Copy the `.env.local.example` file to `.env.local`
   - Fill in your Supabase URL and anon key in the `.env.local` file:
     ```
     VITE_SUPABASE_URL=your_supabase_url_here
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
     ```

4. **Test the waitlist functionality**
   - Start your development server
   - Navigate to the waitlist section
   - Submit an email address to make sure everything works

5. **View waitlist submissions**
   - Log into your Supabase dashboard
   - Go to the Table Editor > waitlist table to see all collected email addresses

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c5fe5001-2a76-4401-b705-208fe95bcc92) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c5fe5001-2a76-4401-b705-208fe95bcc92) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
