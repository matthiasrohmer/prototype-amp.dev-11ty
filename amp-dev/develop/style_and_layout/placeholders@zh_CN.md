---
$title: 占位符和后备行为
---

为了提高用户感知的性能并实现渐进增强效果，AMP 中的最佳做法是尽可能提供占位符和后备行为。

一些元素甚至通过放宽限制来鼓励您这样做。例如，如果您为 [`<amp-iframe>`](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder) 提供占位符，则可以将该组件用在网页顶部附近（如果不使用占位符，网页将无法正常运行）。

## 占位符

标记有 `placeholder` 属性的元素充当
父级 AMP 元素的占位符。
如果指定，则 `placeholder` 元素必须是 AMP 元素的直接子级。
标记为 `placeholder` 的元素将始终 `fill`（填充）父级 AMP 元素。

[example preview="inline" playground="true" imports="amp-anim:0.1"]
```html
<amp-anim src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
  layout="responsive"
  width="400"
  height="300">
  <amp-img placeholder
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
    layout="fill">
  </amp-img>
</amp-anim>
```
[/example]

默认情况下，即使 AMP 元素的资源尚未下载或初始化，
与该 AMP 元素对应的占位符也会立即显示。
准备就绪后，AMP 元素通常会隐藏其占位符并显示相关内容。

[tip type="note"]

占位符不必是 AMP 元素；
任何 HTML 元素都可充当占位符。

[/tip]

## 后备行为 <a name="fallbacks"></a>

您可以在某元素上指定 `fallback` 属性，以便指明出现以下情况时采取的后备行为：

* 浏览器不支持某个元素
* 内容未能加载（例如，Twitter 微博被删除）
* 图片类型不受支持（例如，并非所有浏览器都支持 WebP）

您可以在任何 HTML 元素（而不仅仅是 AMP 元素）上设置 `fallback` 属性。如果指定，则 `fallback` 元素必须是 AMP 元素的直接子级。

##### 示例：不支持的功能

在以下示例中，我们使用 `fallback` 属性告知用户，浏览器不支持特定功能：

[example preview="inline" playground="true" imports="amp-video:0.1"]
```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```
[/example]

##### 示例：提供不同格式的图片

在以下示例中，我们使用 `fallback` 属性告知浏览器，在 WebP 格式不受支持时使用 JPEG 文件。

[example preview="inline" playground="true"]
```html
<amp-img alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp">
  <amp-img alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"></amp-img>
</amp-img>
```
[/example]

## 占位符和后备行为的互动

对于依赖于动态内容的 AMP 组件（例如 [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md)、[`amp-list`](../../../../documentation/components/reference/amp-list.md)），后备行为和占位符的互动方式如下：

<ol>
  <li>在加载内容时显示占位符。</li>
  <li>如果内容加载成功，则隐藏占位符并显示内容。</li>
  <li>如果内容未能加载：
    <ol>
      <li>如果有后备元素，则显示该后备元素。</li>
      <li>否则，继续显示占位符。</li>
    </ol>
  </li>
</ol>

## 隐藏加载指示器

许多 AMP 元素已列入白名单，可以显示“加载指示器”，
这是一个基本动画，用于表明元素尚未加载完毕。
只需添加 `noloading` 属性，元素即可停用此行为。
 
