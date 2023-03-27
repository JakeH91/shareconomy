import { Database } from "@/types/supabase";
import Post from "@/components/molecules/Post";

// import styles from "@/styles/molecules/Post.module.css";
type Post = Database["public"]["Tables"]["posts"]["Row"];

type PostsProps = {
  posts: Post[];
};

export default function Posts({ posts }: PostsProps): React.ReactElement {
  return (
    <>
      <h3>All the Posts!</h3>
      {posts
        .sort(
          (a, b) =>
            new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
        )
        .map((post) => {
          return <Post post={post} />;
        })}
    </>
  );
}
