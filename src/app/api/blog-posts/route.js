import { getBlogPostList } from "@/helpers/file-helpers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogPosts = await getBlogPostList();
    return NextResponse.json(blogPosts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
