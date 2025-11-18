# Reactions API Documentation

This document describes the like/dislike reactions system for both comments and combinations.

## Overview

The system supports two types of reactions:

1. **Comment Reactions**: Like/dislike individual comments
2. **Combination Reactions**: Like/dislike entire design combinations

## Database Models

### Comment Model
Located: `lib/models/Comment.ts`

Includes:
- `likes`: Number (default: 0)
- `dislikes`: Number (default: 0)

### CombinationReaction Model
Located: `lib/models/CombinationReaction.ts`

Structure:
- `id`: String (format: `{sessionId}_{combinationId}`)
- `sessionId`: String
- `combinationId`: String
- `likes`: Number (default: 0)
- `dislikes`: Number (default: 0)

## API Endpoints

### Comment Reactions

#### Add Reaction to Comment
```
POST /api/comments/[commentId]/reactions
```

**Body:**
```json
{
  "type": "like" | "dislike"
}
```

**Response:**
```json
{
  "success": true,
  "likes": 5,
  "dislikes": 2,
  "message": "like added successfully"
}
```

#### Remove Reaction from Comment
```
DELETE /api/comments/[commentId]/reactions
```

**Body:**
```json
{
  "type": "like" | "dislike"
}
```

**Response:**
```json
{
  "success": true,
  "likes": 4,
  "dislikes": 2,
  "message": "like removed successfully"
}
```

### Combination Reactions

#### Get Combination Reactions
```
GET /api/combination-reactions?sessionId={sessionId}&combinationId={combinationId}
```

**Response:**
```json
{
  "success": true,
  "reaction": {
    "id": "session123_combo456",
    "sessionId": "session123",
    "combinationId": "456",
    "likes": 10,
    "dislikes": 3
  }
}
```

If no reactions exist yet, returns default values (0 likes, 0 dislikes).

#### Add Reaction to Combination
```
POST /api/combination-reactions
```

**Body:**
```json
{
  "sessionId": "session123",
  "combinationId": "456",
  "type": "like" | "dislike"
}
```

**Response:**
```json
{
  "success": true,
  "reaction": {
    "id": "session123_456",
    "sessionId": "session123",
    "combinationId": "456",
    "likes": 11,
    "dislikes": 3
  },
  "message": "like added successfully"
}
```

#### Remove Reaction from Combination
```
DELETE /api/combination-reactions
```

**Body:**
```json
{
  "sessionId": "session123",
  "combinationId": "456",
  "type": "like" | "dislike"
}
```

**Response:**
```json
{
  "success": true,
  "reaction": {
    "id": "session123_456",
    "sessionId": "session123",
    "combinationId": "456",
    "likes": 10,
    "dislikes": 3
  },
  "message": "like removed successfully"
}
```

## Usage Examples

### React Component - Comment Reactions

```typescript
// Like a comment
const handleLikeComment = async (commentId: string) => {
  const response = await fetch(`/your-dreamboard-results/api/comments/${commentId}/reactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'like' }),
  });
  
  const data = await response.json();
  console.log(`Likes: ${data.likes}, Dislikes: ${data.dislikes}`);
};

// Unlike a comment
const handleUnlikeComment = async (commentId: string) => {
  const response = await fetch(`/your-dreamboard-results/api/comments/${commentId}/reactions`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'like' }),
  });
  
  const data = await response.json();
  console.log(`Likes: ${data.likes}, Dislikes: ${data.dislikes}`);
};
```

### React Component - Combination Reactions

```typescript
// Fetch combination reactions
const fetchReactions = async (sessionId: string, combinationId: string) => {
  const response = await fetch(
    `/api/combination-reactions?sessionId=${sessionId}&combinationId=${combinationId}`
  );
  
  const data = await response.json();
  return data.reaction;
};

// Like a combination
const handleLikeCombination = async (sessionId: string, combinationId: string) => {
  const response = await fetch('/api/combination-reactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      sessionId, 
      combinationId, 
      type: 'like' 
    }),
  });
  
  const data = await response.json();
  return data.reaction;
};
```

## TypeScript Types

### Comment Type
Located: `types/TComment.ts`

```typescript
export type TComment = {
  id: string;
  commentId: string;
  author: string;
  content: string;
  timestamp: string;
  avatar?: string;
  combinationId?: string | null;
  sessionId?: string | null;
  likes?: number;
  dislikes?: number;
};
```

### Combination Reaction Type
Located: `types/TCombinationReaction.ts`

```typescript
export type TCombinationReaction = {
  id: string;
  sessionId: string;
  combinationId: string;
  likes: number;
  dislikes: number;
};
```

## Notes

- All counters prevent negative values (minimum 0)
- Combination reactions are unique per `sessionId_combinationId` pair
- Comment reactions are stored directly in the comment document
- All reactions are persisted in MongoDB

