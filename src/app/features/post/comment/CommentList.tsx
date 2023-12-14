import { List } from "antd";
import { memo } from "react";
import { useFetchCommentsQuery } from "../../../services/postApi";
import Comment from './Comment';

type CommentListProps = {
    postId: number,
    isOpen: boolean,
}

const CommentList = ({ postId, isOpen }: CommentListProps) => {

    // Queries
    const { data: comments = [], isLoading } = useFetchCommentsQuery(postId, {
        skip: !isOpen
    })

    if (!isOpen) return ''

    return (
        <div className="comment-list">
            <List
                className="demo-loadmore-list"
                loading={isLoading}
                itemLayout="horizontal"
                size="small"
                dataSource={comments}
                renderItem={(comment) => <Comment comment={comment} isLoading={isLoading} />}
            />
        </div>
    );
};

export default memo(CommentList);
