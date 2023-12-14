import { Avatar, Skeleton } from 'antd'
import Meta from 'antd/es/card/Meta'
import { CSSProperties, ReactNode } from 'react'

type PropTypes = {
     isLoading: boolean
     avatarId: number
     title: ReactNode
     description: string
     style?: CSSProperties
}

const CustomSkeleton = ({ isLoading, avatarId, title, description, style }: PropTypes) => {

     const avatar = <Avatar
          src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${avatarId}`}
     />

     return (
          <Skeleton loading={isLoading} avatar active>
               <Meta
                    style={style}
                    avatar={avatar}
                    title={title}
                    description={description}
               />
          </Skeleton>
     )
}

export default CustomSkeleton