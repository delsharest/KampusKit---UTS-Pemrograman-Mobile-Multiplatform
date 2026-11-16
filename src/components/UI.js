import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C, shadows } from '../constants/theme';

export function Page({ children, scroll = true }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {scroll ? (
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.pageContent}>
          {children}
        </ScrollView>
      ) : <View style={styles.pageContent}>{children}</View>}
    </SafeAreaView>
  );
}

export function PageTitle({ eyebrow, title, description }) {
  return (
    <View style={styles.heading}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.pageTitle}>{title}</Text>
      {!!description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionHeading({ title, action, onPress }) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {!!action && <TouchableOpacity onPress={onPress} accessibilityRole="button">
        <Text style={styles.sectionAction}>{action} ›</Text>
      </TouchableOpacity>}
    </View>
  );
}

export function PrimaryButton({ label, onPress, outline = false, disabled = false, style }) {
  return <TouchableOpacity disabled={disabled} accessibilityRole="button" onPress={onPress}
    activeOpacity={0.82} style={[styles.button, outline && styles.outline,
      disabled && styles.disabled, style]}>
    <Text style={[styles.buttonText, outline && styles.outlineText]}>{label}</Text>
  </TouchableOpacity>;
}

export function Pill({ label, selected, onPress }) {
  return <TouchableOpacity accessibilityRole="button" onPress={onPress}
    style={[styles.pill, selected && styles.pillSelected]}>
    <Text style={[styles.pillText, selected && styles.pillTextSelected]}>{label}</Text>
  </TouchableOpacity>;
}

export function ProgressBar({ progress }) {
  return <View style={styles.progressTrack}>
    <View style={[styles.progressFill, { width: `${Math.max(0, Math.min(100, progress))}%` }]} />
  </View>;
}

export function EmptyState({ emoji = '✨', title, description }) {
  return <View style={styles.empty}>
    <Text style={styles.emptyIcon}>{emoji}</Text>
    <Text style={styles.emptyTitle}>{title}</Text>
    <Text style={styles.emptyDesc}>{description}</Text>
  </View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.background },
  pageContent: { paddingHorizontal: 22, paddingBottom: 40, paddingTop: 14 },
  heading: { marginBottom: 24 },
  eyebrow: { fontSize: 11, color: C.primary, fontWeight: '800', letterSpacing: 1.3, marginBottom: 8 },
  pageTitle: { fontSize: 29, color: C.ink, fontWeight: '800', lineHeight: 36 },
  description: { color: C.secondary, fontSize: 13, lineHeight: 20, marginTop: 7 },
  card: { backgroundColor: C.white, borderRadius: 22, padding: 18, borderWidth: 1,
    borderColor: C.border, ...shadows.card },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 24, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: C.ink },
  sectionAction: { color: C.primary, fontSize: 12, fontWeight: '800' },
  button: { backgroundColor: C.primary, borderRadius: 14, paddingVertical: 15,
    paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: C.white, fontWeight: '800', fontSize: 14 },
  outline: { backgroundColor: C.white, borderWidth: 1, borderColor: C.primary },
  outlineText: { color: C.primary },
  disabled: { opacity: 0.5 },
  pill: { borderWidth: 1, borderColor: C.border, paddingVertical: 9, paddingHorizontal: 13,
    borderRadius: 12, backgroundColor: C.white, marginRight: 8, marginBottom: 8 },
  pillSelected: { backgroundColor: C.primarySoft, borderColor: C.primary },
  pillText: { color: C.secondary, fontSize: 12, fontWeight: '700' },
  pillTextSelected: { color: C.dark },
  progressTrack: { height: 10, backgroundColor: C.primarySoft, borderRadius: 8, overflow: 'hidden' },
  progressFill: { backgroundColor: C.primary, height: '100%', borderRadius: 8 },
  empty: { alignItems: 'center', paddingHorizontal: 25, paddingVertical: 28 },
  emptyIcon: { fontSize: 35, marginBottom: 10 },
  emptyTitle: { fontWeight: '800', color: C.ink, fontSize: 14, marginBottom: 5, textAlign: 'center' },
  emptyDesc: { color: C.secondary, fontSize: 12, textAlign: 'center', lineHeight: 18 },
});
