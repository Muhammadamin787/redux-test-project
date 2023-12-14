import { Button, Space } from "antd";

const CancelButton = ({ onClose }: { onClose: () => void }) => {
     return (
          <Space>
               <Button style={{ width: "100px" }} onClick={onClose}>
                    Отменить
               </Button>
          </Space>
     );
};

export default CancelButton;