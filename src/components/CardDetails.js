import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card, Title, Button } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { colors } from "react-native-elements";

const CardDetails = ({ title, icon, twoButton, press, dark, value }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.secondary,
      margin: 5,
    },
    view: {
      borderBottomColor: colors.border,
      borderBottomWidth: 0.3,
      margin: 5,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });

  return (
    <View>
      <Card style={styles.card} onPress={press}>
        <View style={styles.view}>
          <View style={{ flexDirection: "row" }}>
            <Button icon={icon} color={colors.text} uppercase={false} >
              {title}
            </Button>
            {value ? <Button uppercase={false} color={colors.text}>{value}</Button> : null}
          </View>
          {twoButton ? <Button color={colors.text}>{dark}</Button> : null}
        </View>
      </Card>
    </View>
  );
};

export default CardDetails;
