import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function upsertProfile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  });

  const { body } = req;
  try {
    const { data, error, status } = await supabaseServerClient
      .from("profiles")
      .upsert(body);

    if (!error) {
      return res.status(status).json(data);
    }

    throw new Error(error.message);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}
