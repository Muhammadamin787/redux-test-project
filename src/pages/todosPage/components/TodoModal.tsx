/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Drawer, Form, Input, Select, Space, message } from "antd";
import { memo, useEffect } from "react";
import { todosURL } from "../../../api/auth";
import { saveRequest } from "../../../api/requests";
import CustomFormItem from "../../../components/CustomFormItem";
import { useModal } from "../../../context/modalContext";

const TodoModal = ({ users }) => {
     // Hooks
     const [modalOptions, setModalOptions] = useModal();
     const queryClient = useQueryClient();
     const [form] = Form.useForm();

     useEffect(() => {
          form.setFieldsValue(modalOptions.item);
     }, [modalOptions.item]);

     // Mutations
     const { mutate, isLoading } = useMutation({
          mutationFn: (newData) => saveRequest(todosURL, newData),
          onSuccess: ({ data: newTodo }, sentData) => {
               queryClient.setQueryData(["todos"], (response) => {
                    if (sentData.id) {
                         // update query cache
                         const updatedTodos = response.data.map((todo) =>
                              todo.id === newTodo.id ? newTodo : todo
                         );
                         return { ...response, data: updatedTodos };
                    } else {
                         return {
                              ...response,
                              data: [...(response?.data || []), newTodo],
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

     return (
          <Drawer
               title="Добавить новый пост"
               width={420}
               onClose={onClose}
               open={modalOptions.isOpen}
               extra={
                    <Space>
                         <Button style={{ width: "100px" }} onClick={onClose}>
                              Отменить
                         </Button>
                    </Space>
               }
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

export default memo(TodoModal);
