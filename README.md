#  Weather App Next.js 🌦️

Aplikasi cuaca modern yang dibangun dengan Next.js, TypeScript, dan Tailwind CSS. Aplikasi ini menyediakan informasi cuaca *real-time*, prakiraan cuaca harian dan per jam, kualitas udara, serta peta interaktif.



## ✨ Fitur Utama

-   **Pencarian Kota Dinamis**: Cari cuaca untuk kota mana pun di seluruh dunia dengan saran pelengkapan otomatis.
-   **Data Cuaca Real-time**: Dapatkan suhu terkini, kondisi cuaca, kelembapan, kecepatan angin, dan tekanan udara.
-   **Prakiraan Cuaca 5 Hari**: Lihat ramalan cuaca untuk lima hari ke depan, termasuk suhu maksimum dan minimum.
-   **Grafik Interaktif**: Visualisasikan prakiraan suhu per jam dan probabilitas hujan harian dalam bentuk grafik yang mudah dibaca.
-   **Peta Cuaca**: Lihat lokasi kota pada peta interaktif dengan lapisan untuk awan dan curah hujan.
-   **Kualitas Udara**: Pantau Indeks Kualitas Udara (AQI) dan level polutan utama seperti PM2.5, Ozon, dan lainnya.
-   **Mode Terang & Gelap**: Tampilan yang nyaman di segala kondisi pencahayaan dengan *toggle* tema.
-   **Pengaturan Kustom**: Ubah satuan suhu (Celsius/Fahrenheit) dan kecepatan angin (m/s atau km/h).
-   **Lokasi Favorit**: Simpan dan akses cepat kota-kota favorit Anda.
-   **Desain Responsif**: Tampilan optimal di perangkat desktop maupun mobile.

## 🛠️ Teknologi yang Digunakan

-   [cite_start]**Framework**: [Next.js](https://nextjs.org/) 14 (App Router) [cite: 1672]
-   [cite_start]**Bahasa**: [TypeScript](https://www.typescriptlang.org/) [cite: 1674]
-   [cite_start]**Styling**: [Tailwind CSS](https://tailwindcss.com/) [cite: 1674]
-   [cite_start]**Manajemen State**: [Zustand](https://github.com/pmndrs/zustand) [cite: 7]
-   [cite_start]**Animasi**: [Framer Motion](https://www.framer.com/motion/) [cite: 5]
-   [cite_start]**Grafik**: [Recharts](https://recharts.org/) [cite: 7]
-   [cite_start]**Peta**: [React Leaflet](https://react-leaflet.js.org/) [cite: 7] [cite_start]& [Leaflet](https://leafletjs.com/) [cite: 6]
-   [cite_start]**Komponen UI**: [shadcn/ui](https://ui.shadcn.com/) (termasuk Radix UI & Headless UI) [cite: 5, 1691]
-   [cite_start]**Validasi Skema**: [Zod](https://zod.dev/) [cite: 7]
-   [cite_start]**Linting & Formatting**: ESLint [cite: 9]

## 🚀 Instalasi dan Menjalankan Proyek

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1.  **Clone repositori ini:**
    ```bash
    git clone [https://github.com/NAMA_USER_ANDA/NAMA_REPO_ANDA.git](https://github.com/NAMA_USER_ANDA/NAMA_REPO_ANDA.git)
    cd NAMA_REPO_ANDA
    ```

2.  **Install dependensi:**
    ```bash
    npm install
    ```

3.  **Siapkan Variabel Lingkungan (Environment Variables):**
    Salin file `.env.local.example` menjadi `.env.local` dan isi dengan kunci API Anda.
    ```bash
    cp .env.local.example .env.local
    ```
    Anda memerlukan kunci API dari:
    -   [OpenWeatherMap](https://openweathermap.org/api)
    -   [WeatherAPI](https://www.weatherapi.com/)

    File `.env.local` Anda akan terlihat seperti ini:
    ```
    NEXT_PUBLIC_OPENWEATHER_API_KEY=kunci_api_openweathermap_anda
    WEATHERAPI_API_KEY=kunci_api_weatherapi_anda
    ```

4.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```
    Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📜 Skrip yang Tersedia

-   `npm run dev`: Menjalankan aplikasi dalam mode pengembangan.
-   `npm run build`: Mem-build aplikasi untuk produksi.
-   `npm run start`: Menjalankan aplikasi hasil build produksi.
-   `npm run lint`: Menjalankan linter ESLint.
-   [cite_start]`npm run test`: Menjalankan pengujian dengan Jest. [cite: 1671]

## 🌐 API yang Digunakan

Proyek ini menggabungkan data dari dua sumber API cuaca untuk memberikan informasi yang lebih kaya dan akurat:
-   **OpenWeatherMap**: Digunakan untuk data cuaca saat ini dan kualitas udara.
-   **WeatherAPI**: Digunakan untuk data prakiraan cuaca detail, historis, dan peringatan cuaca.