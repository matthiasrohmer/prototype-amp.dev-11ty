---
$title: Cerrar sesión
---

Mirip dengan tombol login, munculnya tombol logout bersifat situasional dan bergantung pada status komponen [`amp-access`](../../../../documentation/components/reference/amp-access.md):

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

Saat mengklik tombol Logout, Anda akan diarahkan ke URL yang telah ditentukan dalam konfigurasi JSON [`amp-access`](../../../../documentation/components/reference/amp-access.md), sebagai bagian dari objek login:

[sourcecode:json]
{
"login": {
  "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
  "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
  }
}
[/sourcecode]

Mirip dengan permintaan login, saat server AMPByExample menerima permintaan logout, server tersebut menggunakan parameter kueri URL respons yang otomatis ditambahkan oleh library AMP, lalu mengalihkannya ke parameter tersebut dengan menambahkan `#success=true`. Setelah itu, Anda akan kembali ke halaman awal. Cookie AMPByExample yang sebelumnya dibuat untuk halaman login (disebut `ABE_LOGGED_IN`) akan dihapus pada tahap ini.
