import { apiServerCached } from "@/utils/axios/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await apiServerCached.get("users/me/image", {
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

    const serverResponse = new NextResponse(response.data);
    serverResponse.headers.set("Content-Type", contentType);
    return serverResponse;
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "An error occurred while fetching the image" },
      { status: 500 }
    );
  }
}
