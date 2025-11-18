import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/lib/mongodb";
import Comment from "@/lib/models/Comment";

type RouteParams = {
  params: {
    commentId: string;
  };
};

/**
 * POST /api/comments/[commentId]/reactions
 * Add a like or dislike to a comment
 * Body: { type: 'like' | 'dislike' }
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { commentId } = params;
    const body = await request.json();
    const { type } = body;

    // Validation
    if (!type || (type !== "like" && type !== "dislike")) {
      return NextResponse.json(
        {
          success: false,
          error: "type must be either 'like' or 'dislike'",
        },
        { status: 400 }
      );
    }

    await connectMongoose();

    // Find the comment
    const comment = await Comment.findOne({ id: commentId, isDeleted: false });

    if (!comment) {
      return NextResponse.json(
        {
          success: false,
          error: "Comment not found",
        },
        { status: 404 }
      );
    }

    // Increment the appropriate counter
    if (type === "like") {
      comment.likes += 1;
    } else {
      comment.dislikes += 1;
    }

    await comment.save();

    return NextResponse.json({
      success: true,
      likes: comment.likes,
      dislikes: comment.dislikes,
      message: `${type} added successfully`,
    });
  } catch (error) {
    console.error("❌ Error adding reaction to comment:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to add reaction",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/comments/[commentId]/reactions
 * Remove a like or dislike from a comment
 * Body: { type: 'like' | 'dislike' }
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { commentId } = params;
    const body = await request.json();
    const { type } = body;

    // Validation
    if (!type || (type !== "like" && type !== "dislike")) {
      return NextResponse.json(
        {
          success: false,
          error: "type must be either 'like' or 'dislike'",
        },
        { status: 400 }
      );
    }

    await connectMongoose();

    // Find the comment
    const comment = await Comment.findOne({ id: commentId, isDeleted: false });

    if (!comment) {
      return NextResponse.json(
        {
          success: false,
          error: "Comment not found",
        },
        { status: 404 }
      );
    }

    // Decrement the appropriate counter (but not below 0)
    if (type === "like" && comment.likes > 0) {
      comment.likes -= 1;
    } else if (type === "dislike" && comment.dislikes > 0) {
      comment.dislikes -= 1;
    }

    await comment.save();

    return NextResponse.json({
      success: true,
      likes: comment.likes,
      dislikes: comment.dislikes,
      message: `${type} removed successfully`,
    });
  } catch (error) {
    console.error("❌ Error removing reaction from comment:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to remove reaction",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

