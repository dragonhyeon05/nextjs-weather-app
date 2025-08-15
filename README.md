#  Weather App Next.js 🌦️

<p align="center">
  <img src="https://i.postimg.cc/0QFjdVyt/Screenshot-2025-08-16-at-03-52-37-Weather-App.png" alt="Weather App Showcase" width="800"/>
</p>

<p align="center">
  <a href="https://ifauzeee-weather.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Deployed on Vercel" />
  </a>
  <a href="https://github.com/ifauzeee/nextjs-weather-app/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/ifauzeee/nextjs-weather-app?style=for-the-badge&color=blue" alt="License MIT" />
  </a>
</p>

Aplikasi cuaca modern yang dibangun dengan **Next.js 14 (App Router)**, **TypeScript**, dan **Tailwind CSS**. Aplikasi ini menyediakan informasi cuaca *real-time*, prakiraan cuaca harian dan per jam, kualitas udara, serta peta interaktif dengan lapisan cuaca. Desainnya yang bersih dan responsif memastikan pengalaman pengguna yang optimal di berbagai perangkat.

### [➡️ Live Demo](https://ifauzeee-weather.vercel.app/)

---

## ✨ Fitur Utama

-   **Pencarian Kota Dinamis**: Cari cuaca untuk kota mana pun di seluruh dunia dengan saran pelengkapan otomatis.
-   **Data Cuaca Real-time**: Dapatkan suhu terkini, kondisi cuaca, kelembapan, kecepatan angin, dan tekanan udara.
-   **Prakiraan Cuaca 5 Hari**: Lihat ramalan cuaca untuk lima hari ke depan, termasuk suhu maksimum dan minimum.
-   **Grafik Interaktif**: Visualisasikan prakiraan suhu per jam dan probabilitas hujan harian dalam bentuk grafik yang mudah dibaca.
-   **Peta Cuaca Interaktif**: Lihat lokasi kota pada peta dengan lapisan dinamis untuk awan dan curah hujan.
-   **Kualitas Udara & Polutan**: Pantau Indeks Kualitas Udara (AQI) dan level polutan utama seperti PM2.5, Ozon, dan lainnya.
-   **Geolokasi**: Secara otomatis mendeteksi dan menampilkan cuaca berdasarkan lokasi pengguna saat ini.
-   **Mode Terang & Gelap**: Tampilan yang nyaman di segala kondisi pencahayaan dengan *toggle* tema yang elegan.
-   **Pengaturan Kustom**: Ubah satuan suhu (Celsius/Fahrenheit) dan kecepatan angin (m/s atau km/h) yang tersimpan secara lokal.
-   **Lokasi Favorit**: Simpan dan akses cepat kota-kota favorit Anda langsung dari halaman utama.
-   **Desain Responsif & Modern**: Tampilan optimal di perangkat desktop maupun mobile, dibangun dengan shadcn/ui dan Framer Motion untuk animasi yang mulus.

## 🛠️ Tumpukan Teknologi

-   **Framework**: [Next.js](https://nextjs.org/) 14 (App Router)
-   **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Manajemen State**: [Zustand](https://github.com/pmndrs/zustand) (dengan `persist` middleware)
-   **Animasi**: [Framer Motion](https://www.framer.com/motion/)
-   **Grafik**: [Recharts](https://recharts.org/)
-   **Peta**: [React Leaflet](https://react-leaflet.js.org/) & [Leaflet](https://leafletjs.com/)
-   **Komponen UI**: [shadcn/ui](https://ui.shadcn.com/) (termasuk Radix UI & Headless UI)
-   **Validasi Skema**: [Zod](https://zod.dev/)
-   **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)
-   **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Instalasi dan Menjalankan Proyek

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1.  **Clone repositori ini:**
    ```bash
    git clone https://github.com/ifauzeee/nextjs-weather-app.git
    (https://github.com/ifauzeee/nextjs-weather-app.git)
    cd nextjs-weather-app
    ```

2.  **Install dependensi:**
    Disarankan menggunakan `npm` untuk instalasi.
    ```bash
    npm install
    ```

3.  **Siapkan Variabel Lingkungan (Environment Variables):**
    Buat file `.env.local` di root proyek dan isi dengan kunci API Anda.
    ```
    NEXT_PUBLIC_OPENWEATHER_API_KEY=kunci_api_openweathermap_anda
    WEATHERAPI_API_KEY=kunci_api_weatherapi_anda
    ```
    Anda memerlukan kunci API dari:
    -   [OpenWeatherMap](https://openweathermap.org/api)
    -   [WeatherAPI](https://www.weatherapi.com/)

4.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```
    Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📜 Skrip yang Tersedia

-   `npm run dev`: Menjalankan aplikasi dalam mode pengembangan.
-   `npm run build`: Mem-build aplikasi untuk produksi.
-   `npm run start`: Menjalankan aplikasi hasil build produksi.
-   `npm run lint`: Menjalankan linter ESLint untuk memeriksa kualitas kode.
-   `npm run test`: Menjalankan suite pengujian dengan Jest dalam mode *watch*.

## 🌐 API yang Digunakan

Proyek ini menggabungkan data dari dua sumber API cuaca untuk memberikan informasi yang lebih kaya dan akurat:
-   **OpenWeatherMap**: Digunakan untuk data cuaca saat ini, kualitas udara, dan lapisan peta cuaca.
-   **WeatherAPI**: Digunakan untuk data prakiraan cuaca detail, informasi astronomi (matahari terbit/terbenam), dan peringatan cuaca.

## 📄 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT. Lihat file [LICENSE](https://github.com/ifauzeee/nextjs-weather-app/blob/main/LICENSE) untuk detail lebih lanjut.
