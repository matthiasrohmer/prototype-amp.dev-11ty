---
$title: 深入了解 AMP 分析
---

本指南深入介绍了
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)，
将一个 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 配置样例拆分成下面这些关键组成要素逐个讲解：

本指南的其余部分会使用此配置样例
来跟踪网页浏览量和用户点击链接的次数
并将分析数据发送给第三方提供商
[Google Analytics（分析）](https://developers.google.com/analytics/devguides/collection/amp-analytics/)：

```html
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "extraUrlParams": {
    "cd1": "AMP"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    },
    "trackAnchorClicks": {
      "on": "click",
      "selector": "a",
      "request": "event",
      "vars": {
        "eventId": "42",
        "eventLabel": "clicked on a link"
      }
    }
  },
  'transport': {
    'beacon': false,
    'xhrpost': false,
    'image': true
  }
}
</script>
</amp-analytics>
```

[tip type="note"]

上面的示例代码纯粹是为了帮助您学习，绝不是真实的样例。如果您正在与分析服务提供商合作，上面的样例便很可能没什么意义；提供商的配置不会这么复杂。请查阅您的[分析服务提供商的文档](analytics-vendors.md)，了解其配置样例。
[/tip]

## 将分析数据发送到何处：type 属性

AMP 支持两种常见的数据收集模式：

* 对于内部分析系统，由发布商拥有的端点获取。
* 对于采用供应商解决方案（例如，[Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html)、
[Chartbeat](http://support.chartbeat.com/docs/) 和 [Google Analytics（分析）](https://developers.google.com/analytics/devguides/collection/amp-analytics/)）的网页，由供应商拥有的端点获取。

要将分析数据发送到分析服务提供商，
请在 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 标记中添加 `type` 属性，并将其值设为
相应的供应商，如
[分析服务供应商](analytics-vendors.md)列表中所定义。

例如：`<amp-analytics type="googleanalytics">` 这一标记会将分析数据
发送到第三方分析服务提供商“Google Analytics（分析）”。
要将数据发送到发布商拥有的端点，
只需不添加 `type` 属性即可；
如此一来，
对于每项[请求](deep_dive_analytics.md#what-data-gets-sent-requests-attribute)，系统都会将分析数据发送到请求中指定的端点。

借助分析服务供应商的配置，
您可以快速开始使用 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)。
您应查阅供应商的文档及
帮助资源，以获取进一步的指导。
如前所述，
倘若您想了解哪些供应商已与 AMP 集成
并获取指向他们各自的文档的链接，
请查看[分析服务供应商](analytics-vendors.md)列表。

如果您是分析服务供应商，
请详细了解
[如何将您自己的分析配置集成到 AMP HTML 中](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md)。

## 加载远程配置：config 属性

您不必将所有的
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 配置全都添加到 AMP 网页中。
您可以改为针对所有配置或部分配置
调用远程网址。

这样，您便能执行一些
诸如根据具体请求改变配置之类的操作。
如果身为发布商的您可以控制远程文件，
您就能执行任何必要的服务器端处理
来构建配置数据。

加载远程配置的第一步是
向 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 标记添加 config 属性：

```html
<amp-analytics config="https://example.com/analytics.account.config.json">
```

下一步是创建位于远程网址上的 JSON 内容。
在这个简单的示例中，
JSON 对象中包含的配置仅仅是分析工具帐号的变量值。

`https://example.com/analytics.account.config.json` 中的内容示例：

```js
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
```

最后一步是确保将远程文件中的内容
提取到 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 配置中的相应位置。
在此处的 `pageview` 和 `event` 请求中，
`account` 变量值都自动设为
远程网址中的帐号值 (`"account": "UA-XXXXX-Y"`)：

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

[tip type="important"]

AMP 不会验证同一变量的多种用法。
值的填充会遵循变量替换优先顺序，
远程网址中的值在该顺序中列在首位（请参阅[变量替换顺序](deep_dive_analytics.md#variable-substitution-ordering)）。

[/tip]

## requests、triggers 和 transports <a name="requests-triggers--transports"></a>

`requests` 属性定义了“发送哪些数据”
（例如 `pageviews`、`events`）
以及将这些数据发送到何处（用于传输数据的网址）。

`triggers` 属性描述了应在何时发送分析数据。
例如，当用户浏览网页时或当用户点击链接时。

`transport` 属性指定了如何发送请求，
更具体地说，即指定了协议。

请继续往下读，以详细了解这些配置。
（您也可
在 [`amp-analytics` 参考信息](../../../../documentation/components/reference/amp-analytics.md)中了解这些配置。）

### 发送哪些数据：requests 属性 <a name="what-data-gets-sent-requests-attribute"></a>

`request-name` 用于在触发器配置中指定
应发送什么请求来响应特定的事件。
`request-value` 是 `https` 网址。
这些值可能会包含
可引用其他请求或变量的占位符令牌。

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

某些分析服务提供商（包括 Google Analytics（分析））
已提供了
可供您通过 `type` 属性使用的配置。
如果您正与某个分析服务提供商合作，
那么您可能无需添加 `requests` 信息。
请参阅您的供应商文档，以查明是否
需要配置 `requests` 以及如何配置。

#### 附加请求网址：extraUrlParams

[extraUrlParams](../../../../documentation/components/reference/amp-analytics.md#extra-url-params)
属性会通过常见的“&foo=baz”惯例指定要向请求网址的查询字符串附加的额外参数。

本指南所用的 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 示例向请求添加了
额外参数 `cd1` 并将参数值设为“AMP”：

```js
  "extraUrlParams": {
    "cd1": "AMP"
  }
```

### 何时发送数据：triggers 属性

`triggers` 属性描述了何时应发送分析请求。
它包含一个由触发器名称和触发器配置构成的键值对。
触发器名称可以是由字母数字字符
(a-zA-Z0-9) 组成的任何字符串。

例如，
下面这个 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 元素被配置为
在首次加载文档时以及每次点击 `a` 标记时
向 `https://example.com/analytics` 发送请求：

```js
"triggers": {
  "trackPageview": {
    "on": "visible",
    "request": "pageview"
  },
  "trackAnchorClicks": {
    "on": "click",
    "selector": "a",
    "request": "event",
    "vars": {
      "eventId": "42",
      "eventLabel": "clicked on a link"
    }
  }
}
```

[tip type="important"]
 我们建议仅对 AMP 网页（不对 AMPHTML 广告）采用上述方法。由于 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 的优先级低于网页内容的优先级，因此您最好使用浏览器重定向来跟踪点击次数，以免在统计点击次数的过程中发生遗漏。
[/tip]

AMP 支持以下触发器配置：

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">触发器配置</th>
      <th data-th="Description">说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"><code>on</code>（必需）</td>
      <td data-th="Description">要监听的事件。有效值包括 <code>click</code>、<code>scroll</code>、<code>timer</code> 和 <code>visible</code>。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>request</code>（必需）</td>
      <td data-th="Description">要发送的请求的名称（如<a href="deep_dive_analytics.md#what-data-gets-sent-requests-attribute">请求</a>中所指定）。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">一个包含特定键值对（用于替换在顶层配置中定义的 <code>vars</code> 或指定此触发器独有的 <code>vars</code>）的对象（另请参阅<a href="deep_dive_analytics.md#variable-substitution-ordering">变量替换顺序</a>）。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>selector</code>（当 <code>on</code> 设为 <code>click</code> 时的必需配置）</td>
      <td data-th="Description">一种 CSS 选择器，用于优化应跟踪哪些元素。使用值 <code>*</code> 可跟踪所有元素。此配置需与 <code>click</code> 触发器结合使用。了解如何使用选择器来<a href="use_cases.md#tracking-page-clicks">跟踪网页点击次数</a>和<a href="use_cases.md#tracking-social-interactions">社交互动</a>。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>scrollSpec</code>（当 <code>on</code> 设为 <code>scroll</code> 时的必需配置）</td>
      <td data-th="Description">控制在哪些条件下滚动网页时会触发 <code>scroll</code> 事件。此对象可以包含 <code>verticalBoundaries</code> 和 <code>horizontalBoundaries</code>，而且必须至少包含其一才能触发 <code>scroll</code> 事件。这两个属性的值都应是包含边界的数字数组（据此才能生成滚动事件）。请参阅此<a href="use_cases.md#tracking-scrolling">跟踪滚动操作</a>的示例。</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>timerSpec</code>（当 <code>on</code> 设为 <code>timer</code> 时的必需配置）</td>
      <td data-th="Description">控制何时触发 <code>timer</code> 事件。定时器会立即触发，之后会按照指定的时间间隔触发。此配置需与 <code>timer</code> 触发器结合使用。</td>
    </tr>
  </tbody>
</table>

[tip type="important"]

来自优先级较低的配置的触发器会被来自优先级较高的配置的同名触发器替换（请参阅[变量替换顺序](deep_dive_analytics.md#variable-substitution-ordering)）。

[/tip]

### 如何发送数据：transport 属性

`transport` 属性指定了如何发送请求。
系统会默认启用下面这三种方法：

<table>
  <thead>
    <tr>
      <th data-th="Transport Method" class="col-thirty">传输方法</th>
      <th data-th="Description">说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description">表示 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a> 可用于传输请求。此方法会发送 <code>POST</code> 请求以及凭据和空正文。</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">表示 <code>XMLHttpRequest</code> 可用于传输请求。此方法会发送 <code>POST</code> 请求以及凭据和空正文。</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description">表示可通过生成 <code>Image</code> 标记来发送请求。此方法会发送 <code>GET</code> 请求。</td>
    </tr>
  </tbody>
</table>

系统仅会使用一种传输方法，
即已启用、已获准、可用
且优先级最高的方法。
优先顺序为 `beacon` > `xhrpost` > `image`。
如果客户端的用户代理不支持某种方法，
则系统会使用已启用且优先级次高的方法。

仅当您想限制传输选项时，才应在
配置中添加 `transport` 属性；
否则，可能会致使请求停止。

在下面的示例中，
`beacon` 和 `xhrpost` 均设为 false，
所以，虽然这两种方法的优先级均高于 `image`，但系统不会使用它们。
如果客户端的用户代理支持 `image` 方法，
系统便会使用这种方法；否则，不会发送任何请求。

```js
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
```

## 变量替换顺序 <a name="variable-substitution-ordering"></a>

AMP 会按照优先顺序使用相应值来填充变量：

1. 远程配置（通过 `config`）。
2. 嵌套在 `triggers` 中某个触发器内的 `vars`。
3. 嵌套在 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 中的顶层 `vars`。
4. 平台提供的值。

在下面的示例中，既有远程配置，
也有在顶层、在触发器中以及在平台级别定义的变量：

```html
<amp-analytics config="http://example.com/config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(cid-scope)}",
  },
  "vars": {
    "account": "ABC123",
    "title": "Homepage"
  },
  "triggers": {
    "some-event": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
        "clientId": "my user"
      }
  }
}
</script>
</amp-analytics>
```

当在多个位置定义了同一个 `var` 时，
变量的优先顺序将设置其值一次。
因此，在上面的示例中，如果远程配置将 `account` 定义为 UA-XXXXX-Y，
则不同 vars 的值将如下所示：

<table>
  <thead>
    <tr>
      <th data-th="var" class="col-thirty"><code>var</code></th>
      <th data-th="Value">值</th>
      <th data-th="Defined By" class="col-thirty">定义者</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="var"><code>canonicalUrl</code></td>
      <td data-th="Value"><code>http://example.com/path/to/the/page</code></td>
      <td data-th="Defined By">平台</td>
    </tr>
    <tr>
      <td data-th="var"><code>title</code></td>
      <td data-th="Value">My homepage</td>
      <td data-th="Defined By">触发器</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">远程配置</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">my user</td>
      <td data-th="Defined By">触发器</td>
    </tr>
  </tbody>
</table>
