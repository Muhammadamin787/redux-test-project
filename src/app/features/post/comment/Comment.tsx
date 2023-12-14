import CustomSkeleton from "../../../../components/CustomSkeleton"
import { List } from 'antd';
import CommentTitle from "./CommentTitle";
import { IComment } from "../../../../types";
import "./comment.scss";

type CommentProps = {
     comment: IComment
     isLoading: boolean
}

const Comment = ({ comment, isLoading }: CommentProps) => {
     return (
          <List.Item className="post-comment">
               <CustomSkeleton
                    style={{ display: "flex", gap: "5px" }}
                    description={comment.body}
                    isLoading={isLoading}
                    avatarId={comment.id}
                    title={
                         <CommentTitle username={comment.user.username} />
                    }
               />
          </List.Item>
     )
}

export default Comment;