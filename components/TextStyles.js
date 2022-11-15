import { Text, StyleSheet } from 'react-native';

export function TextBody1({ children }) {
  return <Text style={styles.text}>{children}</Text>;
}

export function TextBody2({ children }) {
  return <Text style={styles.text}>{children}</Text>;
}

export function TextH1({ children }) {
  return <Text style={{ ...styles.text, fontSize: 24 }}>{children}</Text>;
}

export function TextH2({ children }) {
  return <Text style={{ ...styles.text, fontSize: 18 }}>{children}</Text>;
}

export function TextH3({ children }) {
  return (
    <Text style={{ ...styles.text, fontSize: 16, fontWeight: 'bold' }}>
      {children}
    </Text>
  );
}

export function TextH4({ children }) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: '#eeeeee',
  },
});
