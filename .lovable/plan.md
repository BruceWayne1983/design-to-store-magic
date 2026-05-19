Change the site password gate default from `baseline2025` to `38475554`.

## Change

**File:** `src/components/PasswordGate.tsx` (line 10)

```diff
- const SITE_PASSWORD = import.meta.env.VITE_SITE_PASSWORD || "baseline2025";
+ const SITE_PASSWORD = import.meta.env.VITE_SITE_PASSWORD || "38475554";
```

## Notes

- This is the soft password gate protecting `/home` and all storefront routes (`/shop`, `/product/*`, `/deck`, etc.).
- Anyone with an old session (sessionStorage `site_unlocked=true`) stays unlocked until they close the tab — new visitors will need `38475554`.
- The password ships in the client bundle, so it's a soft gate, not real access control.
- If `VITE_SITE_PASSWORD` is set in the deploy environment, that value overrides this default. Confirm none is set on Vercel, or update it there too.
