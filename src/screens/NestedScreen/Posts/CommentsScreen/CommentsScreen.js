import { useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text } from 'react-native';
import Container from 'src/components/Common/Container';
import { useVisibleTabBar } from 'src/hooks/useVisibleTabBar';

function CommentsScreen({ navigation }) {
  const { setVisibleBottom } = useVisibleTabBar();

  useFocusEffect(
    useCallback(() => {
      //INFO when focus screen
      setVisibleBottom(false);
      return () => {
        //INFO when unfocus screen
        setVisibleBottom(true);
      };
    }, [])
  );

  return (
    <Container>
      <Text>CommentsScreen</Text>
    </Container>
  );
}

export default CommentsScreen;
