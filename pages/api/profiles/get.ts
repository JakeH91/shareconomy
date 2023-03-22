import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getProfile(
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
  try {
    const { data, error, status } = await supabaseServerClient
      .from("profiles")
      .select(
        `first_name, last_name, avatar_url, created_at, updated_at, country, postcode, email`
      )
      .eq("id", user.id)
      .single();

    if (!error) {
      return res.status(status).json(data);
    }

    throw new Error(error.message);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
