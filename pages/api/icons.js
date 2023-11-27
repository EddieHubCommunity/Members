import logger from "@config/logger";
import connectMongo from "@config/mongo";
import Link from "@models/Link";

export default async function handler(req, res) {
  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  const icons = await getPopularIcons();
  return res.status(200).json(icons);
}

export async function getPopularIcons() {
  await connectMongo();
  let icons = [];
  try {
    icons = await Link.aggregate([
      {
        $group: {
          _id: "$icon",
          count: { $count: {} },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 20,
      },
      {
        $project: { _id: 0, icon: "$_id", count: 1 },
      },
    ]).exec();
  } catch (e) {
    logger.error(e, "Failed to load popular icons");
    icons = [];
  }

  return JSON.parse(JSON.stringify(icons));
}
