import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";

export default async function insertComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  });
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();
  const { body } = req;
  try {
    const { data, error, status } = await supabaseServerClient
      .from("comments")
      .insert([
        {
          id: randomUUID(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          profile_id: user.id,
          content: body.content,
          parent_post: body.post_id,
          reply_of: null,
        },
      ]);

    if (!error) {
      return res.status(status).json(data);
    }

    throw new Error(error.message);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
