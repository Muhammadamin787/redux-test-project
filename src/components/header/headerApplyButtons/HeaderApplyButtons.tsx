import { DeleteOutlined, StarOutlined } from '@ant-design/icons';
import CustomTooltip from '../../customTooltip/CustomTooltipButton';
import "./headerApplyButtons.scss";
import { message } from 'antd';
import { useState } from 'react';

type ApplyButtonsProps<T> = {
     selectedItems: T[]
     setSelectedItems: (t: T[]) => void
     setFavouriteItems: (t: T[]) => void
}

const HeaderApplyButtons = <T,>({ selectedItems, setSelectedItems, setFavouriteItems }: ApplyButtonsProps<T>) => {

     // Helper Hooks
     const [messageApi, contextHolder] = message.useMessage()

     // States
     const [isDeleting, setLoading] = useState(false)

     // Functions
     const onDeleteAll = () => {
          setLoading(true)
          setTimeout(() => {
               messageApi.success("Удалено!")
               setLoading(false)
          }, 800)
     };

     const onAddToFovourites = () => {
          if (selectedItems.length) {
               setSelectedItems([])
               setFavouriteItems(selectedItems);
          }
     };

     return (
          <div className='header-apply-buttons' style={{ display: selectedItems?.length ? 'flex' : 'none' }}>
               <CustomTooltip
                    withOutTooltip
                    icon={<><DeleteOutlined /> Удалить все</>}
                    confirmTitle={`Все будут удалены!`}
                    title="Удалить все"
                    cancelText="Отменить"
                    okText="Удалить!"
                    color="red"
                    danger
                    onConfirm={onDeleteAll}
                    loading={isDeleting}
               />
               <CustomTooltip
                    withOutTooltip
                    icon={<><StarOutlined /> Добавить все</>}
                    confirmTitle="Все будут добавлены в избранные!"
                    title="Добавить все"
                    cancelText="Отменить"
                    okText="Добавить все"
                    color="orange"
                    onConfirm={onAddToFovourites}
                    buttonStyle={{
                         color: 'orange',
                         borderColor: 'orange',
                    }}
               />
               {contextHolder}
          </div>

     )
}

export default HeaderApplyButtons