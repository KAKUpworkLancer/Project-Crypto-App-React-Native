import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function CardComponent({ title, value }: { title: string; value: string }) {
    return (
        <ThemedView style={styles.card}>
            <ThemedText style={styles.title}>{title}</ThemedText>
            <ThemedText style={styles.value}>{value}</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#007bff',
        marginHorizontal: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, 
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    value: {
        fontSize: 14,
        color: '#fff',
        marginTop: 4,
    },
});
