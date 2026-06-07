# AgentProof PR Demo: From "Bad" to "Fixed"

This demo shows how AgentProof PR identifies an incomplete pull request and how a developer (or AI agent) can fix it to meet quality standards.

## 🔴 Scenario 1: The "Bad" PR
A developer (or AI agent) submits a PR with a minimal description and some leftover debug code.

### PR Title: `feat: add user login`
**PR Body:**
```markdown
Adds login functionality.
```

**Files Changed:**
`src/auth.ts`
```typescript
export const login = (user, pass) => {
  console.log("Attempting login for", user); // Debug log
  // TODO: implement actual logic
  return true;
}
```

### AgentProof Result: ❌ FAILED
**Score:** 40/100

**Issues:**
- ❌ **Blocker:** No linked ticket found in PR body.
- ❌ **Blocker:** Summary is too short (less than 50 characters).
- ⚠️ **Warning:** Test evidence section is missing.
- ⚠️ **Warning:** Placeholder `TODO` found in `src/auth.ts`.
- ⚠️ **Warning:** Debug statement `console.log` found in `src/auth.ts`.

---

## 🟢 Scenario 2: The "Fixed" PR
The developer (or AI agent) sees the AgentProof feedback and updates the PR.

### PR Title: `feat: add user login`
**PR Body:**
```markdown
## Summary
This PR implements the core login logic using the new Auth provider.
Fixes #123

## Test Evidence
- Verified login with valid credentials in staging.
- Verified error handling for invalid passwords.
```

**Files Changed:**
`src/auth.ts`
```typescript
export const login = (user, pass) => {
  const isAuthenticated = AuthService.authenticate(user, pass);
  return isAuthenticated;
}
```

### AgentProof Result: ✅ PASSED
**Score:** 100/100

**Passed Checks:**
- ✅ Linked ticket found (#123).
- ✅ Summary is descriptive.
- ✅ Test evidence provided.
- ✅ No placeholders or debug logs found.

---

## Why this matters
Without AgentProof, a human reviewer would have had to:
1. Ask "Which ticket is this for?"
2. Say "Can you add more description?"
3. Ask "How did you test this?"
4. Point out the `TODO` and `console.log`.

**With AgentProof, the human reviewer only sees the "Fixed" version, saving everyone time.**
