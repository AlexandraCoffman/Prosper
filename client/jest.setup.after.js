const React = require("react");
const { Text } = require("react-native");

/** Sync stub so font loading in @expo/vector-icons does not trigger act() warnings. */
function MockIcon(props) {
  return React.createElement(Text, {
    testID: props.testID,
    accessibilityLabel: props.accessibilityLabel,
  });
}

jest.mock("@expo/vector-icons", () => ({
  __esModule: true,
  Ionicons: MockIcon,
  Octicons: MockIcon,
  MaterialCommunityIcons: MockIcon,
  Feather: MockIcon,
  FontAwesome: MockIcon,
}));
