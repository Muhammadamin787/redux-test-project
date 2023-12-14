import { Switch } from 'antd';
import { RootState } from '../../../app/store';
import { useAppSelector } from '../../../hooks/useToolkitHooks';

type FavSwitcherProps = {
     onSwitch: (v: boolean) => void
     selector: (state: RootState) => boolean
}

const FavouritesSwitcher = ({ onSwitch, selector }: FavSwitcherProps) => {

     // Selectors
     const checked = useAppSelector(selector)

     return (
          <div className="favourites-switcher">
               <Switch
                    checked={checked}
                    checkedChildren="Избранные"
                    unCheckedChildren="Все"
                    onChange={onSwitch} />
          </div>)
}

export default FavouritesSwitcher