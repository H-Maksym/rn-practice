import { useDispatch } from 'react-redux';
import { setVisibleTabBar } from 'src/redux/auth/authSlice';

export const useVisibleTabBar = () => {
  const dispatch = useDispatch();

  const setVisibleBottom = isVisible => {
    dispatch(setVisibleTabBar(isVisible));
  };

  return { setVisibleBottom };
};
