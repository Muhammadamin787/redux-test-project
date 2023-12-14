import { PropsWithChildren, ReactNode } from "react";
import { Popconfirm } from 'antd';

type PropTypes = PropsWithChildren & {
     confirmTitle: string
     okText: string
     cancelText: string
     onConfirm: () => void
     button?: ReactNode
}

const PopWrapper = ({ children, confirmTitle, okText, cancelText, onConfirm, button }: PropTypes) => {
     if (confirmTitle) {
          return (
               <Popconfirm
                    title={confirmTitle}
                    okText={okText}
                    cancelText={cancelText}
                    onConfirm={onConfirm}
               >
                    {button || children}
               </Popconfirm>
          );
     }
     return button || children;
};

export default PopWrapper;