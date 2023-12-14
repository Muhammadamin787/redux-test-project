import { Button } from "antd";
import { TooltipPlacement } from 'antd/es/tooltip';
import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import PopWrapper from "./PopWrapper";
import TooltipWrapper from "./TooltipWrapper";
import { SizeType } from "antd/es/config-provider/SizeContext";

type PropTypes = PropsWithChildren & {
     withOutTooltip?: boolean,
     title: string,
     color?: string,
     place?: TooltipPlacement | undefined
     icon?: ReactNode,
     onClick?: () => void,
     buttonStyle?: CSSProperties,
     size?: SizeType,
     style?: CSSProperties,
     isActive?: boolean,
     danger?: boolean,
     confirmTitle?: string,
     okText?: string,
     cancelText?: string,
     onConfirm?: () => void,
     loading?: boolean,
}
const CustomTooltipButton = ({
     withOutTooltip = false,
     title = "Default",
     color = "blue",
     place = "top",
     icon,
     onClick,
     buttonStyle,
     size,
     style,
     isActive,
     danger,
     confirmTitle = '',
     okText = '',
     cancelText = '',
     onConfirm = () => { },
     children,
     loading,
}: PropTypes) => {

     const activeStyle = isActive ? { color, borderColor: color } : {};

     return (
          <TooltipWrapper
               withOutTooltip={withOutTooltip}
               title={title}
               color={color}
               place={place}
               style={style}
          >
               <PopWrapper
                    button={children}
                    confirmTitle={confirmTitle}
                    okText={okText}
                    cancelText={cancelText}
                    onConfirm={onConfirm}
               >
                    <Button
                         size={size}
                         danger={danger}
                         loading={loading}
                         style={{ ...buttonStyle, ...activeStyle }}
                         onClick={onClick}
                    >
                         {icon}
                    </Button>
               </PopWrapper>
          </TooltipWrapper>
     );
};

export default CustomTooltipButton;
