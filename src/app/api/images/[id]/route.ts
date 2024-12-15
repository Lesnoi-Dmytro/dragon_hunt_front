import { apiServerCached } from "@/utils/axios/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const response = await apiServerCached.get(`/images/${id}`, {
      responseType: "arraybuffer",
    });

    if (response.status !== 200) {
      return NextResponse.json(
        { message: "Failed to retrieve image", statusCode: response.status },
        { status: response.status }
      );
    }

    const contentType = response.headers["content-type"];
    if (contentType === "/image/svg+xml") {
      return NextResponse.json({
        data: response.data.toString("utf-8"),
        headers: { "Content-Type": "image/svg+xml" },
      });
    }

    return new NextResponse(response.data);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "An error occurred while fetching the image" },
      { status: 500 }
    );
  }
}
