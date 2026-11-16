# KampusKit — Teman Produktif Mahasiswa

Proyek UTS React Native (Expo) dengan **4 halaman**, **komponen reusable**, **state & props**, **React Hooks**, **navigasi bottom tab**, dan **penyimpanan data lokal**.

> Status: seluruh file source code telah disusun dan diperiksa sintaks JSX-nya. Pengujian secara langsung di perangkat belum bisa dilakukan dari lingkungan pembuatan file ini, karena instalasi dependensi npm memerlukan internet. Ikuti langkah berikut, jalankan, lalu ambil screenshot asli sebelum mengumpulkan tugas.

## A. Persiapan (Windows)

1. Pasang Node.js versi 22.13 atau lebih baru (disarankan Node.js LTS). Cek `node -v` dan `npm -v` di Terminal / PowerShell VS Code.
2. Pasang Visual Studio Code.
3. Pasang **Expo Go** di HP Android. HP dan laptop sebaiknya berada pada jaringan Wi-Fi yang sama.
4. Ekstrak folder `KampusKit-UTS`, lalu buka folder tersebut di VS Code (File > Open Folder).
5. Buka Terminal > New Terminal, pastikan posisi terminal di folder yang berisi `package.json`.

## B. Menjalankan aplikasi

```powershell
npm install
npx expo install --fix
npx expo start --clear
```

- Tunggu QR code Expo muncul di terminal.
- Buka aplikasi Expo Go di HP Android, pilih **Scan QR Code**, kemudian scan QR dari terminal.
- Jika jaringan LAN tidak terhubung, hentikan server dengan Ctrl+C dan coba `npx expo start --tunnel`. Mode tunnel mungkin meminta instalasi paket tambahan.
- Jika muncul pesan versi Expo Go berbeda, perbarui Expo Go atau gunakan versi Expo Go yang sesuai SDK proyek (SDK 58).
- Setelah mengedit file dan menekan Save, aplikasi biasanya memuat ulang otomatis.

**Kendala umum:** jika terminal bukan di folder proyek, `npm install` tidak akan menemukan `package.json`; masuklah dengan `cd nama-folder`. Jika port telah dipakai, ikuti tawaran Expo untuk menggunakan port lain. Jika ada error versi dependensi, jalankan `npx expo install --fix` lalu `npx expo start --clear` lagi.

## C. Halaman aplikasi

| Halaman | Fungsi | File |
|---|---|---|
| Beranda | Progres tugas, jumlah target, menit fokus, shortcut | `src/screens/HomeScreen.js` |
| Tugas | Menambah, menghapus, mencentang, memfilter tugas | `src/screens/TasksScreen.js` |
| Fokus | Timer 1/10/25/45 menit, mulai/jeda/reset, menyimpan sesi selesai | `src/screens/FocusScreen.js` |
| Jurnal | Memilih suasana hati, menulis, menyimpan, menghapus refleksi | `src/screens/JournalScreen.js` |

Aplikasi sengaja memiliki pilihan **1 menit untuk demonstrasi** agar penyelesaian timer bisa ditunjukkan pada video tanpa harus menunggu 25 menit.

## D. Pemetaan materi UTS

- **Navigasi:** `App.js` — `NavigationContainer`, `createBottomTabNavigator`, `Tab.Screen`.
- **Komponen:** `src/components/UI.js`, `TaskCard.js`, `StatCard.js`.
- **Props:** `TaskCard` menerima `task`, `onToggle`, `onDelete`, `compact` dari parent; `StatCard` menerima `icon`, `value`, `label`, `tone`.
- **State:** `useState` di `TasksScreen`, `FocusScreen`, `JournalScreen` dan `AppContext`.
- **Hooks:** `useState`, `useEffect`, `useMemo`, `useCallback`, `useContext`, dan `useRef`.
- **Data antarhalaman:** `AppProvider` membagikan state melalui React Context; komponen anak menerima props khusus sesuai kebutuhan.
- **Penyimpanan:** `AsyncStorage` mengingat tugas, jurnal, dan sesi fokus secara lokal di HP.