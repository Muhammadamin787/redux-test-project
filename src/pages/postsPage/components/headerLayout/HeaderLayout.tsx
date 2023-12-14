import "./headerLayout.scss";
import { PropsWithChildren } from 'react';

type HeaderLayoutProps = PropsWithChildren & {
     className?: string
}

const HeaderLayout = ({ children, className = '' }: HeaderLayoutProps) => {
     return (
          <div className={'header-layout ' + className}>
               {children}
          </div>
     )
}

export default HeaderLayout