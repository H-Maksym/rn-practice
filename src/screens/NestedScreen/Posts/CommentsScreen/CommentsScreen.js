import { useEffect } from "react";
import { Text } from "react-native";
import Container from "src/components/Common/Container";
import { useVisibleTabBar } from "src/hooks/useVisibleTabBar";

function CommentsScreen({ navigation }) {
  const { setVisibleBottom } = useVisibleTabBar();

  useEffect(() => {
    setVisibleBottom(false);
    return () => {
      setVisibleBottom(true);
    };
  }, []);

  return (
    <Container>
      <Text>CommentsScreen</Text>
    </Container>
  );
}

export default CommentsScreen;
