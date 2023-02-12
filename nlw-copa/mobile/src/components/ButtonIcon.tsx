import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { IconProps } from "phosphor-react-native";
import { useTheme } from "native-base";

type ButtonIconProps = TouchableOpacityProps & {
  icon: React.FC<IconProps>;
}

export function ButtonIcon({ icon: Icon, ...props }: ButtonIconProps) {
  const { colors, sizes } = useTheme();

  return (
    <TouchableOpacity {...props}>
      <Icon color={colors.gray[300]} size={sizes[6]} />
    </TouchableOpacity>
  );
}
