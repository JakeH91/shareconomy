import { Database } from "@/types/supabase";
import { Session, useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function useGetProfile(
  session: Session
): [Profiles, boolean, string] {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<Profiles>(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setIsLoading(true);
        if (!user) throw new Error("No user");

        const response = await fetch("api/profiles/get", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.message && response.status !== 406) {
          throw data.message;
        }

        if (data) {
          setData(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProfile();
  }, [session]);

  return [data, isLoading, error];
}
