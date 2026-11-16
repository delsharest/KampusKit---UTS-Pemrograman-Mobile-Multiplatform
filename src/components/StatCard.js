import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { C } from '../constants/theme';

// Props icon, value, label, dan tone dikirim dari HomeScreen.
export default function StatCard({ icon, value, label, tone = 'lavender' }) {
  const background = tone === 'mint' ? C.mint : tone === 'peach' ? C.peach : C.primarySoft;
  return <View style={[styles.box, { backgroundColor: background }]}>
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>;
}

const styles = StyleSheet.create({
  box: { flex: 1, minWidth: 0, borderRadius: 18, padding: 14, marginRight: 8 },
  icon: { fontSize: 20, marginBottom: 10 },
  value: { color: C.ink, fontSize: 24, fontWeight: '800' },
  label: { color: C.secondary, fontSize: 11, lineHeight: 16, marginTop: 4 },
});
