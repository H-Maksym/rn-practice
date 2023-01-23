import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useVisibleTabBar } from "src/hooks/useVisibleTabBar";

import { View, TextInput, Image } from "react-native";
import Container from "src/components/Common/Container";
import CommentItem from "src/components/Posts/CommentItem/CommentItem";
import Input from "src/components/Common/Input/Input";

import { stylesCommentsScreen } from "./CommentsScreen.styled";

function CommentsScreen({ image = "", navigation = "" }) {
  const { setVisibleBottom } = useVisibleTabBar();
  const [comments, setComments] = useState("");
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
      <View style={stylesCommentsScreen.container}>
        <View>
          <Image style={stylesCommentsScreen.imageComments} />
          <CommentItem isCurrentUser />
        </View>
        <View style={stylesCommentsScreen.inputCommentsContainer}>
          {/* <Input
          style={stylesCommentsScreen.inputComments}
          placeholder="Enter your comments"
          value={comments}
          onChangeText={setComments}
        /> */}
        </View>
      </View>
    </Container>
  );
}

export default CommentsScreen;
