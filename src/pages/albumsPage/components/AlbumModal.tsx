/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Drawer, Form, Input, Select, Space, message } from "antd";
import { memo, useEffect } from "react";
import { saveRequest } from "../../../api/requests";
import CustomFormItem from "../../../components/CustomFormItem";
import { useModal } from "../../../context/modalContext";
import { albumsURL } from "../../../api/auth";
import { useFavouriteAlbums } from "../../../context/favouriteAlbumsContext";

const AlbumModal = ({ users }) => {

     // Hooks
     const [favouriteAlbums, setFavouriteAlbums] = useFavouriteAlbums();
     const [modalOptions, setModalOptions] = useModal();
     const queryClient = useQueryClient();
     const [form] = Form.useForm();

     useEffect(() => {
          form.setFieldsValue(modalOptions.item);
     }, [modalOptions.item]);

     // Mutations
     const { mutate, isLoading } = useMutation({
          mutationFn: (newAlbum) => saveRequest(albumsURL, newAlbum),
          onSuccess: ({ data: newData }, sentData) => {
               queryClient.setQueryData(["albums"], (response) => {
                    if (sentData.id) {
                         // update query cache
                         const updatedAlbums = response.data.map((album) =>
                              album.id === newData.id ? newData : album
                         );
                         // update storage
                         const updatedList = favouriteAlbums.map((album) =>
                              album.id === newData.id ? newData : album
                         );
                         setFavouriteAlbums(updatedList);
                         return { ...response, data: updatedAlbums };
                    } else {
                         return {
                              ...response,
                              data: [...(response?.data || []), newData],
                         };
                    }
               });
               setModalOptions({
                    isOpen: false,
               });
               clearFormFields();
               message.success(sentData.id ? "Изменено!" : "Добавлено!");
          },
          onError: () => message.error("Произошла ошибка!"),
     });

     const onClose = () => {
          clearFormFields();
          setModalOptions({
               isOpen: false,
          });
     };

     const clearFormFields = () => {
          form.setFieldsValue({
               title: null,
               body: null,
               userId: null,
          });
     };

     const onFinish = (newData) => {
          mutate({ ...modalOptions.item, ...newData });
     };

     const CalcelButton = () => {
          return (
               <Space>
                    <Button style={{ width: "100px" }} onClick={onClose}>
                         Отменить
                    </Button>
               </Space>
          );
     };

     return (
          <Drawer
               title="Добавить новый альбом"
               width={420}
               onClose={onClose}
               open={modalOptions.isOpen}
               extra={<CalcelButton />}
          >
               <Form
                    layout="vertical"
                    hideRequiredMark
                    form={form}
                    onFinish={onFinish}
                    initialValues={modalOptions.item}
               >
                    <CustomFormItem
                         name="title"
                         label="Заголовок"
                         reqiredMessage="Пожалуйста, введите заголовок"
                    >
                         <Input placeholder="Заголовок" />
                    </CustomFormItem>
                    <CustomFormItem
                         name="userId"
                         label="Пользователь"
                         reqiredMessage="Пожалуйста, введите пользователя"
                    >
                         <Select placeholder="Пользователи">
                              {users?.map((user) => (
                                   <Select.Option key={user.id} value={user.id}>
                                        {user?.name}
                                   </Select.Option>
                              ))}
                         </Select>
                    </CustomFormItem>
                    <Button
                         htmlType="submit"
                         style={{ width: "100%" }}
                         type="primary"
                         loading={isLoading}
                    >
                         Сохранить
                    </Button>
               </Form>
          </Drawer>
     );
};

export default memo(AlbumModal);
