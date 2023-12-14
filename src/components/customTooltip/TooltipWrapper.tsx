import { CSSProperties, PropsWithChildren } from "react";
import { Tooltip } from 'antd';
import { TooltipPlacement } from "antd/es/tooltip";

type PropsTypes = PropsWithChildren & {
     withOutTooltip: boolean
     title: string
     color: string
     place?: TooltipPlacement | undefined
     style?: CSSProperties
}

const TooltipWrapper = ({ children, withOutTooltip, title, color, place, style }: PropsTypes) => {
     if (withOutTooltip) return children

     return (
          <Tooltip
               title={title}
               color={color}
               placement={place}
               overlayStyle={{ fontSize: ".8em", ...style }}
               key={title}
          >
               <>{children}</>
          </Tooltip>
     );
};
export default TooltipWrapper;