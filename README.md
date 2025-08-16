# 🌦️ Next Weather App

Aplikasi cuaca modern yang dibangun menggunakan Next.js dan TypeScript, menyediakan informasi cuaca real-time, prakiraan, dan data lingkungan secara mendetail. Didesain dengan antarmuka yang bersih, responsif, dan interaktif.

![Screenshot Aplikasi Cuaca](https://via.placeholder.com/800x450.png?text=Screenshot+Aplikasi+Anda)
*Tampilan Halaman Utama di Mode Gelap dan Terang*

---

## ✨ Fitur Utama

-   **Cuaca Real-time:** Dapatkan data cuaca terkini termasuk suhu, suhu terasa, kelembapan, kecepatan angin, dan tekanan udara.
-   **Pencarian Kota Cerdas:** Cari kota di seluruh dunia dengan fitur *autocomplete* untuk hasil yang cepat dan akurat.
-   **Geolokasi Otomatis:** Deteksi lokasi pengguna secara otomatis untuk menampilkan cuaca lokal saat pertama kali membuka aplikasi.
-   **Prakiraan Cuaca Lengkap:**
    -   Prakiraan cuaca harian hingga 5 hari ke depan.
    -   Grafik interaktif untuk suhu per jam dalam 24 jam.
    -   Grafik probabilitas hujan untuk 5 hari mendatang.
-   **Peta Cuaca Interaktif:** Peta dinamis dari Leaflet yang menampilkan lokasi saat ini beserta lapisan (layer) untuk awan dan curah hujan.
-   **Data Lingkungan:** Informasi kualitas udara (AQI) dan detail polutan seperti PM2.5, Ozon, dan lainnya.
-   **Lokasi Favorit:** Simpan dan akses kota-kota favorit Anda dengan mudah.
-   **Pengaturan Kustom:** Ubah satuan suhu (Celsius/Fahrenheit) dan kecepatan angin (m/s / km/h) sesuai preferensi.
-   **Mode Terang & Gelap:** Tampilan yang nyaman di segala kondisi pencahayaan dengan *toggle* tema yang mulus.
-   **Desain Responsif:** Tampilan optimal di berbagai perangkat, mulai dari desktop hingga mobile.
-   **Peringatan Cuaca:** Menampilkan peringatan cuaca penting dari sumber data.

---

## 🛠️ Teknologi yang Digunakan

-   **Framework:** [Next.js](https://nextjs.org/) 14 (App Router)
-   **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI & Komponen:**
    -   [shadcn/ui](https://ui.shadcn.com/)
    -   [Framer Motion](https://www.framer.com/motion/) untuk animasi
    -   [Lucide React](https://lucide.dev/) untuk ikon
-   **Manajemen State:** [Zustand](https://github.com/pmndrs/zustand)
-   **Grafik & Chart:** [Recharts](https://recharts.org/)
-   **Peta:** [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
-   **Validasi Skema:** [Zod](https://zod.dev/)
-   **Pengujian:** [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)

---

## 🚀 Memulai Proyek

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut.

### Prasyarat

Pastikan Anda telah menginstal:
-   [Node.js](https://nodejs.org/) (versi 18.17 atau lebih tinggi)
-   `npm` atau manajer paket lainnya

### Instalasi

1.  **Clone repositori ini:**
    ```bash
<<<<<<< HEAD
    git clone https://github.com/ifauzeee/nextjs-weather-app.git
    cd nextjs-weather-app
=======
    git clone [https://github.com/ifauzeee/next-weather-app.git](https://github.com/ifauzeee/next-weather-app.git)
    cd next-weather-app
>>>>>>> 411875e (fix layout & bug search)
    ```

2.  **Install semua dependency:**
    ```bash
    npm install
    ```

3.  **Konfigurasi Environment Variables:**
    Buat file bernama `.env.local` di root proyek dan salin konten di bawah ini.

    ```env
    # Kunci API dari OpenWeatherMap (untuk data cuaca saat ini & AQI)
    # Dapatkan di: [https://openweathermap.org/api](https://openweathermap.org/api)
    NEXT_PUBLIC_OPENWEATHER_API_KEY=GANTI_DENGAN_API_KEY_ANDA

    # Kunci API dari WeatherAPI (untuk forecast & geocoding)
    # Dapatkan di: [https://www.weatherapi.com/](https://www.weatherapi.com/)
    WEATHERAPI_API_KEY=GANTI_DENGAN_API_KEY_ANDA
    ```
    Ganti `GANTI_DENGAN_API_KEY_ANDA` dengan kunci API yang Anda peroleh dari masing-masing layanan.

4.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```
    Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 📜 Skrip yang Tersedia

-   `npm run dev`: Menjalankan aplikasi dalam mode pengembangan.
-   `npm run build`: Mem-build aplikasi untuk production.
-   `npm run start`: Menjalankan aplikasi yang sudah di-build.
-   `npm run lint`: Menjalankan ESLint untuk memeriksa masalah pada kode.
-   `npm run test`: Menjalankan Jest dalam mode *watch* untuk pengujian.

---

## 📂 Struktur Proyek

````

<<<<<<< HEAD
Proyek ini dilisensikan di bawah Lisensi MIT. Lihat file [LICENSE](https://github.com/ifauzeee/nextjs-weather-app/blob/main/LICENSE) untuk detail lebih lanjut.
=======
next-weather-app/
├── app/
│   ├── api/                \# Rute API untuk data cuaca & geocoding
│   ├── details/[city]/     \# Halaman detail cuaca
│   ├── globals.css         \# CSS global & variabel tema
│   ├── layout.tsx          \# Layout utama aplikasi
│   ├── loading.tsx         \# Komponen loading global
│   └── page.tsx            \# Halaman utama
├── components/
│   ├── ui/                 \# Komponen UI (Button, Input, Chart)
│   └── ...                 \# Komponen fungsional (SearchForm, WeatherMap, dll.)
├── hooks/
│   ├── useGeolocation.ts   \# Hook kustom untuk akses lokasi
│   └── useSettingsStore.ts \# Hook kustom (Zustand) untuk manajemen state
├── lib/
│   ├── api-schemas.ts      \# Skema Zod untuk validasi data API
│   ├── types.ts            \# Definisi tipe TypeScript
│   └── utils.ts            \# Fungsi bantuan (helpers)
├── public/                 \# Aset statis
├── tailwind.config.ts      \# Konfigurasi Tailwind CSS
└── next.config.mjs         \# Konfigurasi Next.js

```

---

## 🙏 Ucapan Terima Kasih

Aplikasi ini tidak akan mungkin terwujud tanpa data yang disediakan oleh:
-   [OpenWeatherMap](https://openweathermap.org/api)
-   [WeatherAPI.com](https://www.weatherapi.com/)
>>>>>>> 411875e (fix layout & bug search)
