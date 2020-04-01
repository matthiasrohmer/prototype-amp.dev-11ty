---
$category@: media
formats:
  - websites
teaser:
  text: >-
    Displays a [Red Bull Video
    Player](https://player.redbull.com/demo/index.html).
toc: true
$title: amp-redbull-player
version: '0.1'
versions:
  - '0.1'
latest_version: '0.1'
is_current: true
$path: /documentation/components/amp-redbull-player.html
$localization:
  path: '/{locale}/documentation/components/amp-redbull-player.html'
layouts:
  - fixed
  - fixed-height
  - responsive
  - fill
  - flex-item
  - fluid
  - intrinsic
scripts:
  - >-
    <script async custom-element="amp-redbull-player"
    src="https://cdn.ampproject.org/v0/amp-redbull-player-0.1.js"></script>
---


<!---
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



## Example

[sourcecode:html]
<amp-redbull-player
  id="rbvideo"
  data-param-videoid="rrn:content:videos:3965a26c-052e-575f-a28b-ded6bee23ee1:en-INT"
  data-param-skinid="com"
  data-param-locale="en"
  height="360"
  width="640"
></amp-redbull-player>
[/sourcecode]

## Attributes

<table>
  <tr>
    <td width="40%"><strong>data-param-videoid (required)</strong></td>
    <td>The video ID</a>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-param-skinid (optional)</strong></td>
    <td>The ID of the skin to display. Value can be stv or com. Defaults to com</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-param-locale (optional)</strong></td>
    <td>String value for the tracking configuration.</a>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>id (optional)</strong></td>
    <td>Selector for the amp-analytics triggers configuration.</td>
  </tr>
</table>

## Validation

See [amp-redbull-player rules]`(https://github.com/ampproject/amphtml/blob/master/extensions/amp-redbull-player/validator-amp-player-player.protoascii)` in the AMP validator specification.