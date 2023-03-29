import { Database } from "@/types/supabase";
import styles from "@/styles/molecules/Post.module.css";
import FormSubmit from "@/components/atoms/FormAtoms/FormSubmit";
import InputWithLabel from "@/components/atoms/FormAtoms/InputWithLabel";
import { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Comments from "@/components/molecules/Comments";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

type Post = Database["public"]["Tables"]["posts"]["Row"];
type Comment = Database["public"]["Tables"]["comments"]["Row"];

type PostProps = {
  post: Post & { comments: Comment[] };
};

export default function Post({ post }: PostProps): React.ReactElement {
  const [loading, setLoading] = useState(false);

  // TODO: Make this listener WORK!!!!!
  const supabase = useSupabaseClient();
  supabase
    .channel("comment-insert-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "comments" },
      (payload) => {
        console.log("PAYLOAD:", payload);
        // setPost((current) => [...current, payload.new]);
      }
    )
    .subscribe();

  const onSubmit: SubmitHandler<Comment> = async (data) => {
    try {
      setLoading(true);

      const updates = {
        content: data.content,
        post_id: post.id,
      };

      await fetch("api/comments/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      alert("Comment created!");
    } catch (error) {
      alert("Error creating the comment!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // TODO: Clear form after submission
  return (
    <div className={styles.wrapper}>
      <h4>{post.title}</h4>
      <p>{post.content}</p>
      <p>{post.comments?.length ?? 0} comments</p>
      <FormSubmit buttonText="Post Comment" onSubmit={onSubmit}>
        <InputWithLabel label={"Comment"} id={"content"} />
      </FormSubmit>
      <Comments comments={post.comments} />
    </div>
  );
}
