import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, EmptyState, Page, PageTitle, PrimaryButton, ProgressBar, SectionHeading } from '../components/UI';
import StatCard from '../components/StatCard';
import TaskCard from '../components/TaskCard';
import { useAppData } from '../context/AppContext';
import { C } from '../constants/theme';
import { formatDate } from '../utils/date';

export default function HomeScreen({ navigation }) {
  const { tasks, stats, toggleTask } = useAppData();
  const pending = tasks.filter(task => !task.done).slice(0, 2);
  return <Page>
    <PageTitle eyebrow="KAMPUSKIT / DASHBOARD" title="Belajar lebih terarah ✨"
      description={formatDate()} />
    <Card style={styles.hero}>
      <Text style={styles.heroEyebrow}>PROGRES HARI INI</Text>
      <View style={styles.progressRow}>
        <Text style={styles.big}>{stats.completion}%</Text>
        <Text style={styles.progressHint}>{stats.done} dari {stats.total} tugas selesai</Text>
      </View>
      <ProgressBar progress={stats.completion} />
      <Text style={styles.motivation}>Sedikit demi sedikit, hasilnya akan terasa. 🌱</Text>
    </Card>
    <View style={styles.statRow}>
      <StatCard icon="📌" value={stats.pending} label="Tugas aktif" />
      <StatCard icon="⏱️" value={`${stats.todayMinutes}m`} label="Fokus hari ini" tone="mint" />
      <StatCard icon="📒" value={stats.journalCount} label="Entri jurnal" tone="peach" />
    </View>
    <SectionHeading title="Langkah cepat" />
    <View style={styles.actions}>
      <TouchableOpacity onPress={() => navigation.navigate('Tugas')} style={styles.action}>
        <Text style={styles.actionEmoji}>📝</Text>
        <Text style={styles.actionText}>Kelola tugas</Text>
        <Text style={styles.actionSub}>Catat target kuliah</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Fokus')} style={styles.action}>
        <Text style={styles.actionEmoji}>🎯</Text>
        <Text style={styles.actionText}>Mulai fokus</Text>
        <Text style={styles.actionSub}>Atur waktu belajar</Text>
      </TouchableOpacity>
    </View>
    <SectionHeading title="Tugas selanjutnya" action="Lihat semua"
      onPress={() => navigation.navigate('Tugas')} />
    {pending.length ? pending.map(task => <TaskCard key={task.id} task={task}
      onToggle={toggleTask} compact />) :
      <Card><EmptyState emoji="🎉" title="Semua tugas selesai"
        description="Kamu bisa menambahkan target belajar baru." /></Card>}
    <PrimaryButton style={{ marginTop: 14 }} label="✍️ Tulis refleksi hari ini"
      outline onPress={() => navigation.navigate('Jurnal')} />
  </Page>;
}

const styles = StyleSheet.create({
  hero: { backgroundColor: C.dark, borderColor: C.dark, padding: 22 },
  heroEyebrow: { color: '#C3CCFF', letterSpacing: 1.5, fontWeight: '800', fontSize: 10 },
  progressRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 9, marginBottom: 17 },
  big: { color: C.white, fontWeight: '900', fontSize: 45 },
  progressHint: { color: '#DBE0FF', marginLeft: 13, fontSize: 12 },
  motivation: { color: '#DEE4FF', fontSize: 11, marginTop: 14 },
  statRow: { flexDirection: 'row', marginTop: 14, marginRight: -8 },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
  action: { width: '48.3%', backgroundColor: C.white, borderWidth: 1, borderColor: C.border,
    borderRadius: 17, padding: 15 },
  actionEmoji: { fontSize: 24, marginBottom: 10 },
  actionText: { fontSize: 13, color: C.ink, fontWeight: '800' },
  actionSub: { fontSize: 11, color: C.secondary, marginTop: 4 },
});
