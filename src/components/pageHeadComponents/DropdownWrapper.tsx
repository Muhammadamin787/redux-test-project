import { Button, Popover } from 'antd';
import { useState, PropsWithChildren } from 'react';

const DropdownWrapper = ({ children }: PropsWithChildren) => {

     // Hooks
     const [isOpen, setIsOpen] = useState(false);

     const togglePoppover = () => {
          setIsOpen((prev) => !prev)
     }

     return (
          <Popover
               content={
                    <div className='popover-sorter'>
                         <Button onClick={togglePoppover}>x</Button>
                         <div>
                              {children}
                         </div>
                    </div>

               }
               trigger="click"
               open={isOpen}
               onOpenChange={togglePoppover}
          >
               <Button className='popover-sorter-button' type="primary" size='small'>Сортировки</Button>
          </Popover>
     )
}

export default DropdownWrapper