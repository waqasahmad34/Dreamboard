# Bug Fix: Combination Reactions Not Showing Correct Count

## 🐛 The Problem

After clicking a reaction emoji on a combination, the count was not updating correctly on both the main view and the popup/dialog view.

## 🔍 Root Cause

The API response format differed between comment reactions and combination reactions, but the code was treating them the same way:

### API Response Formats

**Combination Reactions:**
```json
{
  "success": true,
  "reaction": {
    "likes": 5,
    "dislikes": 2
  },
  "message": "like added successfully"
}
```

**Comment Reactions:**
```json
{
  "success": true,
  "likes": 3,
  "dislikes": 1,
  "message": "like added successfully"
}
```

### The Bug

The code was trying to access `data.likes` and `data.dislikes` for both types:

```typescript
// ❌ BEFORE - Incorrect for combinations
if (response && response.ok) {
  const data = await response.json();
  setScopedState(idData, {
    likeCount: data.likes,        // ❌ undefined for combinations!
    dislikeCount: data.dislikes,  // ❌ undefined for combinations!
  });
}
```

For combination reactions, this would set `likes` and `dislikes` to `undefined`, causing the count to not display properly.

## ✅ The Fix

Added logic to check the response structure based on the reaction type:

```typescript
// ✅ AFTER - Correctly handles both types
if (response && response.ok) {
  const data = await response.json();
  
  // Get counts based on response structure
  let likes, dislikes;
  if (type === "combination" && data.reaction) {
    // Combination reactions return { reaction: { likes, dislikes } }
    likes = data.reaction.likes;
    dislikes = data.reaction.dislikes;
  } else {
    // Comment reactions return { likes, dislikes }
    likes = data.likes;
    dislikes = data.dislikes;
  }
  
  // Update with actual counts from server
  console.log(`🎉 Updated reaction counts for ${idData}:`, { likes, dislikes });
  setScopedState(idData, {
    likeCount: likes,
    dislikeCount: dislikes,
  });
  
  // Call callback if provided
  if (onReactionUpdate) {
    onReactionUpdate(likes, dislikes);
  }
}
```

## 📝 Files Changed

- `components/Grids/GridImagesAnimated/SocialReactions/SocialReactions.tsx`

## 🔄 How State Sharing Works

Both instances of `SocialReactions` for the same combination use the same `idData`:

1. **Main View**: `idData="combination-state-{combinationId}"`
2. **Popup View**: `idData="combination-state-{combinationId}"`

They share state through the `SocialReactionsProvider`, so when one updates, both should reflect the new count.

## 🎯 Expected Behavior Now

1. User clicks a reaction emoji (e.g., 👍) on the main view
2. Both the main view AND popup view counts update immediately (optimistic)
3. API call sends the reaction to the server
4. Server responds with updated counts: `{ reaction: { likes: 1, dislikes: 0 } }`
5. Code correctly extracts `likes` and `dislikes` from `data.reaction`
6. Both views update with the server-confirmed counts
7. If you refresh the page, the counts persist (loaded from database)

## 🧪 Testing Checklist

- [x] Click like on combination in main view → count increases
- [x] Check popup view → count matches
- [x] Click dislike in popup view → count increases
- [x] Check main view → count matches
- [x] Refresh page → counts persist
- [x] Console shows: `🎉 Updated reaction counts for combination-state-{id}: { likes: X, dislikes: Y }`
- [x] MongoDB shows updated `combination_reactions` document

## 🐞 Debugging

If counts still don't sync:

1. **Check Console Logs**:
   - Look for: `🎉 Updated reaction counts for combination-state-{id}`
   - Verify `likes` and `dislikes` values are correct
   - Check for any errors

2. **Verify idData is the Same**:
   ```typescript
   // Both should log the same ID
   console.log("Main view idData:", idData);
   console.log("Popup view idData:", idData);
   ```

3. **Check MongoDB**:
   - Collection: `combination_reactions`
   - Document ID: `{sessionId}_{combinationId}`
   - Verify `likes` and `dislikes` fields are updating

4. **Check API Responses**:
   - Network tab → POST to `/your-dreamboard-results/api/combination-reactions`
   - Response should include: `{ reaction: { likes, dislikes } }`

## 🎉 Result

Combination reactions now update correctly across all views and persist to the database!

