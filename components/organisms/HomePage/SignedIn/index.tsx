import FormSubmit from "@/components/atoms/FormAtoms/FormSubmit";
import InputWithLabel from "@/components/atoms/FormAtoms/InputWithLabel";
import Posts from "@/components/molecules/Posts";
import styles from "@/styles/pages/Home.module.css";
import { Database } from "@/types/supabase";
import useGetAllPosts from "@/utils/hooks/useGetAllPosts";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

type PostsType = Database["public"]["Tables"]["posts"]["Row"];

export default function HomePageSignedIn() {
  const user = useUser();
  const [posts, setPosts] = useState([]);
  const [postsSet, setPostsSet] = useState(false);
  const [allPosts, isLoading, error] = useGetAllPosts();

  useEffect(() => {
    if (!isLoading && !postsSet) {
      setPosts((current) => [...current, ...allPosts]);
      setPostsSet(true);
    }
  }, [isLoading, postsSet, setPosts, setPostsSet]);

  const supabase = useSupabaseClient();
  supabase
    .channel("posts-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "posts" },
      (payload) => {
        setPosts((current) => [...current, payload.new]);
      }
    )
    .subscribe();
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<PostsType> = async (data) => {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const updates = {
        title: data.title,
        content: data.content,
      };

      await fetch("api/posts/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      alert("Post created!");
    } catch (error) {
      alert("Error creating the post!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // TODO: Clear form after submission
  return (
    <main className={"flex-column"}>
      <h2>Ask for help!</h2>
      <FormSubmit
        styles={styles}
        onSubmit={onSubmit}
        buttonText={loading ? "Loading ..." : "Update"}
      >
        <>
          <InputWithLabel id={"title"} label={"Title:"} type={"text"} />
          <InputWithLabel id={"content"} label={"Content:"} type={"text"} />
        </>
      </FormSubmit>
      <Posts posts={posts} />
    </main>
  );
}
