
import { CSSProperties } from 'react';
import { useAppSelector } from '../hooks/useToolkitHooks';
import { selectorUsers } from '../app/selectors';

type PropTypes = {
     userId: number
     style?: CSSProperties
}

const UserName = ({ userId, style }: PropTypes) => {

     const users = useAppSelector(selectorUsers)

     return (
          <div style={{ fontSize: '13px', color: "skyblue", ...style }}>
               @{users?.find(user => user.id === userId)?.firstName}
          </div>
     )
}

export default UserName