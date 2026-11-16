import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateId, localDateKey } from '../utils/date';

const STORAGE_KEY = '@kampuskit_data_v1';
const AppContext = createContext(null);

const initialTasks = [
  {
    id: 'contoh-1', title: 'Pelajari komponen dan props',
    course: 'Pemrograman Mobile', priority: 'Tinggi', done: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'contoh-2', title: 'Buat ringkasan materi kuliah',
    course: 'Kegiatan Akademik', priority: 'Sedang', done: false,
    createdAt: new Date().toISOString(),
  },
];

export function AppProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [journals, setJournals] = useState([]);
  const [focusSessions, setFocusSessions] = useState([]);
  const [ready, setReady] = useState(false);

  // useEffect 1: mengambil data tersimpan saat aplikasi dibuka.
  useEffect(() => {
    let mounted = true;
    async function loadSavedData() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw && mounted) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed.tasks)) setTasks(parsed.tasks);
          if (Array.isArray(parsed.journals)) setJournals(parsed.journals);
          if (Array.isArray(parsed.focusSessions)) setFocusSessions(parsed.focusSessions);
        }
      } catch (error) {
        console.warn('Gagal membaca data lokal:', error);
      } finally {
        if (mounted) setReady(true);
      }
    }
    loadSavedData();
    return () => { mounted = false; };
  }, []);

  // useEffect 2: menyimpan perubahan agar data tetap ada setelah aplikasi ditutup.
  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks, journals, focusSessions }))
      .catch(error => console.warn('Gagal menyimpan data:', error));
  }, [tasks, journals, focusSessions, ready]);

  const addTask = useCallback((title, course, priority) => {
    const newTask = {
      id: generateId(), title: title.trim(), course: course.trim() || 'Umum',
      priority, done: false, createdAt: new Date().toISOString(),
    };
    setTasks(previous => [newTask, ...previous]);
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks(previous => previous.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(previous => previous.filter(task => task.id !== id));
  }, []);

  const addJournal = useCallback((content, mood) => {
    setJournals(previous => [{
      id: generateId(), content: content.trim(), mood,
      createdAt: new Date().toISOString(),
    }, ...previous]);
  }, []);

  const deleteJournal = useCallback((id) => {
    setJournals(previous => previous.filter(entry => entry.id !== id));
  }, []);

  const recordFocusSession = useCallback((minutes) => {
    setFocusSessions(previous => [{
      id: generateId(), minutes, date: localDateKey(),
      createdAt: new Date().toISOString(),
    }, ...previous]);
  }, []);

  const stats = useMemo(() => {
    const done = tasks.filter(task => task.done).length;
    const today = localDateKey();
    const todaySessions = focusSessions.filter(session => session.date === today);
    return {
      total: tasks.length,
      done,
      pending: tasks.length - done,
      completion: tasks.length ? Math.round((done / tasks.length) * 100) : 0,
      todayMinutes: todaySessions.reduce((sum, session) => sum + session.minutes, 0),
      totalMinutes: focusSessions.reduce((sum, session) => sum + session.minutes, 0),
      totalSessions: focusSessions.length,
      journalCount: journals.length,
    };
  }, [tasks, focusSessions, journals]);

  const value = useMemo(() => ({
    tasks, journals, focusSessions, ready, stats,
    addTask, toggleTask, deleteTask, addJournal, deleteJournal, recordFocusSession,
  }), [tasks, journals, focusSessions, ready, stats,
    addTask, toggleTask, deleteTask, addJournal, deleteJournal, recordFocusSession]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppData harus digunakan di dalam AppProvider.');
  return context;
}
