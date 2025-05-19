import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';

type ButtonProps = {
    type: 'buy' | 'sell';
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
};

export function Button({ type, onPress, style, textStyle }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                type === 'buy' ? styles.buyButton : styles.sellButton,
                style,
            ]}
            onPress={onPress}
        >
            <Text style={[styles.text, textStyle]}>
                {type === 'buy' ? 'Buy' : 'Sell'}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 0.8,
        maxWidth: 120,
        paddingHorizontal: 4,
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 2,
    },
    buyButton: {
        backgroundColor: '#4CAF50',
    },
    sellButton: {
        backgroundColor: '#F44336',
    },
    text: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
}); 