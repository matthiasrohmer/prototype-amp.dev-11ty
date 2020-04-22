---
$title: 将 AMP 与应用集成
---

本指南面向希望集成和链接到 AMP 网页的移动应用和网页应用开发者。例如，某移动聊天应用可以加载所分享网址的 AMP 版本，为用户带来更快的体验。

## 转换指向 AMP 的链接

借助 AMP，您可以近乎即时地在
原生或移动网页应用内呈现外部网站。要实现此效果，您可以将您内容中的网址
与对应的 AMP 网址（如果存在）相匹配并打开 AMP 版本
（而非原始版本）。您可以使用
[Google 的 AMP URL API](https://developers.google.com/amp/cache/use-amp-url) 等工具
来实现此效果。

例如，通过将所有网址替换为与之匹配的 AMP 版本（如果存在），
可以将下列消息转换为提供 AMP 版本。为
缩短加载时间并保证提供有效的 AMP 网页，您应该链接到在
AMP 缓存中缓存的 AMP 网页。

原始消息：

```text
This is a message with links to an <a href="http://www.example.org/a">
article with AMP version</a> and an <a href="http://www.example.org/b"> article without AMP version</a>.
```

转换后的消息：

```text
This is a message with links to an <a href="https://www-example-org.cdn.ampproject.org/c/www.example.org/a">
article with AMP version</a> and an <a href="www.example.org/b"> article without AMP version</a>.
```

[tip type="success"]
建议在应用的偏好设置中给用户提供选项，以便其能够选择查看
非 AMP 版本（而不是 AMP 版本）。
[/tip]

### 转换链接的方式

您可以通过以下三种方法程序化地转换链接：

1.  **写入时服务器端（首选）**：通过 Google 的
    AMP URL API 在写入网址时检索 AMP 网址，并将 AMP 网址存储在服务器端。将这两个
    网址都传递到客户端，因为分享时可能会用到原始网址。
    建议您使用此方法，因为客户端网络
    请求数更少。采用此方法时，请务必定期
    （例如，每天）检查是否有 AMP 版本的链接，因为越来越多的网站
    在采用 AMP 格式。
1.  **读取时服务器端（用于某些情况）**：通过 Google 的 AMP
    URL API 检索 AMP 网址，然后再将内容传递到客户端。如上所述，请将
    两种网址（AMP 和非 AMP）都传递到客户端，因为在分享时可能会用到
    原始网址。此方法适用于低扇出服务。
1.  **客户端（如果无法采用服务器端网址转换）**：通过
    Google 的 AMP URL API 从客户端检索 AMP 网址。如果无法使用服务器端网址转换，
    请使用此方法（例如，那些使用端到端加密的
    消息传递应用）。确保在内容可用后、发生任何用户互动之前
    立即触发网址转换。

[tip type="important"]
请勿在用户互动后通过 Google 的 AMP API 请求 AMP 网址，
因为这样做会导致网络请求增加，
进而降低应用性能。
请使用如上所述的三种方法之一。
[/tip]

#### Google 的 AMP URL API

借助 Google 的 AMP URL API，
您可以检索与给定网址列表匹配的 AMP HTML 网址（[官方文档](https://developers.google.com/amp/cache/use-amp-url)/
[演示](../../../documentation/examples/documentation/Using_the_AMP_URL_API.html)）。这些网址
无需是规范版本。如果存在 AMP 版本，响应中将包含
原始 AMP 网址和 Google AMP Cache 中缓存的 AMP 网页对应的
网址。

例如，对于给定的网址列表：

```json
{"urls": [
  "https://www.example.org/article-with-amp-version",
  "http://www.example.com/no-amp-version.html"
]}
```

响应正文包含 JSON 格式的 AMP 网址映射：

```json
{
  "ampUrls": [
    {
      "originalUrl": "https://www.example.org/article-with-amp-version",
      "ampUrl": "https://www.example.org/article-with-amp-version/amp",
      "cdnAmpUrl": "https://www-example-org.cdn.ampproject.org/c/s/www.example.org/article-with-amp-version"
    }
  ],
  "urlErrors": [
    {
      "errorCode": "NO_AMP_URL",
      "errorMessage": "AMP URL not found.",
      "originalUrl": "http://www.example.com/no-amp-version.html"
    }
  ]
}
```

[tip type="note"]
您无法通过 AMP URL API 检索非 Google AMP Cache 中缓存的 AMP 网页
对应的网址。但是，您可以从返回的 AMP
网址 (ampURL) 轻松得出缓存的网址。
[/tip]

## 使用 AMP 缓存

[AMP 缓存](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md)是一种
基于代理的内容分发网络 (CDN)，用于分发有效的 AMP 文档。
AMP 缓存旨在：

*   仅提供有效的 AMP 网页。
*   让 AMP 网页能够安全高效地预加载。
*   对内容进行额外的性能优化，以提升用户体验。

目前，有 2 家提供商提供 AMP 缓存服务：

*   [Google AMP Cache](https://developers.google.com/amp/cache/)
*   [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

这意味着您可以通过两种方式使用以下任一版本在应用中显示 AMP 文件：

1.  由发布商托管的版本
1.  在 AMP 缓存中托管的版本

我们建议使用 AMP 缓存，原因如下：

*   其加载速度更快且延迟更短（加载时间缩短 1 秒以上），
    所以用户体验更佳。
*   其会额外缓存依赖于客户端的软件工件（例如，缓存同一
    图片的不同版本，具体取决于客户端的视口大小），因此
    可提高性能并节省带宽。
*   原始 AMP 文件可能不再是有效的 AMP，这样可能会导致
    不良的用户体验。在这种情况下，AMP 缓存会提供
    AMP 文件的最后一个有效版本。
*   不太正派的发布商可能会向 AMP 缓存抓取工具和您的用户
    提供两个不同的文档。使用 AMP 缓存可保证用户看到的
    AMP 文件始终与 AMP 缓存看到的相同。

[tip type="important"]
通过 AMP 缓存提供 AMP 网页时，提供的查看工具体验
应清楚地显示 AMP 来源并使用户能够分享
规范网址（要了解详情，另请参阅以下两节内容）。
[/tip]

## 实现 AMP 查看工具

AMP runtime 提供了一个 Viewer API，后者提供了
在 AMP runtime 和查看工具之间收发消息的协议。这样，您就可以
控制 AMP 文档的预呈现、在文章之间的滑动
以及 AMP runtime 插桩行为。要详细了解 AMP Viewer API，请参阅
[将 AMP 查看工具与 AMP 网页相关联](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md)
指南。您可以在 [GitHub](https://github.com/ampproject/amp-viewer) 上找到
针对[网页](https://github.com/ampproject/amp-viewer/blob/master/mobile-web/README.md)
和 [iOS](https://github.com/ampproject/amp-viewer/tree/master/ios) 的查看工具实现方式。Android
查看工具尚未推出，请参阅 Stack Overflow 上的[此答案](https://stackoverflow.com/questions/44856759/does-we-need-to-change-anything-in-usual-webpage-loader-for-loading-an-amp-acce/44869038#44869038)，
了解如何以最佳方式配置 WebView 以显示 AMP 网页。

下面介绍了一些关于实现 AMP 查看工具的一般最佳做法：

*   从 AMP 缓存提供 AMP 网页（加载时间缩短 1 秒以上）。
*   显示文章的发布商来源（例如，在可收起标头中）。
*   提供分享操作（另请参阅下方的“[分享 AMP 内容](integrate-with-apps.md#sharing-amp-content)”
    一节）。
*   在基于 WebView 的查看工具中，启用第三方 Cookie。
*   为您的平台/应用设置引荐来源网址。

### 分享 AMP 内容 <a name="sharing-amp-content"></a>

在平台的 AMP 查看工具内分享 AMP 文档时，该平台
应该分享规范网址（如果在技术上可行）。例如，如果
该平台提供了分享按钮，则此按钮应该分享规范网址。

AMP 项目的理念是平台应该要选择
向用户提供哪个版本的文档。因此，
在与不同平台分享时，应该分享规范版本
（而不是 AMP 版本），然后让目标平台做出
正确的选择。
