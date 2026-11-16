import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Card, EmptyState, Page, PageTitle, Pill, PrimaryButton, SectionHeading } from '../components/UI';
import { useAppData } from '../context/AppContext';
import { C } from '../constants/theme';
import { compactDate } from '../utils/date';

const durations = [1, 10, 25, 45];
function clock(seconds) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

export default function FocusScreen() {
  const { focusSessions, stats, recordFocusSession } = useAppData();
  const [duration, setDuration] = useState(25);
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const endTime = useRef(null);

  // useEffect: interval menghitung berdasarkan waktu nyata, bukan sekadar -1 detik.
  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      const next = Math.max(0, Math.ceil((endTime.current - Date.now()) / 1000));
      setRemaining(next);
    }, 250);
    return () => clearInterval(interval);
  }, [running]);

  // Setelah timer mencapai nol, satu sesi fokus disimpan ke riwayat.
  useEffect(() => {
    if (!running || remaining !== 0) return;
    setRunning(false);
    endTime.current = null;
    recordFocusSession(duration);
    Alert.alert('Sesi selesai! 🎉', `Hebat, kamu sudah fokus selama ${duration} menit.`);
  }, [running, remaining, duration, recordFocusSession]);

  function startPause() {
    if (running) {
      setRemaining(Math.max(0, Math.ceil((endTime.current - Date.now()) / 1000)));
      setRunning(false);
      endTime.current = null;
    } else {
      const startSeconds = remaining > 0 ? remaining : duration * 60;
      setRemaining(startSeconds);
      endTime.current = Date.now() + startSeconds * 1000;
      setRunning(true);
    }
  }

  function changeDuration(minutes) {
    if (running) return;
    setDuration(minutes);
    setRemaining(minutes * 60);
  }

  function resetTimer() {
    setRunning(false);
    endTime.current = null;
    setRemaining(duration * 60);
  }

  return <Page>
    <PageTitle eyebrow="KAMPUSKIT / FOCUS MODE" title="Waktu fokus ⏱️"
      description="Pilih durasi, mulai belajar, lalu selesaikan satu sesi." />
    <Card style={styles.timerCard}>
      <Text style={styles.mini}>SIAP UNTUK FOKUS?</Text>
      <View style={styles.circle}>
        <Text style={styles.timer}>{clock(remaining)}</Text>
        <Text style={styles.timerHint}>{running ? 'Sesi sedang berjalan' : 'Menit : detik'}</Text>
      </View>
      <View style={styles.presets}>
        {durations.map(minutes => <Pill key={minutes} label={`${minutes} menit`}
          selected={duration === minutes} onPress={() => changeDuration(minutes)} />)}
      </View>
      <PrimaryButton label={running ? '⏸ Jeda sesi' : '▶ Mulai fokus'} onPress={startPause} />
      <PrimaryButton label="↺ Atur ulang" outline onPress={resetTimer}
        style={{ marginTop: 10 }} />
      <Text style={styles.note}>Riwayat bertambah hanya jika hitung mundur selesai.</Text>
    </Card>
    <View style={styles.summary}>
      <View style={styles.smallStat}>
        <Text style={styles.smallNumber}>{stats.totalSessions}</Text>
        <Text style={styles.smallLabel}>Sesi selesai</Text>
      </View>
      <View style={styles.smallStat}>
        <Text style={styles.smallNumber}>{stats.totalMinutes}</Text>
        <Text style={styles.smallLabel}>Total menit fokus</Text>
      </View>
    </View>
    <SectionHeading title="Riwayat sesi" />
    {focusSessions.length ? focusSessions.slice(0, 5).map(session =>
      <Card key={session.id} style={styles.session}>
        <Text style={styles.sessionIcon}>✅</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.sessionTitle}>Fokus {session.minutes} menit</Text>
          <Text style={styles.sessionDate}>{compactDate(session.createdAt)}</Text>
        </View>
        <Text style={styles.sessionDone}>Selesai</Text>
      </Card>) :
      <Card><EmptyState emoji="🌟" title="Belum ada sesi"
        description="Coba mode 1 menit untuk melihat hasil sesi." /></Card>}
  </Page>;
}

const styles = StyleSheet.create({
  timerCard: { alignItems: 'stretch', padding: 23 },
  mini: { color: C.primary, fontSize: 11, fontWeight: '800', textAlign: 'center', letterSpacing: 1.2 },
  circle: { borderRadius: 150, backgroundColor: C.primarySoft, borderWidth: 7,
    borderColor: '#D9E0FF', width: 232, height: 232,
    justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginVertical: 22 },
  timer: { fontSize: 44, fontWeight: '900', letterSpacing: 1, color: C.dark },
  timerHint: { color: C.secondary, fontSize: 11, marginTop: 7 },
  presets: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 },
  note: { color: C.secondary, fontSize: 11, textAlign: 'center', marginTop: 15 },
  summary: { flexDirection: 'row', marginTop: 14, gap: 10 },
  smallStat: { flex: 1, backgroundColor: C.mint, borderRadius: 17, padding: 17 },
  smallNumber: { color: C.ink, fontWeight: '900', fontSize: 23 },
  smallLabel: { color: C.secondary, fontSize: 11, marginTop: 6 },
  session: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, padding: 15 },
  sessionIcon: { fontSize: 22, marginRight: 13 },
  sessionTitle: { fontSize: 13, fontWeight: '800', color: C.ink },
  sessionDate: { color: C.secondary, fontSize: 11, marginTop: 4 },
  sessionDone: { fontSize: 11, fontWeight: '800', color: C.green },
});
