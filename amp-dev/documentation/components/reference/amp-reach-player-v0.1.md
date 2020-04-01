---
$category@: media
formats:
  - websites
teaser:
  text: Displays a Beachfront Reach video player.
toc: true
$title: amp-reach-player
version: '0.1'
versions:
  - '0.1'
latest_version: '0.1'
is_current: true
$path: /documentation/components/amp-reach-player.html
$localization:
  path: '/{locale}/documentation/components/amp-reach-player.html'
layouts:
  - fill
  - fixed
  - fixed-height
  - flex-item
  - responsive
scripts:
  - >-
    <script async custom-element="amp-reach-player"
    src="https://cdn.ampproject.org/v0/amp-reach-player-0.1.js"></script>
---


<!---
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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



Displays the Reach Player configured in the [Beachfront Reach](http://beachfrontreach.com) platform.

## Example

The `width` and `height` attributes determine the aspect ratio of the player embedded in responsive layouts.

Example:

[sourcecode:html]
<amp-reach-player
  data-embed-id="default"
  layout="responsive"
  width="560"
  height="315"
>
</amp-reach-player>
[/sourcecode]

## Attributes

<table>
  <tr>
    <td width="40%"><strong>data-embed-id</strong></td>
    <td>The Reach player embed id found in the "players" section or in the generated embed itself.</td>
  </tr>
  <tr>
    <td width="40%"><strong>common attributes</strong></td>
    <td>This element includes <a href="https://amp.dev/documentation/guides-and-tutorials/learn/common_attributes">common attributes</a> extended to AMP components.
</td>
  </tr>
</table>

## Validation

See [amp-reach-player rules](https://github.com/ampproject/amphtml/blob/master/extensions/amp-reach-player/validator-amp-reach-player.protoascii) in the AMP validator specification.