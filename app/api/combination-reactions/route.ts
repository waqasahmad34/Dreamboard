import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/lib/mongodb";
import CombinationReaction from "@/lib/models/CombinationReaction";

/**
 * GET /api/combination-reactions
 * Fetch reactions for a specific combination
 * Query params:
 *  - sessionId: required
 *  - combinationId: required
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    const combinationId = searchParams.get("combinationId");

    if (!sessionId || !combinationId) {
      return NextResponse.json(
        {
          success: false,
          error: "sessionId and combinationId are required",
        },
        { status: 400 }
      );
    }

    await connectMongoose();

    // Find or create reaction document
    let reaction = await CombinationReaction.findOne({
      sessionId,
      combinationId: String(combinationId),
    }).lean();

    // If no reaction exists yet, return default values
    if (!reaction) {
      return NextResponse.json({
        success: true,
        reaction: {
          id: `${sessionId}_${combinationId}`,
          sessionId,
          combinationId: String(combinationId),
          likes: 0,
          dislikes: 0,
        },
      });
    }

    return NextResponse.json({
      success: true,
      reaction: {
        id: reaction.id,
        sessionId: reaction.sessionId,
        combinationId: reaction.combinationId,
        likes: reaction.likes,
        dislikes: reaction.dislikes,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching combination reactions:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch reactions",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/combination-reactions
 * Add a like or dislike to a combination
 * Body: { sessionId, combinationId, type: 'like' | 'dislike' }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, combinationId, type } = body;

    // Validation
    if (!sessionId || !combinationId || !type) {
      return NextResponse.json(
        {
          success: false,
          error: "sessionId, combinationId, and type are required",
        },
        { status: 400 }
      );
    }

    if (type !== "like" && type !== "dislike") {
      return NextResponse.json(
        {
          success: false,
          error: "type must be either 'like' or 'dislike'",
        },
        { status: 400 }
      );
    }

    await connectMongoose();

    const combinationIdString = String(combinationId);
    const id = `${sessionId}_${combinationIdString}`;

    // Find existing reaction or create new one
    let reaction = await CombinationReaction.findOne({
      sessionId,
      combinationId: combinationIdString,
    });

    if (reaction) {
      // Update existing reaction
      if (type === "like") {
        reaction.likes += 1;
      } else {
        reaction.dislikes += 1;
      }
      await reaction.save();
    } else {
      // Create new reaction
      reaction = await CombinationReaction.create({
        id,
        sessionId,
        combinationId: combinationIdString,
        likes: type === "like" ? 1 : 0,
        dislikes: type === "dislike" ? 1 : 0,
      });
    }

    return NextResponse.json(
      {
        success: true,
        reaction: {
          id: reaction.id,
          sessionId: reaction.sessionId,
          combinationId: reaction.combinationId,
          likes: reaction.likes,
          dislikes: reaction.dislikes,
        },
        message: `${type} added successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error adding reaction:", error);
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
 * DELETE /api/combination-reactions
 * Remove a like or dislike from a combination
 * Body: { sessionId, combinationId, type: 'like' | 'dislike' }
 */
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, combinationId, type } = body;

    // Validation
    if (!sessionId || !combinationId || !type) {
      return NextResponse.json(
        {
          success: false,
          error: "sessionId, combinationId, and type are required",
        },
        { status: 400 }
      );
    }

    if (type !== "like" && type !== "dislike") {
      return NextResponse.json(
        {
          success: false,
          error: "type must be either 'like' or 'dislike'",
        },
        { status: 400 }
      );
    }

    await connectMongoose();

    const combinationIdString = String(combinationId);

    // Find existing reaction
    const reaction = await CombinationReaction.findOne({
      sessionId,
      combinationId: combinationIdString,
    });

    if (!reaction) {
      return NextResponse.json(
        {
          success: false,
          error: "Reaction not found",
        },
        { status: 404 }
      );
    }

    // Decrement the count (but not below 0)
    if (type === "like" && reaction.likes > 0) {
      reaction.likes -= 1;
    } else if (type === "dislike" && reaction.dislikes > 0) {
      reaction.dislikes -= 1;
    }

    await reaction.save();

    return NextResponse.json({
      success: true,
      reaction: {
        id: reaction.id,
        sessionId: reaction.sessionId,
        combinationId: reaction.combinationId,
        likes: reaction.likes,
        dislikes: reaction.dislikes,
      },
      message: `${type} removed successfully`,
    });
  } catch (error) {
    console.error("❌ Error removing reaction:", error);
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

