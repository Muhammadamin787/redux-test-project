/* eslint-disable react/prop-types */
/** @format */

import { DeleteOutlined, EditOutlined, StarOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge, Card, Checkbox, message } from "antd";
import Meta from "antd/es/card/Meta";
import { memo } from "react";
import { todosURL } from "../../../api/auth";
import { deletePost, saveRequest } from "../../../api/requests";
import Loader from "../../../components/Loader";
import { useModal } from "../../../context/modalContext";
import CustomTooltip from "./../../../components/CustomTooltip";

const TodoCard = ({ todo, isLoading, selectedTodos, setSelectTodos }) => {

     // Hooks
     const queryClient = useQueryClient();
     const [, setModalOptions] = useModal();
     const isDone = todo?.completed;
     const statusColor = isDone ? "#bbb" : "green";

     // Mutations
     const { mutate, isLoading: deleteLoading } = useMutation({
          mutationFn: deletePost,
          onSuccess: (_, deletedTodoId) => {
               queryClient.setQueryData(["todos"], (todosResponse) => {
                    const updateTodos = todosResponse.data.filter(
                         (todo) => todo.id !== deletedTodoId
                    );
                    return { ...todosResponse, data: updateTodos };
               });
               message.success("Удалено!");
          },
          onError: () => message.error("Произошла ошибка!"),
     });

     const { mutate: update, isLoading: isUpdating } = useMutation({
          mutationFn: (newData) => saveRequest(todosURL, newData, true),
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
               message.success(sentData.id ? "Изменено!" : "Добавлено!");
          },
          onError: () => message.error("Произошла ошибка!"),
     });

     const onClickEdit = () => {
          setModalOptions({
               isOpen: true,
               item: todo,
          });
     };

     const onClickDelete = () => {
          mutate(todo.id);
     };

     const onClickDone = () => {
          update({ ...todo, completed: !todo.completed });
     };

     const onClickSelect = () => {
          const foundPost = selectedTodos.find((saved) => saved.id == todo.id);
          const updatedSelectPots = foundPost
               ? selectedTodos.filter((p) => p.id !== todo.id)
               : [...selectedTodos, todo];
          setSelectTodos(updatedSelectPots);
     };

     const cardStyle = {
          minWidth: "60%",
          borderRadius: 0,
          marginTop: 6,
          border: `2px solid ${statusColor}`,
     };

     const StatusWrapper = ({ children }) => (
          <Badge.Ribbon
               text={isDone ? "выполнена" : "не выполнена"}
               color={statusColor}
          >
               {children}
          </Badge.Ribbon>
     );

     const CardTitle = () => (
          <span style={{ color: statusColor }}>
               {isDone ? (
                    <del>{`id=(${todo.id}) ` + todo.title}</del>
               ) : (
                    `(id=${todo.id}) ` + todo.title
               )}
          </span>
     );

     return (
          <div className="todo-container">
               <StatusWrapper>
                    <Card
                         style={cardStyle}
                         bodyStyle={{ borderRadius: 0 }}
                         className="todo-card"
                    >
                         {isLoading ? <Loader /> : <Meta title={<CardTitle />} />}
                    </Card>
               </StatusWrapper>
               <div className="todo-actions">
                    <CustomTooltip
                         title={`Отметить как ${todo.completed ? "выполненное" : "не выполненное"
                              }`}
                         onClick={onClickDone}
                         loading={isUpdating}
                         icon={todo.completed ? "Не выполнить" : "Выполнить"}
                         key="1"
                    />
                    <CustomTooltip
                         title="Редактировать"
                         onClick={onClickEdit}
                         icon={<EditOutlined />}
                         key="2"
                    />
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
                    />
                    <CustomTooltip icon={<StarOutlined />} title="Отметить" key="4">
                         <Checkbox
                              onChange={onClickSelect}
                              checked={selectedTodos.find(
                                   (selPost) => selPost.id === todo.id
                              )}
                              style={{
                                   transform: "scale(1.6)",
                                   marginTop: "4px",
                                   marginLeft: "4px",
                              }}
                         />
                    </CustomTooltip>
               </div>
          </div>
     );
};

export default memo(TodoCard);
