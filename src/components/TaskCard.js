import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { C } from '../constants/theme';
import { Card } from './UI';

const priorityColors = {
  Tinggi: { backgroundColor: C.rose, color: C.red },
  Sedang: { backgroundColor: C.peach, color: C.orange },
  Ringan: { backgroundColor: C.mint, color: C.green },
};

// Komponen reusable: data task dan fungsi callback diterima melalui props.
export default function TaskCard({ task, onToggle, onDelete, compact = false }) {
  const color = priorityColors[task.priority] || priorityColors.Sedang;
  return <Card style={styles.card}>
    <TouchableOpacity onPress={() => onToggle(task.id)} style={[styles.check, task.done && styles.checked]}
      accessibilityRole="checkbox" accessibilityState={{ checked: task.done }}>
      {task.done && <Text style={styles.checkText}>✓</Text>}
    </TouchableOpacity>
    <View style={styles.main}>
      <Text style={[styles.title, task.done && styles.done]} numberOfLines={compact ? 2 : undefined}>
        {task.title}
      </Text>
      <Text style={styles.course}>{task.course}</Text>
      {!compact && <View style={[styles.tag, { backgroundColor: color.backgroundColor }]}>
        <Text style={[styles.tagText, { color: color.color }]}>{task.priority}</Text>
      </View>}
    </View>
    {!compact && <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.delete}
      accessibilityRole="button" accessibilityLabel="Hapus tugas">
      <Text style={styles.deleteText}>×</Text>
    </TouchableOpacity>}
  </Card>;
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, padding: 14 },
  check: { borderWidth: 2, borderColor: C.primary, borderRadius: 8, width: 25, height: 25,
    marginRight: 12, marginTop: 2, alignItems: 'center', justifyContent: 'center' },
  checked: { backgroundColor: C.primary },
  checkText: { color: C.white, fontWeight: '900' },
  main: { flex: 1 },
  title: { fontSize: 13, fontWeight: '800', color: C.ink, lineHeight: 19 },
  done: { color: C.secondary, textDecorationLine: 'line-through' },
  course: { fontSize: 11, color: C.secondary, marginTop: 4 },
  tag: { alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, marginTop: 10 },
  tagText: { fontSize: 10, fontWeight: '800' },
  delete: { paddingLeft: 10, paddingRight: 3, paddingTop: 0 },
  deleteText: { color: C.secondary, fontSize: 25, lineHeight: 26 },
});
