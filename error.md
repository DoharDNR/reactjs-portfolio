# Error Log

## Issue
`[vite] Internal server error: Server-only module referenced by client`

## Details
```
at ResolveIdContext.resolveId (/Users/dohar/Desktop/reactjs-portfolio/node_modules/@react-router/dev/dist/vite.js (1):3893:17)
```

## Cause
`cache.server.ts` imports `github.server.ts` at module level, which contains server-only logic. When Vite tries to bundle this for the client, it encounters the server-only module reference.

## Fix
Need to either:
1. Move the startup fetch into `projects.tsx` loader (back to original placement, but with startup trigger)
2. Or use React Router's `server` import suffix to mark it explicitly
3. Or lazy-load the github service import only in loader context

The root cause is the import chain: `cache.server.ts` → `github.server.ts` → client tries to resolve it.
