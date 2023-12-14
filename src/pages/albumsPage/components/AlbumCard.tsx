/* eslint-disable react/prop-types */

import { DeleteOutlined, EditOutlined, StarOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, Checkbox, message } from "antd";
import { memo } from "react";
import { Link } from "react-router-dom";
import { albumsURL } from "../../../api/auth";
import { deleteRequest } from "../../../api/requests";
import CustomSkeleton from "../../../components/CustomSkeleton";
import CustomTooltip from "../../../components/CustomTooltip";
import UserName from "../../../components/UserName";
import { useFavouriteAlbums } from "../../../context/favouriteAlbumsContext";
import { useModal } from "../../../context/modalContext";

const AlbumCard = ({
     album,
     users,
     isLoading,
     avatarId,
     selectedAlbums,
     setSelectAlbums,
}) => {
     // Hooks
     const queryClient = useQueryClient();
     const [, setModalOptions] = useModal();
     const [favouriteAlbums, setFavouriteAlbums] = useFavouriteAlbums();
     const isFoundInFavourites = favouriteAlbums.find(
          (favAlbum) => favAlbum.id === album.id
     );

     // Mutations
     const { mutate, isLoading: deleteLoading } = useMutation({
          mutationFn: (id) => deleteRequest(albumsURL, id),
          onSuccess: (_, deletedAlbumId) => {
               queryClient.setQueryData(["albums"], (response) => {
                    const updatedList = response.data.filter(
                         (album) => album.id !== deletedAlbumId
                    );
                    return { ...response, data: updatedList };
               });
               message.success("Удалено!");
          },
          onError: () => message.error("Произошла ошибка!"),
     });

     const onClickEdit = () => {
          setModalOptions({
               isOpen: true,
               item: album,
          });
     };

     const onClickDelete = () => {
          mutate(album.id);
     };

     const onClickSelect = () => {
          const foundAlbum = selectedAlbums.find((saved) => saved.id == album.id);
          const updatedSelectAlbums = foundAlbum
               ? selectedAlbums.filter((al) => al.id !== album.id)
               : [...selectedAlbums, album];
          setSelectAlbums(updatedSelectAlbums);
     };

     const onClickFavourite = () => {
          const foundPost = favouriteAlbums.find((saved) => saved.id == album.id);
          const updatedFavourites = foundPost
               ? favouriteAlbums.filter((al) => al.id !== album.id)
               : [...favouriteAlbums, album];
          setFavouriteAlbums(updatedFavourites);
     };

     const cardStyle = {
          width: 400,
          borderRadius: 0,
          marginTop: 16,
          borderColor: isFoundInFavourites ? "orange" : "",
     };

     return (
          <div className="album-card">
               <Card
                    style={cardStyle}
                    bodyStyle={{ borderRadius: 0 }}
                    actions={[
                         <CustomTooltip
                              title="Редактировать"
                              onClick={onClickEdit}
                              icon={<EditOutlined />}
                              key="2"
                         />,
                         <CustomTooltip
                              title="Удалить"
                              color="red"
                              icon={<DeleteOutlined />}
                              key="3"
                              confirmTitle="Будет удален!"
                              okText="Удалить!"
                              cancelText="Отменить"
                              onConfirm={onClickDelete}
                              loading={deleteLoading}
                         />,
                         <CustomTooltip
                              icon={<StarOutlined style={{ path: "red" }} />}
                              onClick={onClickFavourite}
                              title="В избранное"
                              color="orange"
                              key="4"
                              isActive={isFoundInFavourites}
                         />,
                         <CustomTooltip
                              icon={<StarOutlined />}
                              title="Отметить"
                              key="5"
                         >
                              <Checkbox
                                   onChange={onClickSelect}
                                   checked={selectedAlbums.find(
                                        (selAlbum) => selAlbum.id === album.id
                                   )}
                                   style={{
                                        transform: "scale(1.6)",
                                        marginTop: "4px",
                                   }}
                              />
                         </CustomTooltip>,
                    ]}
               >
                    <CustomSkeleton
                         description={
                              <UserName
                                   users={users}
                                   userId={album.userId}
                                   style={{ marginTop: "-10px" }}
                              />
                         }
                         isLoading={isLoading}
                         avatarId={avatarId}
                         title={<Link to={"albums/" + album.id}>{album.title}</Link>}
                    />
               </Card>
          </div>
     );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(AlbumCard);
