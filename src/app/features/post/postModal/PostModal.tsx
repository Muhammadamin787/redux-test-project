import { Button, Drawer, Form, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { memo, useEffect } from "react";
import CustomFormItem from "../../../../components/CustomFormItem";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useToolkitHooks";
import { IPost } from "../../../../types";
import { selectorPostsModal, selectorUsers } from "../../../selectors";
import { useSavePostMutation } from "../../../services/postApi";
import { setAddPost, setClosePostsModal } from "../postSlice";
import CancelButton from "./CancelButton";

const PostModal = () => {

     // Helper Hooks
     const dispatch = useAppDispatch();
     const [form] = Form.useForm();
     const [messageApi, contextHolder] = message.useMessage();

     // Selectors 
     const { isOpen, post = {} } = useAppSelector(selectorPostsModal)
     const users = useAppSelector(selectorUsers)

     // Quesries
     const [savePost, { isLoading }] = useSavePostMutation()

     // Effects
     useEffect(() => {
          form.setFieldsValue(post);
     }, [form, post]);

     // Functions
     const onClose = () => {
          dispatch(setClosePostsModal({ clear: true }))
          setTimeout(() => clearFormFields(), 100)
     };

     const clearFormFields = () => {
          form.setFieldsValue({
               title: null,
               body: null,
               userId: null,
          });
     };

     const onFinish = (newData: IPost) => {
          savePost({ ...post, ...newData })
               .unwrap()
               .then(() => {
                    messageApi.success("Сохранено")
                    dispatch(setAddPost(newData))
                    dispatch(setClosePostsModal({ clear: true }));
               })
               .catch(() => {
                    messageApi.error("Ошибка")
                    // console.log(err);
               })
     };

     return (
          <Drawer
               title="Добавить новый пост"
               width={420}
               onClose={onClose}
               open={isOpen}
               extra={<CancelButton onClose={onClose} />}
          >
               <Form
                    layout="vertical"
                    hideRequiredMark
                    form={form}
                    onFinish={onFinish}
               // initialValues={modalOptions.item}
               >
                    <CustomFormItem
                         name="title"
                         label="Заголовок"
                    >
                         <Input placeholder="Заголовок" />
                    </CustomFormItem>
                    <CustomFormItem
                         name="body"
                         label="Пост"
                    >
                         <TextArea name="body" placeholder="Пост" />
                    </CustomFormItem>
                    <CustomFormItem
                         name="userId"
                         label="Пользователь"
                    >
                         <Select placeholder="Пользователи">
                              {users?.map((user) => (
                                   <Select.Option key={user.id} value={user.id}>
                                        {user?.firstName}
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
               {contextHolder}
          </Drawer>
     );
};

export default memo(PostModal);
