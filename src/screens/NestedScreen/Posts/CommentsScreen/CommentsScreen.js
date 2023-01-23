import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useVisibleTabBar } from "src/hooks/useVisibleTabBar";

import { Text, Image } from "react-native";
import Container from "src/components/Common/Container";
import CommentItem from "src/components/Posts/CommentItem/CommentItem";

import { stylesCommentsScreen } from "./CommentsScreen.styled";

function CommentsScreen({ image = "", navigation = "" }) {
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
    <Container style={{ backgroundColor: "#ffffff" }}>
      <Image style={stylesCommentsScreen.imageComments} />
      <CommentItem />
      <Text>CommentsScreen</Text>
    </Container>
  );
}

export default CommentsScreen;
