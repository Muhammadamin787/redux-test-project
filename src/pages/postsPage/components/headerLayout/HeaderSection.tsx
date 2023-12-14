import { PropsWithChildren } from 'react';

const HeaderSection = ({ children }: PropsWithChildren) => {
     return (
          <div className="header-section">
               {children}
          </div>
     )
}

export default HeaderSection