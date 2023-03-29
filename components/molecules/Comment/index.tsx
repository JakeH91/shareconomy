import { Database } from "@/types/supabase";
// import styles from "@/styles/molecules/Comment.module.css";

type Comment = Database["public"]["Tables"]["comments"]["Row"];
type CommentProps = {
  comment: Comment;
};

export default function Comment({ comment }: CommentProps): React.ReactElement {
  return (
    <div>
      <p>{comment.content}</p>
    </div>
  );
}
