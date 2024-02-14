import themes from "@/commons/themes";
import { useMemo } from "react";
import {
    GestureResponderEvent,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from "react-native";

type BtnVariantType = 'contained' | 'outlined' | 'text';
type BtnColorType = 'cyan' | 'error' | 'dark' | 'light';
type BtnStyleType = {
    bgContained: string;
    textContained: string;
    bgOutlined: string;
    textOutlined: string;
};
type BtnStyleCollection = {
    viewStyle: ViewStyle;
    textStyle: TextStyle;
};

type YTButtonProps = {
    title: string;
    variant?: BtnVariantType;
    color?: BtnColorType;
    loading?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    onPress?: (event?: GestureResponderEvent) => void;
} 

function getStyleByColorType (
    color: BtnColorType = 'cyan',
): BtnStyleType {
    switch(color) {
        case 'error': return {
            bgContained: themes.color.error,
            textContained: themes.color.light,
            bgOutlined: themes.color.light,
            textOutlined: themes.color.error,
        }
        case 'dark': return {
            bgContained: themes.color.secondaryCat,
            textContained: themes.color.light,
            bgOutlined: themes.color.light,
            textOutlined: themes.color.secondaryCat,
        }
        case 'light': return {
            bgContained: themes.color.light,
            textContained: themes.color.secondaryCat,
            bgOutlined: themes.color.secondaryNebula,
            textOutlined: themes.color.secondaryCat,
        }
        default: return {
            bgContained: themes.color.primaryCyan,
            textContained: themes.color.light,
            bgOutlined: themes.color.light,
            textOutlined: themes.color.primaryCyan,
        }
    }
}

export default function YTButton ({
    title,
    variant = 'contained',
    color = 'cyan',
    loading = false,
    disabled = false,
    style = [],
    onPress = () => {},
}: YTButtonProps) {

    const { viewStyle, textStyle } = useMemo(
        (): BtnStyleCollection => {
            // if (disabled) return [
            //     themes.color.secondaryNebula,
            //     themes.color.secondaryCat,
            // ];
            if (disabled) return {
                viewStyle: {
                    backgroundColor: themes.color.secondaryNebula,
                    borderColor: themes.color.secondaryNebula,
                },
                textStyle: {
                    color: themes.color.secondaryCat,
                }
            }
            const colorValue = getStyleByColorType(color);
            switch (variant) {
                case 'outlined': return {
                    viewStyle: {
                        backgroundColor: colorValue.bgOutlined,
                        borderColor: colorValue.textOutlined,
                    },
                    textStyle: {
                        color: colorValue.textOutlined
                    }
                }
                case 'text': return {
                    viewStyle: {
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                    },
                    textStyle: {
                        color: colorValue.textOutlined
                    }
                }
                default: return {
                    viewStyle: {
                        backgroundColor: colorValue.bgContained,
                        borderColor: colorValue.bgContained,
                    },
                    textStyle: {
                        color: colorValue.textContained
                    }
                }
            }
        },
        [variant, color, disabled],
    );

    const btnStyles = useMemo(() => {
        if (variant === 'text') return style;
        return [styles.view, viewStyle, ...[style]];
    }, [style, viewStyle])

    return (
        <TouchableOpacity
            style={btnStyles}
            disabled={disabled || loading}
            onPress={onPress}
        >
            <Text style={[styles.text, textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
		minWidth: 42,
		minHeight: 42,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    text: {
        ...themes.font.medium,
		color: "#FFFFFF",
    }
})