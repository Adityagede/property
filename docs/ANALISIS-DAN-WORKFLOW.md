# Analisis Referensi & Workflow Pengembangan Website Property

**Project:** ARUNA — Property & Stays (identitas sementara)
**Referensi:** https://eliteoperates.com/
**Stack wajib:** HTML5, CSS3, JavaScript murni
**Output fase pertama:** Responsive one-page website + fondasi yang mudah dikembangkan.

## 1. Temuan dari website referensi

Konten halaman Elite Operates yang dapat dianalisis dari halaman publik memperlihatkan urutan berikut:

1. Hero: klaim positioning "Property Management, Redefined", deskripsi dan dua CTA.
2. Angka kredibilitas terkait pengalaman, vila, revenue, reviews, dan daerah operasi.
3. "Why Choose Us": upkeep, compliance, guest care, revenue.
4. Services: marketing, styling, reporting, staffing, distribution, maintenance.
5. Plans: online marketing dan full management beserta rincian fitur.
6. Property showcase.
7. Owner journey dan seller journey masing-masing tiga tahap.
8. Contact melalui WhatsApp dan formulir.
9. Footer dan tautan navigasi.

Ini pada dasarnya **website jasa pengelolaan properti**, bukan katalog listing jual/beli mandiri. Funnel yang paling terlihat: *awareness → trust → service understanding → proof/showcase → pricing & process → inquiry*. Visual piksel-per-piksel tidak dapat diverifikasi melalui browser otomasi pada lingkungan ini; karena itu pilihan visual di project ini adalah interpretasi editorial mandiri, bukan klaim replika pixel-perfect.

## 2. Pilihan desain untuk website kita

- **Brand sementara:** ARUNA — Property & Stays.
- **Kesan:** quiet luxury, Bali hospitality, elegant architecture, considerate service.
- **Palet:** forest green (`#202d27`), warm cream (`#f5f3ed`), paper (`#eeeae1`), antique gold (`#b99a72`).
- **Display typography:** Playfair Display, klasik-editorial, headline besar dengan aksen italic.
- **UI typography:** DM Sans, sistematis dan tetap mudah dibaca.
- **Layout:** content width 1200 px, outer wide 1360 px, purposeful whitespace, garis tipis, hampir tanpa rounded-card generik.
- **Motion:** entrance halus dan gerakan hover kecil, menghormati preferensi `prefers-reduced-motion`.
- **Arah layout:** photography-led hero → editorial philosophy → values → service showcase → curated properties → clear process → packages → direct contact.

**Apa yang sengaja berbeda dari referensi:** Tidak memakai merek, kalimat headline, logo, gambar, statistik performa atau identitas kontak Elite Operates. Tidak menggunakan data kredibilitas palsu untuk brand yang belum diberikan. Ada filter portofolio dan modal detail, navigasi mobile khusus, form validation dan konfigurasi contact.

## 3. Hierarki halaman & jobs-to-be-done

| Bagian | Pertanyaan pengunjung | Interaksi / CTA |
| --- | --- | --- |
| Hero | Bisnis ini menawarkan apa? | Discover Our Approach |
| Philosophy | Kenapa harus percaya? | What we take care of |
| Principles | Cara kerjanya berbeda di mana? | Edukasi tanpa hard-sell |
| Expertise | Layanan konkret apa yang tersedia? | Discuss Your Property |
| Residences | Visual dan standar seperti apa? | Filter area, lihat detail konsep |
| Process | Bagaimana memulai kerja sama? | Tab owner / seller |
| Packages | Model layanan mana yang cocok? | Detail paket, prefill service inquiry |
| Closing CTA | Apakah layak mulai ngobrol? | Start a Conversation |
| FAQ | Apa pertanyaan yang menghambat keputusan? | Native expanding answers |
| Contact | Bagaimana menjadi calon pelanggan? | Validasi dan compose via WhatsApp |

## 4. Arsitektur front-end

`index.html` adalah semantic page dan konten; `assets/css/style.css` adalah design system dan breakpoint; `assets/js/main.js` adalah behavior dan konfigurasi data. Tidak ada CMS/database/API yang disamarkan. Semua contoh listing saat ini dibuat sebagai data lokal untuk demo UI.

**Mobile:** breakpoint 1200 / 980 / 700 / 420px. **Accessibility:** landmark/heading semantik, visible focus, keyboard navigable dialog dan tab, real button untuk aksi, gambar alt text, skip link, reduced-motion support.

**Perilaku form:** JS melakukan validasi, menyusun teks pesan, kemudian membuka WhatsApp melalui URL compose. Pesan hanya terkirim jika user menekan Send di WhatsApp. Aplikasi tidak menyimpan atau mengirim data secara diam-diam. Saat nomor bisnis belum dikonfigurasi, penerima harus dipilih manual oleh pengunjung.

## 5. Workflow project secara bertahap

### Fase A — Discovery & scope (selesai sebagai prototipe)

- [x] Audit urutan konten website referensi.
- [x] Memetakan kebutuhan landing page property management.
- [x] Memilih visual direction dan UI hierarchy berbeda.
- [x] Menghindari duplikasi nama/logo/klaim kompetitor.
- [ ] Konfirmasi nama, logo, bisnis asli, tujuan bisnis, persona, bahasa situs.
- [ ] Pastikan apakah harus ada sistem real estate listing, rental booking, atau management inquiry saja.

### Fase B — Struktur & UI (selesai sebagai prototipe)

- [x] HTML semantik dengan section anchor.
- [x] CSS custom desktop & mobile.
- [x] UI property preview dan detail dialog.
- [x] Interaction states dan progressive enhancement.
- [ ] Uji foto dan konten asli milik bisnis.

### Fase C — Functional front-end (selesai sebagai prototipe)

- [x] Navbar responsive, scroll states, reveal animation.
- [x] Showcase filter dan detail modal.
- [x] Dua alur process / tab accessible.
- [x] Dua paket layanan beserta detailnya.
- [x] FAQ accordion dan form validation.
- [x] WhatsApp composer dengan konfigurasi nomor.
- [ ] Ganti sample inquiries dengan nomor WhatsApp bisnis asli.

### Fase D — Data & identitas bisnis (belum)

- [ ] Nama/identitas usaha, tautan media sosial dan kontak sah.
- [ ] Daftar layanan dan pricing yang diverifikasi.
- [ ] Properti asli (lokasi, spesifikasi, status, foto, izin penggunaan).
- [ ] Testimoni dan statistik *hanya jika bisa dibuktikan*.
- [ ] Detail legal, cakupan area, kebijakan privasi dan terminologi penawaran.

### Fase E — Pre-launch QA (sebagian)

- [x] Browser checks pada 1440px, 768px, 390px untuk error JS dan overflow horizontal.
- [x] Validasi filter, dialog, proses owner/seller, navigasi mobile.
- [x] Check input form wajib.
- [ ] Tes foto CDN pada browser dengan akses internet.
- [ ] Tes submit WhatsApp ke nomor sungguhan di ponsel dan desktop.
- [ ] Audit Lighthouse/performance saat hosting di publik.
- [ ] Periksa anchor focus, keyboard, contrast, alt text dan aksesibilitas manual.
- [ ] Periksa metadata SEO/domain, sitemap, favicon final, social sharing preview.
- [ ] Audit kebijakan privasi/cookies bila menambah analytics dan pelacakan.

### Fase F — Publish & maintain (belum)

1. Buat repository Git dengan branch `main`, tambah perubahan melalui PR.
2. Publikasikan sebagai website statis ke hosting pilihan.
3. Konfigurasi domain, DNS dan HTTPS.
4. Tambah monitoring sederhana, backup repo dan changelog.
5. Tetapkan SOP konten: update listing ketika status berubah, verifikasi kontak dan harga minimal tiap bulan, tinjau link/asset sesudah deploy.

## 6. Jika project berkembang

**Versi 1 (saat ini)** cocok untuk perusahaan jasa properti yang menjaring leads melalui WhatsApp. **Versi 2** dapat menambah halaman listing/property detail terpisah, filtering data JSON dan search yang masih murni HTML/CSS/JS. **Versi 3** bila butuh booking real-time, sinkronisasi inventaris, autentikasi, admin dashboard, atau pembayaran memerlukan layanan backend/API terpisah; fitur tersebut tidak dapat diwujudkan secara aman hanya dengan halaman statis.

## 7. Definition of done untuk go-live

Situs dapat dibuka via domain HTTPS di mobile dan desktop; identitas, seluruh CTA dan kontak benar; semua listing terverifikasi; foto berlisensi; form berhasil membawa pengguna ke WhatsApp tujuan; tidak ada error JS fatal, layout overflow atau dead link; kebijakan privasi tersedia jika diperlukan; dan tim punya akses repo/hosting untuk pemeliharaan.
