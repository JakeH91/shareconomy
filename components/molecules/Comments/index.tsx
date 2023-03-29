import { Database } from "@/types/supabase";
import Comment from "@/components/molecules/Comment";

// import styles from "@/styles/molecules/Comments.module.css";
type CommentType = Database["public"]["Tables"]["comments"]["Row"];
type CommentsProps = {
  comments: CommentType[];
};

export default function Comments({
  comments,
}: CommentsProps): React.ReactElement {
  return (
    <>
      <h5>All the Comments!</h5>
      {comments
        ?.sort(
          (a, b) =>
            new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
        )
        ?.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
    </>
  );
}
