import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { Card, EmptyState, Page, PageTitle, Pill, PrimaryButton, SectionHeading } from '../components/UI';
import { useAppData } from '../context/AppContext';
import { C } from '../constants/theme';
import { compactDate } from '../utils/date';

const moods = [
  { key: 'Semangat', label: '😄 Semangat' },
  { key: 'Biasa', label: '🙂 Biasa' },
  { key: 'Lelah', label: '😴 Lelah' },
];
const moodEmojis = { Semangat: '😄', Biasa: '🙂', Lelah: '😴' };

export default function JournalScreen() {
  const { journals, addJournal, deleteJournal } = useAppData();
  const [mood, setMood] = useState('Semangat');
  const [note, setNote] = useState('');

  function handleSave() {
    if (!note.trim()) {
      Alert.alert('Refleksi kosong', 'Tuliskan minimal satu kalimat.');
      return;
    }
    addJournal(note, mood);
    setNote('');
    setMood('Semangat');
  }

  function confirmDelete(id) {
    Alert.alert('Hapus catatan?', 'Catatan ini akan dihapus.', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Hapus', style: 'destructive', onPress: () => deleteJournal(id) },
    ]);
  }

  return <Page>
    <PageTitle eyebrow="KAMPUSKIT / REFLECTION" title="Jurnal belajar 🌿"
      description="Tuliskan apa yang kamu rasakan dan pelajari." />
    <Card>
      <Text style={styles.label}>Bagaimana perasaanmu hari ini?</Text>
      <View style={styles.row}>
        {moods.map(item => <Pill key={item.key} label={item.label}
          selected={mood === item.key} onPress={() => setMood(item.key)} />)}
      </View>
      <Text style={styles.label}>Refleksi singkat</Text>
      <TextInput multiline textAlignVertical="top" value={note}
        onChangeText={setNote} maxLength={600} style={styles.input}
        placeholder="Hari ini aku belajar ..." placeholderTextColor="#9AA7B8" />
      <Text style={styles.counter}>{note.length}/600 karakter</Text>
      <PrimaryButton label="Simpan jurnal" onPress={handleSave} />
    </Card>
    <SectionHeading title={`Cerita tersimpan (${journals.length})`} />
    {journals.length ? journals.map(entry =>
      <Card key={entry.id} style={styles.entry}>
        <View style={styles.rowBetween}>
          <View style={styles.rowCenter}>
            <Text style={styles.emoji}>{moodEmojis[entry.mood] || '🙂'}</Text>
            <View>
              <Text style={styles.entryMood}>{entry.mood}</Text>
              <Text style={styles.entryDate}>{compactDate(entry.createdAt)}</Text>
            </View>
          </View>
          <Text onPress={() => confirmDelete(entry.id)}
            accessibilityRole="button" style={styles.delete}>Hapus</Text>
        </View>
        <Text style={styles.entryContent}>{entry.content}</Text>
      </Card>) :
      <Card><EmptyState emoji="📖" title="Jurnal masih kosong"
        description="Simpan satu refleksi untuk memulai kebiasaan baik." /></Card>}
  </Page>;
}

const styles = StyleSheet.create({
  label: { color: C.ink, fontSize: 13, fontWeight: '800', marginBottom: 11 },
  row: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  input: { minHeight: 122, color: C.ink, fontSize: 13, backgroundColor: C.background,
    borderRadius: 14, borderWidth: 1, borderColor: C.border,
    paddingVertical: 13, paddingHorizontal: 13, lineHeight: 20 },
  counter: { color: C.secondary, textAlign: 'right', fontSize: 10, marginVertical: 8 },
  entry: { marginBottom: 10 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  emoji: { fontSize: 27, marginRight: 10 },
  entryMood: { fontSize: 12, fontWeight: '800', color: C.ink },
  entryDate: { fontSize: 10, color: C.secondary, marginTop: 3 },
  delete: { fontSize: 11, color: C.red, fontWeight: '800', padding: 8 },
  entryContent: { color: C.ink, lineHeight: 21, fontSize: 13, marginTop: 15 },
});
