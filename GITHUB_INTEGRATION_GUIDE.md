# GitHub Integration Setup Guide

## Overview

Your portfolio now fetches **real GitHub data** using a secure server-side loader. The integration:

- ✅ Fetches repositories and commit history from GitHub API
- ✅ Groups commits by calendar year
- ✅ Calculates first/last commit dates and counts per year
- ✅ Caches results for 1 hour to respect rate limits
- ✅ Falls back to mock data if credentials aren't configured

## Setup Instructions

### 1. Generate GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Set a descriptive name: `Portfolio Website`
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - Or just `public_repo` if you only want public repos
5. Click **"Generate token"**
6. **Copy the token immediately** (you won't see it again)

### 2. Configure Environment Variables

Edit `.env` in your project root:

```env
GITHUB_TOKEN=ghp_your_actual_token_here
GITHUB_USERNAME=DoharDNR
```

⚠️ **Important**: Never commit `.env` to git. It's already in `.gitignore`.

### 3. Update Author Email (Optional)

In `app/routes/projects.tsx` line 43, update the email to match your GitHub commit email:

```ts
const authorEmail = "doharsiregar10@gmail.com"; // Your GitHub email
```

This filters commits to only show **your contributions** in shared repositories.

### 4. Test the Integration

#### Development Mode:
```bash
npm run dev
```

Visit: http://localhost:5173/projects

#### Check Logs:
The server will log:
- `"Returning cached GitHub data"` (if cache hit)
- `"Fetched X years of GitHub data"` (if API call)
- `"GitHub credentials not configured. Using mock data."` (if `.env` missing)
- `"Failed to fetch GitHub data: ..."` (if API error)

### 5. Production Deployment

When deploying (Vercel, Netlify, etc.), add environment variables in the platform's dashboard:

**Vercel:**
1. Go to project settings → Environment Variables
2. Add `GITHUB_TOKEN` and `GITHUB_USERNAME`

**Netlify:**
1. Site settings → Build & deploy → Environment
2. Add the same variables

## How It Works

### Data Flow

```
User visits /projects
    ↓
Server-side loader runs
    ↓
Check cache (1 hour TTL)
    ↓ (if miss)
Fetch from GitHub API:
  - Get all repositories
  - For each repo, get commits per year
  - Group by year
  - Calculate metadata
    ↓
Cache result
    ↓
Return to client
    ↓
Render timeline
```

### Rate Limits

- **Authenticated requests**: 5,000 requests/hour
- **Cache TTL**: 1 hour (reduces API calls)
- **Pagination**: Automatically handles large repos

### Fallback Strategy

1. **Primary**: Real GitHub data (if credentials configured)
2. **Cache**: Cached data (if available)
3. **Fallback**: Mock data (if API fails or credentials missing)

## Customization

### Change Cache Duration

Edit `app/routes/projects.tsx` line 50:

```ts
cache.set(cacheKey, projectHistory, 3600000); // 1 hour in ms
```

### Filter Repositories

Edit `app/services/github.server.ts` line 144:

```ts
const activeRepos = repos.filter((repo) => 
  !repo.archived && 
  !repo.private &&
  repo.stargazers_count > 0 // Example: only show starred repos
);
```

### Auto-Feature Logic

Edit `app/services/github.server.ts` line 176:

```ts
featured: repo.stargazers_count > 5, // Change threshold
```

### Technology Detection

Currently extracts from `repo.language`. Enhance in `github.server.ts` to parse `package.json`, `requirements.txt`, etc.

## Manual Repository Allowlist (Recommended)

Instead of automatically fetching all repositories, you can **manually specify exactly which repositories** should appear on your timeline.

### Step 1: Define Your Repositories

Edit `app/services/github.server.ts` and add your repositories to the `REPO_ALLOWLIST` array:

```ts
export const REPO_ALLOWLIST: ConfigurableRepo[] = [
  {
    owner: "your_github_username",
    name: "your-repo-name",
    url: "https://github.com/your_github_username/your-repo-name",
    title: "Your Project Title",
    description: "Concise project description...",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    featured: true,                        // Shows "Featured" badge
    iconType: "e-commerce",               // Options: "e-commerce", "task-management", "blog", "auth", "mobile"
    displayOrder: 1,                      // Sort order within each year
    commitAuthorEmail: "your_email@example.com",  // Optional: filter commits by email
  },
  // Add more repositories...
];
```

### Available Fields

| Field | Required | Description |
|-------|----------|-------------|
| `owner` | ✅ | GitHub username or org |
| `name` | ✅ | Repository name |
| `url` | ✅ | Full GitHub URL |
| `title` | ✅ | Display title |
| `description` | ✅ | Portfolio description |
| `technologies` | ✅ | Curated tech stack |
| `featured` | ✅ | Show "Featured" badge |
| `iconType` | ✅ | Icon color scheme |
| `displayOrder` | ❌ | Sort order (default: 1, 2, 3...) |
| `commitAuthorEmail` | ❌ | Custom email filter (uses loader email by default) |

### Icon Types

| Type | Color |
|------|-------|
| `e-commerce` | Indigo |
| `task-management` | Emerald |
| `blog` | Fuchsia |
| `auth` | Sky |
| `mobile` | Amber |

### Example

See `REPO_ALLOWLIST_EXAMPLE.ts` for a full example with comments.

### Behavior

- When `REPO_ALLOWLIST` is **non-empty**: Only specified repos are fetched
- When `REPO_ALLOWLIST` is **empty**: Falls back to automatic mode (fetches all public repos)
- Commit history is checked for each repo across years
- Only years with your commits will appear in the timeline

## Troubleshooting

### "403 Forbidden" Error
- Check token has correct scopes
- Verify rate limits: https://api.github.com/rate_limit

### Empty Timeline
- Verify `GITHUB_USERNAME` is correct
- Check `authorEmail` matches your GitHub commit email
- Try with mock data to test UI

### Slow Loading
- First load fetches from GitHub (may take 10-30 seconds for many repos)
- Subsequent loads use cache (instant)
- Consider static generation for production

## Files Created

```
.env.example                         # Template for credentials
app/services/github.server.ts        # GitHub API integration
app/services/cache.server.ts         # In-memory cache
app/routes/projects.tsx (updated)    # Loader integration
```

## Next Steps

1. ✅ Add real credentials to `.env`
2. ✅ Test in development
3. ✅ Deploy with environment variables
4. 🔄 (Optional) Add static generation for faster loads
5. 🔄 (Optional) Enhance technology detection

---

**Created**: October 20, 2026  
**Status**: ✅ Ready for production
