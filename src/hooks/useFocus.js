import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export const useFocusScreen = (focusScreenCallback, unfocusScreenCallback) => {
  useFocusEffect(
    useCallback(() => {
      //INFO when focus screen
      focusScreenCallback();
      return () => {
        //INFO when unfocus screen
        unfocusScreenCallback();
      };
    }, [])
  );
};

//fixed
