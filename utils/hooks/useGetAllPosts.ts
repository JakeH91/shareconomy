import { Database } from "@/types/supabase";
import { useState, useEffect } from "react";

type Posts = Database["public"]["Tables"]["posts"]["Row"];

export default function useGetAllPosts(): [Posts[], boolean, string] {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<Posts[]>(null);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("api/posts/getAll", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.message && response.status !== 406) {
          throw "No posts";
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

    getAllPosts();
  }, []);

  return [data, isLoading, error];
}
