import {
    CommentOutlined,
    DeleteOutlined,
    EditOutlined,
    StarOutlined,
} from "@ant-design/icons";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Card, Checkbox, message } from "antd";
import { memo, useMemo, useState } from "react";
import CustomSkeleton from "../../../components/CustomSkeleton";
import UserName from "../../../components/UserName";
import CustomTooltipButton from "../../../components/customTooltip/CustomTooltipButton";
import { useAppDispatch, useAppSelector } from "../../../hooks/useToolkitHooks";
import type { IPost } from "../../../types";
import { selectorFavouritePosts, selectorSelectedPosts } from "../../selectors";
import { useDeletePostMutation } from "../../services/postApi";
import CommentList from "./comment/CommentList";
import "./postCard.scss";
import { setDeletePostFromCache, setFavouritePosts, setPostsModal, setSelectedPosts } from "./postSlice";

type PostCardProps = {
    post: IPost
    isLoading: boolean
    avatarId: number
    setSelectPosts?: IPost[]
}

const PostCard = ({
    post,
    isLoading,
    avatarId,
}: PostCardProps) => {

    // Helper Hooks
    const dispatch = useAppDispatch()
    const [messageApi, contextHolder] = message.useMessage()

    // Selectors
    const selectedPosts = useAppSelector(selectorSelectedPosts)
    const favouritePosts = useAppSelector(selectorFavouritePosts)

    // States
    const [isCommentsOpen, setOpenComments] = useState(false);

    // Queries
    const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation()

    // Functions
    const isSelected = useMemo(() => {
        return !!selectedPosts.find(selPost => selPost.id === post.id)
    }, [selectedPosts, post])

    const isFavourite = useMemo(() => {
        return !!favouritePosts.find(selPost => selPost.id === post.id)
    }, [favouritePosts, post])

    const onClickComments = () => {
        setOpenComments((prev) => !prev);
    };

    const onEdit = () => {
        dispatch(setPostsModal({ isOpen: true, post }))
    };

    const onDelete = () => {
        deletePost(post.id)
            .unwrap()
            .then(() => {
                messageApi.success("Удалено")
                dispatch(setDeletePostFromCache(post.id))
            })
            .catch(() => {
                messageApi.error("Ошибка")
            })
    };

    const byId = (savedPost: IPost) => savedPost.id === post.id

    const updateList = (postList: IPost[], setterPostAction: ActionCreatorWithPayload<IPost[], string>) => {
        const foundPost = postList.find(byId);
        const updatedPostList = foundPost ? postList.filter((p) => p.id !== post.id) : [...postList, post];
        dispatch(setterPostAction(updatedPostList));
    };

    const onClickFavourite = () => updateList(favouritePosts, setFavouritePosts)

    const onSelect = () => updateList(selectedPosts, setSelectedPosts)

    const cardStyle = {
        width: 400,
        borderRadius: 0,
        marginTop: 16,
        borderColor: isSelected ? "#1677FF" : isFavourite ? "orange" : "",
    };

    return (
        <div className="post-card">
            <Card
                style={cardStyle}
                bodyStyle={{ borderRadius: 0 }}
                actions={[
                    <CustomTooltipButton
                        title="Комментарии"
                        color="purple"
                        isActive={isCommentsOpen}
                        onClick={onClickComments}
                        icon={<CommentOutlined />}
                        key="1"
                    />,
                    <CustomTooltipButton
                        title="Редактировать"
                        onClick={onEdit}
                        icon={<EditOutlined />}
                        key="2"
                    />,
                    <CustomTooltipButton
                        title="Удалить"
                        color="red"
                        icon={<DeleteOutlined />}
                        key="3"
                        confirmTitle="Будет удален!"
                        okText="Удалить!"
                        cancelText="Отменить"
                        onConfirm={onDelete}
                        loading={isDeleting}
                    />,
                    <CustomTooltipButton
                        icon={<StarOutlined className={isFavourite ? "post-saved-icon" : ""} />}
                        onClick={onClickFavourite}
                        isActive={isFavourite}
                        title="В избранное"
                        color="orange"
                        key="4"
                    />,
                    <CustomTooltipButton
                        icon={<StarOutlined />}
                        title="Отметить"
                        key="5"
                    >
                        <Checkbox
                            onChange={onSelect}
                            checked={isSelected}
                            style={{
                                transform: "scale(1.6)",
                                marginTop: "4px",
                            }}
                        />
                    </CustomTooltipButton>,
                ]}
            >
                <CustomSkeleton
                    description={post.body}
                    isLoading={isLoading}
                    avatarId={avatarId}
                    title={
                        <>
                            {post.title}
                            <UserName userId={post.userId} />
                        </>
                    }
                />
            </Card>
            <CommentList isOpen={isCommentsOpen} postId={post.id} />
            {contextHolder}
        </div >
    );
};

export default memo(PostCard);
