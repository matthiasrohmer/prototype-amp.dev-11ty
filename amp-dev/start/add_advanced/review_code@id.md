---
$title: Meninjau kode pembuka
---

Sebelum mulai menambahkan kode, mari kita tinjau contoh halaman [article.amp.html](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html), yang terlihat seperti berikut:

```html
<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">

    <link rel="canonical" href="/article.html">
    <link rel="shortcut icon" href="amp_favicon.png">

    <title>Artikel Berita</title>

    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      body {
        width: auto;
        margin: 0;
        padding: 0;
      }

      header {
        background: tomato;
        color: white;
        font-size: 2em;
        text-align: center;
      }

      h1 {
        margin: 0;
        padding: 0.5em;
        background: white;
        box-shadow: 0px 3px 5px grey;
      }

      p {
        padding: 0.5em;
        margin: 0.5em;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script type="application/ld+json">
    {
     "@context": "http://schema.org",
     "@type": "NewsArticle",
     "mainEntityOfPage":{
       "@type":"WebPage",
       "@id":"https://example.com/my-article.html"
     },
     "headline": "My First AMP Article",
     "image": {
       "@type": "ImageObject",
       "url": "https://example.com/article_thumbnail1.jpg",
       "height": 800,
       "width": 800
     },
     "datePublished": "2015-02-05T08:00:00+08:00",
     "dateModified": "2015-02-05T09:20:00+08:00",
     "author": {
       "@type": "Person",
       "name": "John Doe"
     },
     "publisher": {
       "@type": "Organization",
       "name": "⚡ AMP Times",
       "logo": {
         "@type": "ImageObject",
         "url": "https://example.com/amptimes_logo.jpg",
         "width": 600,
         "height": 60
       }
     },
     "description": "My first experience in an AMPlified world"
    }
    </script>
  </head>
  <body>
    <header>
      Situs Berita
    </header>
    <article>
      <h1>Nama Artikel</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas tortor sapien, non tristique ligula accumsan eu.</p>

      <amp-img src="mountains.jpg" layout="responsive" width="266" height="150"></amp-img>
    </article>
  </body>
</html>
```

Ini adalah halaman AMP sederhana yang lolos [validasi AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) dan validasi data terstruktur [schema.org](http://schema.org/). Jika halaman ini diterapkan di situs berita, pengguna dapat menemukan halaman melalui pengalaman yang kaya di Halaman Hasil Mesin Telusur (misalnya, Carousel cerita teratas di Google Penelusuran).

## Mengaktifkan Validator AMP

Sebelum mengubah halaman, mari kita aktifkan [validator AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) sehingga kita tahu bahwa kita menggunakan HTML AMP yang valid.  **Tambahkan** ID fragmen berikut ke URL Anda:

```text
#development=1
```

Misalnya:

```text
http://localhost:8000/article.amp.html#development=1
```

Buka [Developer Console](https://developer.chrome.com/devtools/docs/console) di Chrome (atau browser pilihan Anda), dan verifikasi bahwa tidak ada error pada halaman AMP.

[tip]
Anda dapat menggunakan berbagai fitur lainnya untuk memvalidasi halaman AMP, seperti:

- [Ekstensi Validator AMP untuk Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc)
- [Ekstensi Validator AMP untuk Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/)
- [Antarmuka Web Validator AMP](https://validator.ampproject.org/)
- ... dan masih banyak lagi

Pelajari lebih lanjut di panduan [Memvalidasi halaman AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md).
[/tip]

{{ image('/static/img/docs/tutorials/tut-advanced-start-nexus5.png', 428, 801, align='right third', caption='Simulated on a Nexus 5X device') }}

## Membuat simulasi pengalaman seluler

Kami mendesain halaman ini untuk perangkat seluler, jadi mari kita **buat simulasi** pengalaman perangkat seluler di developer tools browser Anda. Misalnya, di DevTools Chrome, klik ikon ponsel, dan pilih perangkat seluler dari menu.

Sekarang, kita dapat mulai bekerja di halaman itu sendiri. Mari kita tambahkan beberapa komponen AMP di halaman.
