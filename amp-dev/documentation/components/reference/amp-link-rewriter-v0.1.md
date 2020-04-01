---
$category@: dynamic-content
formats:
  - websites
teaser:
  text: Allows publishers to rewrite URL based on configurable pattern
toc: true
$title: amp-link-rewriter
version: '0.1'
versions:
  - '0.1'
latest_version: '0.1'
is_current: true
$path: /documentation/components/amp-link-rewriter.html
$localization:
  path: '/{locale}/documentation/components/amp-link-rewriter.html'
layouts:
  - nodisplay
scripts:
  - >-
    <script async custom-element="amp-link-rewriter"
    src="https://cdn.ampproject.org/v0/amp-link-rewriter-0.1.js"></script>
---


<!--
Copyright 2019 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->



## Overview

`amp-link-rewriter` allows publishers to rewrite URL based on configurable pattern.

## Getting started

**Add the required script**
Inside the `<head>...</head>` section of your AMP page, insert this code before the line `<script async src="https://cdn.ampproject.org/v0.js"></script>`

Code:

[sourcecode:html]
<script
  async
  custom-element="amp-link-rewriter"
  src="https://cdn.ampproject.org/v0/amp-link-rewriter-0.1.js`"
></script>
[/sourcecode]

**Add the amp-link-rewriter extension**
Inside the `<body>...</body>` section of your AMP page, insert code as shown below the example (it has to be customized for every vendor use case):

Code:

[sourcecode:html]
<amp-link-rewriter layout="nodisplay">
  <script type="application/json">
    {
        "output": "https://visit.foo.net?pid=110&url=${href}&cid=${customerId}",
        "section": [
            "#product-listing-1",
            "#product-listing-2",
        ],
        "attribute": {
            "href": "((?!(https:\/\/skip\.com)).)*",
            "id": "comments",
            "class": "sidebar",
            "rel": "(?!(skip))*",
        },
        "vars": {
            "customerId": "12345"
        }
    }
  </script>
</amp-link-rewriter>
[/sourcecode]

The final code should look like:

[sourcecode:html]
<!DOCTYPE html>
<html ⚡>
  <head>
    ...
    <script
      async
      custom-element="amp-link-rewriter"
      src="https://cdn.ampproject.org/v0/amp-link-rewriter-0.1.js"
    ></script>
    ...
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    ...
    <amp-link-rewriter layout="nodisplay">
      <script type="application/json">
        {
            "output": "https://visit.foo.net?pid=110&url=${href}&cid=${customerId}",
            "section": [
                "#product-listing-1",
                "#product-listing-2",
            ],
            "attribute": {
                "href": "`((?!(https:\/\/skip\.com)).)*`",
                "id": "comments",
                "class": "sidebar",
                "rel": "(?!(skip))*",
            },
            "vars": {
                "customerId": "12345"
            }
        }
      </script>
    </amp-link-rewriter>
    ....
  </body>
</html>
[/sourcecode]

## JSON configuration

##### output (required)

The "output" property has to be a string value with the redirection url plus a query string of placeholders that will be shifted with values defined in the config JSON 'vars' property, or in the anchor itself as a data attribute.

Example:

[sourcecode:html]
<amp-link-rewriter layout="nodisplay">
  <script type="application/json">
    {
        "output": "https://visit.foo.net?pid=110&cid=${customerId}`",
        "vars": {
            "customerId": "12345"
        }
    }
  </script>
</amp-link-rewriter>
[/sourcecode]

We can also define data values in the anchor data attribute as the following example:

[sourcecode:html]
<a
  href="https://www.amazon.de/s?i=computers&rh=n%3A340843031&ref=sn_gfs_co_computervs_AM_5"
  data-vars-event-id="231"
></a>
[/sourcecode]

The config could be something like:

[sourcecode:json]
{
  "output": "https://visit.foo.net?eid=${eventId}&cid=${customerId}"
}
[/sourcecode]

The resulting, rewritten URL would be:

[sourcecode:url]
`https://visit.foo.net?eid=231&cid=12345`
[/sourcecode]

Apart from vars defined in the _vars_ property of the JSON configuration, or as a data attribute, there are other pre-defined _vars_ which are AMP URL MACROs plus anchor attributes id and href that could be used for replacing values in the output pattern. The AMP URL MACROs available are DOCUMENT_REFERRER and SOURCE_URL. The following table shows the relationship between defined data and placeholders.

| value        | source | example                                        | placeholder         |
| ------------ | ------ | ---------------------------------------------- | ------------------- |
| data-vars-\* | anchor | `<a href="..." data-vars-merchant-id="123" />` | `${merchantId}`     |
| href         | anchor | `<a href="https://retailer.com" />`            | `${href}`           |
| id           | anchor | `<a href="..." id="link" />`                   | `${id}`             |
| location     | page   | `https://www.partnerweb.com/`                  | `SOURCE_URL`        |
| random       | page   | `Math.random().toString(32).substr(2)`         | `${random}`         |
| referrer     | page   | `https://google.de/`                           | `DOCUMENT_REFERRER` |
| rel          | anchor | `<a href="..." rel="pass" />`                  | `${rel}`            |
| rev          | anchor | `<a href="..." rev="author" />`                | `${rev}`            |
| vars.\*      | config | `{ "vars": { "publisherId": "123" } }`         | `${publisherId}`    |

##### section (optional)

The "section" property defines an array of css selector expressions that filter areas where the url rewriting should operate.

Example:

[sourcecode:json]
{
  "output": "https://visit.foo.net?pid=110&url=${href}&cid=${customerId}",
  "section": ["#product-listing-1", "#product-listing-2"]
}
[/sourcecode]

In the previous example, the html sections defined with attribute ID equal to "product-listing-1" and "product-listing-2" will be considered for url rewriting.

##### attribute (optional)

The "attribute" property defines a list of rules to match the anchor elements retrieved from the filtered sections. These rules are built from regular expressions associated with html element attributes as "id", "href", "class" or "rel".

Example:

[sourcecode:json]
{
  "section": ["#product-listing-1"],
  "attribute": {
    "href": "((?!(https://skip.com)).)*",
    "class": "comments"
  }
}
[/sourcecode]

The anchors within the html area with id 'product-listing-1' will have to match the regex expression defined for the attribute href and class. The regex expression will be wrapped with ^ and \$ for a full match.
In this example, it means that all the anchors with `youtube.com` and 'mobile.vodafone.de' will be excluded. Also, the included anchors need to have a class attribute with the value 'comments'

## Validation

See [amp-link-rewriter rules](https://github.com/ampproject/amphtml/blob/master/extensions/amp-link-rewriter/validator-amp-link-rewriter.protoascii) in the AMP validator specification.