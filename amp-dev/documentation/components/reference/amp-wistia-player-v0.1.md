---
$category@: media
formats:
  - websites
teaser:
  text: 'Displays a [Wistia](https://wistia.com) video.'
toc: true
$title: amp-wistia-player
version: '0.1'
versions:
  - '0.1'
latest_version: '0.1'
is_current: true
$path: /documentation/components/amp-wistia-player.html
$localization:
  path: '/{locale}/documentation/components/amp-wistia-player.html'
layouts:
  - fill
  - fixed
  - fixed-height
  - flex-item
  - responsive
scripts:
  - >-
    <script async custom-element="amp-wistia-player"
    src="https://cdn.ampproject.org/v0/amp-wistia-player-0.1.js"></script>
---


<!---
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

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



## Example

[sourcecode:html]
<amp-wistia-player
  data-media-hashed-id="u8p9wq6mq8"
  width="512"
  height="360"
></amp-wistia-player>
[/sourcecode]

## Attributes

<table>
  <tr>
    <td width="40%"><strong>data-media-hashed-id (required)</strong></td>
    <td>The Wistia media id is found in every Wistia media page URL. If the media page URL is https://support.wistia.com/medias/u8p9wq6mq8, the data-media-hashed-id is <code>u8p9wq6mq8</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>common attributes</strong></td>
    <td>This element includes <a href="https://amp.dev/documentation/guides-and-tutorials/learn/common_attributes">common attributes</a> extended to AMP components.</td>
  </tr>
</table>

## Validation

See [amp-wistia-player rules](https://github.com/ampproject/amphtml/blob/master/extensions/amp-wistia-player/validator-amp-wistia-player.protoascii) in the AMP validator specification.