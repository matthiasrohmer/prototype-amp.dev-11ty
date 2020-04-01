---
$title: Menyematkan & menggunakan AMP sebagai sumber data
---

Jika Anda telah berinvestasi di AMP, namun belum membuat Progressive Web App, Halaman AMP Anda dapat menyederhanakan pengembangan Progressive Web App secara drastis. Dalam panduan ini, Anda akan mempelajari cara membuat AMP dalam Progressive Web App dan mengunakan Halaman AMP yang sudah ada sebagai sumber data.

## Dari JSON ke AMP

Pada skenario yang paling umum, Progressive Web App adalah aplikasi halaman tunggal yang terhubung ke API JSON melalui Ajax. Kemudian, API JSON ini akan menampilkan kumpulan data untuk mendorong navigasi, dan konten yang sebenarnya untuk merender artikel.

Setelah itu, Anda dapat memproses dan mengonversi konten mentah menjadi HTML yang berguna, lalu merendernya pada klien. Proses ini memerlukan biaya yang mahal dan sering kali sulit dikelola. Sebagai gantinya, Anda dapat menggunakan kembali Halaman AMP yang sudah ada sebagai sumber konten. Yang paling penting, AMP menyederhanakan proses ini hanya dengan beberapa baris kode.

##  Menyertakan "AMP Bayangan" di Progressive Web App

Langkah pertama adalah menyertakan AMP versi khusus yang kami sebut “AMP Bayangan” di Progressive Web App. Ya, tepat sekali – library AMP akan dimuat di halaman tingkat atas, namun tidak akan benar-benar mengontrol konten tingkat atas. Library AMP hanya akan “memperkuat” bagian halaman sesuai dengan yang Anda tetapkan.

Sertakan AMP Bayangan di bagian atas halaman, seperti contoh berikut:

[sourcecode:html]
<!-- Muat library waktu proses AMP-with-Shadow-DOM secara asinkron. -->
<script async src="https://cdn.ampproject.org/shadow-v0.js"></script>
[/sourcecode]

### Bagaimana Anda tahu kapan API AMP Bayangan siap digunakan?

Sebaiknya muat library AMP Bayangan dengan menempatkan atribut `async`. Namun, itu artinya Anda perlu menggunakan cara tertentu untuk memahami kapan library sepenuhnya dimuat dan siap digunakan.

Sinyal yang tepat yang harus diamati adalah ketersediaan variabel `AMP` global, dan AMP Bayangan menggunakan “[pendekatan pemuatan fungsi asinkron](http://mrcoles.com/blog/google-analytics-asynchronous-tracking-how-it-work/)” untuk membantu Anda mengetahuinya. Pertimbangkan kode berikut:

[sourcecode:javascript]
(window.AMP = window.AMP || []).push(function(AMP) {
  // AMP kini tersedia.
});
[/sourcecode]

Kode ini akan berfungsi, dan berapa pun jumlah panggilan balik yang ditambahkan dengan cara ini akan diaktifkan saat AMP tersedia, namun mengapa hal ini bisa terjadi?

Kode ini berarti:

  1. “jika window.AMP tidak ada, buat array kosong untuk mengambil alih posisinya”
  1. "kemudian, terapkan fungsi panggilan balik ke array yang harus dijalankan saat AMP sudah siap"

Cara ini dapat berfungsi karena library AMP Bayangan, saat pemuatan yang sebenarnya, akan mengetahui bahwa telah ada array panggilan balik pada `window.AMP`, lalu memproses seluruh antrean. Jika kemudian Anda menjalankan kembali fungsi yang sama, fungsi tersebut akan tetap bekerja, karena AMP Bayangan menggantikan `window.AMP` dengan sendirinya beserta metode `push` kustom, yang langsung mengaktifkan panggilan balik.

[tip type="tip"]
**TIP –** Agar contoh kode di atas lebih praktis, sebaiknya gabungkan ke dalam 1 Promise, lalu selalu gunakan Promise tersebut sebelum dijalankan dengan API AMP. Lihat [Kode demo React](https://github.com/ampproject/amp-publisher-sample/blob/master/amp-pwa/src/components/amp-document/amp-document.js#L20) kami untuk mengetahui contohnya.
[/tip]

## Menangani navigasi di Progressive Web App

Anda tetap perlu menerapkan langkah ini secara manual. Lagi pula, terserah Anda bagaimana menampilkan link ke konten di konsep navigasi. Apakah berupa beberapa daftar? Atau sejumlah kartu?

Pada skenario umum, Anda akan mengambil sejumlah JSON yang menampilkan URL yang diurutkan dengan beberapa metadata. Pada tahap akhir, Anda akan memiliki panggilan balik fungsi yang diaktifkan saat pengguna mengklik salah satu link, dan panggilan balik tersebut harus menyertakan URL halaman AMP yang diminta. Jika Anda mendapati skenario tersebut, Anda sudah siap untuk melakukan langkah terakhir.

## Menggunakan API AMP Bayangan untuk merender inline halaman

Akhirnya, jika Anda ingin menampilkan konten setelah ada tindakan dari pengguna, saatnya mengambil dokumen AMP yang relevan dan biarkan AMP Bayangan menjalankan fungsinya. Pertama-tama, terapkan fungsi untuk mengambil halaman, sama dengan fungsi berikut:

[sourcecode:javascript]
function fetchDocument(url) {

  // sayangnya fetch() tidak mendukung pengambilan dokumen,
  // sehingga kami terpaksa menggunakan XMLHttpRequest saja.
  var xhr = new XMLHttpRequest();

  return new Promise(function(resolve, reject) {
    xhr.open('GET', url, true);
    xhr.responseType = 'document';
    xhr.setRequestHeader('Accept', 'text/html');
    xhr.onload = function() {
      // .responseXML berisi objek Dokumen yang siap digunakan
      resolve(xhr.responseXML);
    };
    xhr.send();
  });
}
[/sourcecode]

Penting: Untuk menyederhanakan contoh kode di atas, kami mengabaikan penanganan error. Anda harus selalu memastikan untuk menemukan dan menangani error dengan baik.

Setelah kita memiliki objek `Dokumen` yang siap digunakan, biarkan AMP menjalankan fungsinya dan merender objek tersebut. Dapatkan referensi ke elemen DOM yang berfungsi sebagai penampung untuk dokumen AMP, lalu panggil `AMP.attachShadowDoc()`, seperti contoh berikut:

[sourcecode:javascript]
// Ini boleh berisi elemen DOM apa pun
var container = document.getElementById('container');

// Halaman AMP yang ingin ditampilkan
var url = "https://my-domain/amp/an-article.html";

// Gunakan metode fetchDocument kami untuk mendapatkan dokumen
fetchDocument(url).then(function(doc) {
  // Biarkan AMP menjalankan fungsinya dan merender halaman
  var ampedDoc = AMP.attachShadowDoc(container, doc, url);
});
[/sourcecode]

[tip type="tip"]
**TIP –** Sebelum Anda benar-benar menyerahkan dokumen ke AMP, saatnya menghapus elemen halaman yang dapat dimengerti saat menampilkan halaman AMP secara mandiri, namun bukan dalam mode tersemat: Misalnya, footer dan header.
[/tip]

Dan selesai! Halaman AMP Anda akan dirender sebagai turunan dari seluruh Progressive Web App.

## Membersihkan dokumen yang tidak lagi digunakan

Pengguna Anda kemungkinan akan membuka satu AMP ke AMP lainnya di Progressive Web App Anda. Saat menutup Halaman AMP yang dirender sebelumnya, selalu pastikan bahwa AMP mengetahui tindakan tersebut, seperti contoh berikut:

[sourcecode:javascript]
// ampedDoc adalah referensi yang ditampilkan dari AMP.attachShadowDoc
ampedDoc.close();
[/sourcecode]

Cara ini akan memberi tahu AMP bahwa Anda tidak lagi menggunakan dokumen ini, dan akan mengosongkan memori serta overhead CPU.

## Lihat cara kerjanya

[video src="/static/img/docs/pwamp_react_demo.mp4" width="620" height="1100" loop="true", controls="true"]

Anda dapat melihat cara kerja pola "AMP di PWA" di [Contoh React](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa) yang telah kami buat. Contoh tersebut menunjukkan transisi yang lancar saat navigasi dan disertai dengan komponen React yang simpel, yang menggabungkan langkah-langkah di atas. Jadi, Anda akan mendapatkan 2 manfaat sekaligus – JavaScript kustom yang fleksibel di Progressive Web App, serta AMP untuk mendorong konten.

* Dapatkan kode sumber di sini: [https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa)
* Gunakan komponen React secara mandiri melalui npm: [https://www.npmjs.com/package/react-amp-document](https://www.npmjs.com/package/react-amp-document)
* Lihat cara kerjanya di sini: [https://choumx.github.io/amp-pwa/](https://choumx.github.io/amp-pwa/) (hasil terbaik di ponsel atau emulasi seluler)

Anda juga dapat melihat contoh PWA dan AMP menggunakan framework Polymer. Contoh tersebut menggunakan [amp-viewer](https://github.com/PolymerLabs/amp-viewer/) untuk menyematkan halaman AMP.

* Dapatkan kodenya di sini: [https://github.com/Polymer/news/tree/amp](https://github.com/Polymer/news/tree/amp)
* Lihat cara kerjanya di sini: [https://polymer-news-amp.appspot.com/](https://polymer-news-amp.appspot.com/)
