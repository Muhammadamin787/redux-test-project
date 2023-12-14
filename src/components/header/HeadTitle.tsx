import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'

type HeaderTitleProps = {
     title: string
     onClick: () => void
}

const HeaderTitle = ({ title, onClick }: HeaderTitleProps) => {
     return (
          <div className="head-title">
               <h2>{title}</h2>
               <Button
                    type="primary"
                    className="head-add-button"
                    onClick={onClick}
                    icon={<PlusOutlined />}
               >
                    Добавить
               </Button>
          </div>
     )
}

export default HeaderTitle