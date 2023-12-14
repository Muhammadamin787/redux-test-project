/** @format */
import { useQueries } from "@tanstack/react-query";
import { Pagination, Spin } from "antd";
import { memo, useDeferredValue, useEffect, useState } from "react";
import { albumsURL, usersURL } from "../../api/auth";
import { getPageable, getRequest } from "../../api/requests";
import PageHead from "../../components/header/Header";
import { useFilters } from "../../context/filterContext";
import useSessionStorage from "../../hooks/useSessionStorage";
import AlbumCard from "./components/AlbumCard";
import AlbumModal from "./components/AlbumModal";
import "./albumPage.scss";
import { useFavouriteAlbums } from "../../context/favouriteAlbumsContext";

const PhotosPage = () => {

     // Hooks
     const [selectedAlbums, setSelectAlbums] = useState([]);
     const [favouriteAlbums] = useFavouriteAlbums();
     const [filters] = useFilters();
     const deferredSearchKey = useDeferredValue(filters.searchKey);
     const [sessionStorage, setSessionStorage] = useSessionStorage(
          "pageParams",
          {
               pageNumber: 10,
               pageSize: 10,
          }
     );
     const [params, setParams] = useState(sessionStorage);

     useEffect(() => {
          setSessionStorage(params);
          refetchAlbums()
     }, [params]);

     // Queries
     const [userResponse, albumsResponse] = useQueries({
          queries: [
               {
                    queryKey: ["users"],
                    queryFn: () => getRequest(usersURL),
               },
               {
                    queryKey: ["albums"],
                    queryFn: () =>
                         getPageable(albumsURL, params.pageNumber, params.pageSize),
                    select: (response) => ({
                         albums: response.data
                              .map((item, index) => ({ ...item, key: ++index }))
                              .reverse(),
                         total: response.headers["x-total-count"],
                    }),
                    keepPreviousData: true,
               },
          ],
     });
     const { data: users } = userResponse;
     const {
          data,
          isLoading: initialLoading,
          isFetching: isFetchingAlbums,
          refetch: refetchAlbums,
     } = albumsResponse;

     const onChangePagination = (pageNumber) => {
          setParams((prev) => ({ ...prev, pageNumber }));
     };

     const onShowSizeChange = (_, pageSize) => {
          setParams((prev) => ({ ...prev, pageSize }));
     };

     const filter = (album) => {
          let isTrue = true;
          if (filters.filterUsers?.length) {
               if (!filters.filterUsers.includes(album.userId)) {
                    isTrue = false;
               }
          }
          if (deferredSearchKey && album?.title) {
               if (!album.title.toUpperCase().includes(deferredSearchKey.toUpperCase())) {
                    isTrue = false;
               }
          }
          return isTrue;
     };

     const sort = (prev, next) => {
          const { property, order } = filters.sortBy || {};
          if (order === "asc") {
               if (property === "favourites") {
                    return favouriteAlbums.find((favAlbum) => favAlbum.id === prev.id)
                         ? -1
                         : 1;
               }
               return prev[property] > next[property] ? 1 : -1;
          } else {
               if (property === "favourites") {
                    return favouriteAlbums.find((favAlbum) => favAlbum.id === prev.id)
                         ? 1
                         : -1;
               }
               return prev[property] < next[property] ? 1 : -1;
          }
     };

     const AlbumCardList = () => {
          const list = filters.onlyFavourites
               ? favouriteAlbums
               : data?.albums || new Array(6).fill({});

          return list
               .filter(filter)
               .sort(sort)
               .map((album, key) => (
                    <AlbumCard
                         selectedAlbums={selectedAlbums}
                         setSelectAlbums={setSelectAlbums}
                         isLoading={initialLoading}
                         avatarId={key}
                         album={album}
                         users={users}
                         key={key}
                    />
               ));
     };

     return (
          <div className="albums-page">
               <PageHead
                    users={users}
                    title="Альбомы"
                    pageName="photos"
                    selectedItems={selectedAlbums}
                    setSelectItems={setSelectAlbums}
                    showSorters={{
                         idSorter: true,
                         userIdSorter: true,
                         favouritesSorter: true,
                    }}
                    showApplyButtons={{
                         applyDeleteButton: true,
                         applyFavouriteButton: true
                    }}
               />
               <div className="albums-main">
                    <Spin spinning={!initialLoading && isFetchingAlbums}>
                         <div className="albums-body">
                              <AlbumCardList />
                              {filters.onlyFavourites && !favouriteAlbums.length && (
                                   <h2 className="not-found-text">Нет избранных</h2>
                              )}
                         </div>
                    </Spin>
               </div>
               <Pagination
                    size="small"
                    total={data?.total}
                    pageSizeOptions={[10, 20, 50, 100]}
                    pageSize={params.pageSize}
                    current={params.pageNumber}
                    onChange={onChangePagination}
                    defaultPageSize={10}
                    onShowSizeChange={onShowSizeChange}
                    style={{ textAlign: "center", margin: "20px 0" }}
                    showSizeChanger
                    showQuickJumper
               />
               <AlbumModal users={users} keya="albumModal" />
          </div>
     );
};
export default memo(PhotosPage);
