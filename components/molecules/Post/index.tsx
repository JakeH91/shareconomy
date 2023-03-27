import { Database } from "@/types/supabase";

// import styles from "@/styles/molecules/Post.module.css";
type Post = Database["public"]["Tables"]["posts"]["Row"];

type PostProps = {
  post: Post;
};

export default function Post({ post }: PostProps): React.ReactElement {
  return (
    <>
      <h4>{post.title}</h4>
      <p>{post.content}</p>
    </>
  );
}
