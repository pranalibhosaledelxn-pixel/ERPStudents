import { View, TouchableOpacity, ViewStyle, StyleSheet, StyleProp } from 'react-native';

interface CardProps {
    children: React.ReactNode;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

export const Card: React.FC<CardProps> = ({ children, onPress, style }) => {
    const Container = onPress ? TouchableOpacity : View;

    return (
        <Container
            onPress={onPress ? onPress : undefined}
            activeOpacity={onPress ? 0.7 : 1}
            style={[styles.card, style]}
        >
            {children}
        </Container>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 16,
    }
});
