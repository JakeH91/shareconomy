import { Database } from "@/types/supabase";
import Post from "@/components/molecules/Post";

// import styles from "@/styles/molecules/Posts.module.css";
type PostType = Database["public"]["Tables"]["posts"]["Row"];
type Comment = Database["public"]["Tables"]["comments"]["Row"];
type PostWithComments = PostType & { comments: Comment[] };
type PostsProps = {
  posts: PostWithComments[];
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
          return <Post key={post.id} post={post} />;
        })}
    </>
  );
}
