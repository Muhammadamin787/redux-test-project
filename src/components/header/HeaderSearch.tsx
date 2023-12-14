import Search from 'antd/es/input/Search'
import { RootState } from '../../app/store'
import { useAppSelector } from '../../hooks/useToolkitHooks'

type HeaderSearchProps = {
     onSearch: React.ChangeEventHandler<HTMLInputElement>
     searchSelector: (state: RootState) => string
}

const HeaderSearch = ({ onSearch, searchSelector }: HeaderSearchProps) => {

     // Selectors
     const searchValue = useAppSelector(searchSelector)

     return (
          <div className="header-search">
               <Search
                    placeholder="Поиск"
                    value={searchValue}
                    onChange={onSearch}
                    allowClear
                    style={{
                         width: 200,
                    }}
               />
          </div>
     )
}

export default HeaderSearch