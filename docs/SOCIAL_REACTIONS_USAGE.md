# SocialReactions Component - API Integration Guide

The `SocialReactions` component has been updated to integrate with the MongoDB backend for persistent like/dislike tracking.

## Features

- ✅ **Persistent Storage**: All reactions are saved to MongoDB
- ✅ **Optimistic Updates**: Instant UI feedback with automatic rollback on errors
- ✅ **Dual Mode**: Works for both comments and design combinations
- ✅ **Backward Compatible**: Still works without API integration for UI-only reactions
- ✅ **Animated Reactions**: Beautiful floating emoji animations
- ✅ **Cooldown System**: 3-second cooldown to prevent spam

## Usage

### 1. Comment Reactions

Use this when you want to track reactions on individual comments:

```tsx
import SocialReactions from "@/components/Grids/GridImagesAnimated/SocialReactions/SocialReactions";

<SocialReactions
  // Required for API integration
  type="comment"
  commentId={comment.id}
  
  // Optional: Initial counts from database
  initialLikes={comment.likes || 0}
  initialDislikes={comment.dislikes || 0}
  
  // Standard props
  idData={`comment-state-${comment.id}`}
  idAnimation={`comment-animation-${comment.id}`}
  className="flex-row"
  classNameSocialReactionsList="top-[-50px] left-[0px]"
  classNameReactionItem="!text-[15px]"
  classNameFloatingIcon="text-[20px]"
  
  // Optional callback when counts change
  onReactionUpdate={(likes, dislikes) => {
    console.log(`Updated: ${likes} likes, ${dislikes} dislikes`);
  }}
/>
```

### 2. Combination Reactions

Use this when you want to track reactions on design combinations:

```tsx
import SocialReactions from "@/components/Grids/GridImagesAnimated/SocialReactions/SocialReactions";

<SocialReactions
  // Required for API integration
  type="combination"
  sessionId={sessionId}
  combinationId={combinationId}
  
  // Standard props
  idData={`combination-${combinationId}`}
  idAnimation={`combination-animation-${combinationId}`}
  className="flex-row gap-[10px]"
  
  // Optional callback
  onReactionUpdate={(likes, dislikes) => {
    // Update local state or trigger re-fetch
    console.log(`Combination ${combinationId}: ${likes} likes, ${dislikes} dislikes`);
  }}
/>
```

### 3. UI-Only Mode (No API Integration)

If you don't provide `type`, the component works in UI-only mode (local state only):

```tsx
<SocialReactions
  idData="ui-only-reactions"
  className="flex-row"
/>
```

## Props Reference

### API Integration Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `"comment" \| "combination"` | No | Type of reaction (enables API integration) |
| `commentId` | `string` | Yes (if type="comment") | The comment's ID |
| `sessionId` | `string` | Yes (if type="combination") | The session ID |
| `combinationId` | `string` | Yes (if type="combination") | The combination ID |
| `initialLikes` | `number` | No | Initial like count (for comments) |
| `initialDislikes` | `number` | No | Initial dislike count (for comments) |
| `onReactionUpdate` | `(likes: number, dislikes: number) => void` | No | Callback when counts change |

### Standard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `idData` | `string` | `"default"` | Unique ID for state management |
| `idAnimation` | `string` | Same as `idData` | ID for animation rendering |
| `className` | `string` | - | Custom CSS classes |
| `classNameSocialReactionsList` | `string` | - | Classes for the reactions popup |
| `classNameReactionItem` | `string` | - | Classes for individual reaction buttons |
| `classNameFloatingIcon` | `string` | - | Classes for floating emoji icons |

## API Endpoints Used

### Comment Reactions
- `POST /api/comments/[commentId]/reactions` - Add reaction
- Response includes updated `likes` and `dislikes` counts

### Combination Reactions
- `GET /api/combination-reactions` - Fetch counts (on mount)
- `POST /api/combination-reactions` - Add reaction
- Response includes updated `likes` and `dislikes` counts

## Reaction Types

The component supports 8 different emoji reactions:

**Likes (counts as +1 like):**
- 👍 Like
- ♥️ Heart
- 😀 Smile
- 😍 Love
- 😁 Laugh

**Dislikes (counts as +1 dislike):**
- 👎 Dislike
- 🥲 Sad
- 😡 Angry

## Implementation Example: Comments.tsx

Here's how it's implemented in the Comments component:

```tsx
{commentsSorted.map((comment, index) => (
  <div key={comment.id}>
    {/* ... comment content ... */}
    
    <SocialReactions
      type="comment"
      commentId={comment.id}
      initialLikes={comment.likes || 0}
      initialDislikes={comment.dislikes || 0}
      idData={`comment-state-${comment.id}`}
      idAnimation={`comment-animation-${comment.id}`}
      className="flex-row"
      onReactionUpdate={(likes, dislikes) => {
        // Optionally refetch comments or update local state
      }}
    />
  </div>
))}
```

## Error Handling

The component includes automatic error handling:

1. **Optimistic Updates**: UI updates immediately for better UX
2. **Automatic Rollback**: If API call fails, the count reverts
3. **Console Logging**: Errors are logged to console for debugging
4. **Graceful Degradation**: Falls back to local state if API is unavailable

## Performance Considerations

- **Cooldown**: 3-second cooldown prevents excessive API calls
- **Debouncing**: Multiple quick clicks are prevented
- **Optimistic Updates**: No loading state needed, instant feedback
- **Scoped State**: Each component instance has isolated state

## Migration Guide

If you're updating existing `SocialReactions` usage:

### Before:
```tsx
<SocialReactions
  idData="my-reactions"
  className="flex-row"
/>
```

### After (with API integration):
```tsx
<SocialReactions
  type="comment"  // or "combination"
  commentId={comment.id}  // or sessionId + combinationId
  initialLikes={comment.likes || 0}
  initialDislikes={comment.dislikes || 0}
  idData="my-reactions"
  className="flex-row"
/>
```

The component is **100% backward compatible** - existing usage without `type` prop will continue to work as before!

