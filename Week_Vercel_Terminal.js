// ==================== Vercel CLI Commands ====================
// This file documents useful terminal commands for working with Vercel
// Format: console.log("Command → explanation");


// 🔹 Installation
console.log("npm install -g vercel → installs Vercel CLI globally");


// 🔹 Login
console.log("vercel login → log into your Vercel account (via email or GitHub)");


// 🔹 Project Initialization
console.log("vercel init → start a new Vercel project interactively");


// 🔹 Deployments
console.log("vercel → deploys the current directory (default to preview)");
console.log("vercel --prod → deploys directly to production");


// 🔹 Environment Variables
console.log("vercel env ls → lists all environment variables");
console.log("vercel env add NAME → add a new environment variable");
console.log("vercel env rm NAME → remove an environment variable");
console.log("vercel env pull .env → download env vars into local .env file");


// 🔹 Project & Deployment Management
console.log("vercel projects ls → list all projects under your account");
console.log("vercel list → list recent deployments");
console.log("vercel logs <deployment-url> → view logs for a deployment");
console.log("vercel open <deployment-url> → open deployment in browser");
console.log("vercel rm <project-name> → remove a project");


// 🔹 Dev Mode (Local)
console.log("vercel dev → run project locally with Vercel dev server");


// 🔹 Aliases & Domains
console.log("vercel alias set <deployment-url> <custom-domain> → set a custom domain");
console.log("vercel alias ls → list aliases for your deployments");
console.log("vercel alias rm <alias> → remove an alias");


// 🔹 Configuration
console.log("vercel whoami → shows current logged-in user");
console.log("vercel switch → switch between accounts/teams");
console.log("vercel logout → log out from Vercel CLI");


// =============================================================
