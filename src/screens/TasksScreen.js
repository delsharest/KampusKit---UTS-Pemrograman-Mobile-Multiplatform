import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { Card, EmptyState, Page, PageTitle, Pill, PrimaryButton, SectionHeading } from '../components/UI';
import TaskCard from '../components/TaskCard';
import { useAppData } from '../context/AppContext';
import { C } from '../constants/theme';

const priorities = ['Tinggi', 'Sedang', 'Ringan'];
const filters = ['Semua', 'Aktif', 'Selesai'];

export default function TasksScreen() {
  const { tasks, addTask, toggleTask, deleteTask } = useAppData();
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [priority, setPriority] = useState('Sedang');
  const [filter, setFilter] = useState('Semua');

  // useMemo menghitung ulang daftar jika tasks atau filter berubah.
  const visibleTasks = useMemo(() => tasks.filter(task => {
    if (filter === 'Aktif') return !task.done;
    if (filter === 'Selesai') return task.done;
    return true;
  }), [tasks, filter]);

  function handleAdd() {
    if (!title.trim()) {
      Alert.alert('Judul belum diisi', 'Masukkan nama tugas terlebih dahulu.');
      return;
    }
    addTask(title, course, priority);
    setTitle('');
    setCourse('');
    setPriority('Sedang');
  }

  function confirmDelete(id) {
    Alert.alert('Hapus tugas?', 'Tugas ini akan dihapus dari daftar.', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Hapus', style: 'destructive', onPress: () => deleteTask(id) },
    ]);
  }

  return <Page>
    <PageTitle eyebrow="KAMPUSKIT / TO-DO LIST" title="Tugas kuliah 📚"
      description="Tuliskan target, lalu centang setelah selesai." />
    <Card>
      <Text style={styles.formTitle}>+ Tambah tugas baru</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Contoh: Selesaikan laporan UTS"
        placeholderTextColor="#9AA7B8" style={styles.input} maxLength={90} />
      <TextInput value={course} onChangeText={setCourse} placeholder="Mata kuliah (opsional)"
        placeholderTextColor="#9AA7B8" style={styles.input} maxLength={50} />
      <Text style={styles.label}>Prioritas tugas</Text>
      <View style={styles.row}>
        {priorities.map(item => <Pill key={item} label={item} selected={item === priority}
          onPress={() => setPriority(item)} />)}
      </View>
      <PrimaryButton label="Simpan tugas" onPress={handleAdd} />
    </Card>
    <SectionHeading title={`Daftar tugas (${visibleTasks.length})`} />
    <View style={styles.row}>
      {filters.map(item => <Pill key={item} label={item} selected={filter === item}
        onPress={() => setFilter(item)} />)}
    </View>
    {visibleTasks.length ? visibleTasks.map(task =>
      <TaskCard key={task.id} task={task} onToggle={toggleTask}
        onDelete={confirmDelete} />) :
      <Card><EmptyState emoji="🗂️" title="Belum ada tugas"
        description="Tambahkan tugas atau pilih filter lainnya." /></Card>}
  </Page>;
}

const styles = StyleSheet.create({
  formTitle: { color: C.ink, fontSize: 15, fontWeight: '800', marginBottom: 15 },
  input: { borderRadius: 13, borderWidth: 1, borderColor: C.border,
    backgroundColor: C.background, paddingVertical: 13, paddingHorizontal: 14,
    fontSize: 13, marginBottom: 10, color: C.ink },
  label: { color: C.secondary, fontSize: 12, fontWeight: '700', marginTop: 6, marginBottom: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
});
