import { apiServer } from "@/utils/axios/api";
import { NextResponse } from "next/server";

import cron from "node-cron";

export async function GET() {
  try {
    cron.schedule("*/5 * * * *", async () => {
      try {
        await apiServer.get("users/name/Test");
      } catch (err) {
        console.log(err);
      }
    });

    return NextResponse.json({ data: "Success", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
