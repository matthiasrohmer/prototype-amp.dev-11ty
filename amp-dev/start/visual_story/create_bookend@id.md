---
$title: Membuat bookend
---

Setelah menambahkan semua halaman, sekarang mari kita lihat layar terakhir artikel, yang disebut "bookend".  Layar terakhir ini menjadi penutup artikel, dan dapat Anda gunakan untuk menampilkan opsi berbagi di media sosial dan link terkait ke artikel Anda agar pengguna dapat membagikan berita tersebut atau mencari informasi lebih lanjut tentang konten lain di situs Anda.

Informasi pada layar bookend berasal dari file JSON yang ditetapkan dalam tag `<amp-story-bookend>`. Untuk tutorial ini, kita telah memiliki file JSON ([bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json)) yang memuat data bookend.

Tag `<amp-story-bookend>` harus menjadi tag terakhir dalam [`amp-story`](../../../../documentation/components/reference/amp-story.md). Jadi, mari kita **tambahkan** `<amp-story-bookend></amp-story-bookend>` tepat sebelum tag `</amp-story>` penutup.  Pada tag `amp-story-bookend`, arahkan atribut `src` ke file `bookend.json` dan tetapkan `layout="nodisplay"`:

```html hl_lines="2"
  </amp-story-page>
  <amp-story-bookend src="bookend.json" layout="nodisplay"></amp-story-bookend>
</amp-story>
```

Jika memuat ulang browser dan menuju ke layar terakhir, Anda akan melihat bookend berikut:

{{ image('/static/img/docs/tutorials/amp_story/bookend_full.gif', 398, 709, align='center third', alt='Bookend' ) }}

Mari kita lihat file JSON-nya.  Buka file [bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json) di editor teks.

Setiap layar bookend memerlukan `bookendVersion`, yakni `v1.0` untuk tutorial ini:

```json
"bookendVersion": "v1.0",
```

Tombol berbagi sosial memungkinkan pembaca untuk membagikan konten Anda melalui platform media sosial, seperti Twitter, Facebook, Pinterest, dan lain-lain. Anda dapat menentukan penyedia berbagi sosial dalam objek shareProviders, dan membuat array yang berisi [nama jenis](../../../../documentation/components/reference/amp-social-share.md#pre-configured-providers) untuk setiap platform media sosial.

Untuk tutorial ini, kita memilih Facebook, Twitter, dan email sebagai penyedia berbagi:

```json
"shareProviders": [
  "facebook",
  "twitter",
  "email"
],
```

{{ image('/static/img/docs/tutorials/amp_story/bookend_social_share.png', 720, 240, align='center half', alt='Bookend social share' ) }}

Bagian lain dari layar bookend digunakan untuk konten terkait.  Semua konten terkait ditampung dalam objek `components`.

Ada berbagai komponen yang dapat Anda gunakan untuk menampilkan link dan konten terkait; setiap komponen ditentukan dengan atribut type. Mari kita lihat komponen yang tersedia:

<table>
<thead>
<tr>
  <th width="20%">Jenis</th>
  <th>Deskripsi</th>
</tr>
<tr>
  <td>heading</td>
  <td>Memungkinkan Anda menentukan heading untuk mengelompokkan artikel.
<pre class="nopreline">
{
  "type": "heading",
  "text": "More to read"
},
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_heading.png" width="720" height="140" layout="responsive" alt="bookend heading"></amp-img>
  </figure>
  </td>
</tr>
<tr>
  <td>small</td>
  <td>Memungkinkan Anda untuk menautkan ke artikel terkait dengan opsi untuk menyertakan gambar kecil yang terkait.
<pre class="nopreline">
{
  "type": "small",
  "title": "Learn about cats",
  "url": "https://wikipedia.org/wiki/Cat",
  "image": "assets/bookend_cats.jpg"
},
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_small.png" width="720" height="267" layout="responsive" alt="bookend small article"></amp-img>
  </figure>
</td>
</tr>
<tr>
  <td>landscape</td>
  <td>Memungkinkan Anda untuk menautkan ke artikel atau konten lain, seperti video. Gambar yang terkait dengan jenis ini berukuran lebih besar dan berformat lanskap.
<pre class="nopreline">
{
  "type": "landscape",
  "title": "Learn about border collies",
  "url": "https://wikipedia.org/wiki/Border_Collie",
  "image": "assets/bookend_dogs.jpg",
  "category": "Dogs"
},
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_landscape.png" width="720" height="647" layout="responsive" alt="bookend landscape article"></amp-img>
  </figure>
  </td>
</tr>
<tr>
  <td>portrait</td>
  <td>Memungkinkan Anda untuk menautkan ke berita atau konten lain.  Gambar yang terkait dengan jenis ini berukuran lebih besar dan berformat potret.
<pre class="nopreline">
{
  "type": "portrait",
  "title": "Learn about macaws",
  "url": "https://wikipedia.org/wiki/Macaw",
  "image": "assets/bookend_birds.jpg",
  "category": "birds"
},
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_portrait.png" width="720" height="1018" layout="responsive" alt="bookend portrait article"></amp-img>
  </figure>
  </td>
</tr>
<tr>
  <td>cta-link</td>
  <td>Memungkinkan Anda untuk menentukan link pesan ajakan yang ditampilkan sebagai tombol (misalnya, baca selengkapnya, Berlangganan).
<pre class="nopreline">
{
  "type": "cta-link",
  "links": [
    {
      "text": "Learn more",
      "url": "https://amp.dev/about/stories.html"
    }
  ]
}
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_cta.png" width="720" height="137" layout="responsive" alt="bookend cta"></amp-img>
  </figure>
  </td>
</tr>
</thead>
<tbody>
</tbody>
</table>

Masih ada lagi yang bisa dipelajari tentang komponen bookend. Untuk informasi selengkapnya, lihat dokumen referensi [`amp-story`](../../../../documentation/components/reference/amp-story.md).

Artikel kita hampir jadi.  Sebelum kita memublikasikannya, mari pastikan bahwa HTML AMP kita valid.
