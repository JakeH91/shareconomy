import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getAllPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  });
  try {
    const { data, error, status } = await supabaseServerClient
      .from("posts")
      .select(`created_at, updated_at, profile_id, title, content`);

    if (!error) {
      return res.status(status).json(data);
    }

    throw new Error(error.message);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
