---
$category@: social
formats:
  - websites
teaser:
  text: 'Displays Riddle content (e.g., quiz, list, poll, etc.).'
toc: true
$title: amp-riddle-quiz
version: '0.1'
versions:
  - '0.1'
latest_version: '0.1'
is_current: true
$path: /documentation/components/amp-riddle-quiz.html
$localization:
  path: '/{locale}/documentation/components/amp-riddle-quiz.html'
layouts:
  - responsive
scripts:
  - >-
    <script async custom-element="amp-riddle-quiz"
    src="https://cdn.ampproject.org/v0/amp-riddle-quiz-0.1.js"></script>
---


<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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



Displays any [Riddle](https://www.riddle.com/) item content (e.g., quiz, list, poll, etc.)

This component embeds [Riddle](https://www.riddle.com/) content (e.g., quiz, list, poll, etc.).

## Example

[sourcecode:html]
<amp-riddle-quiz
  layout="responsive"
  width="600"
  height="400"
  data-riddle-id="25799"
>
</amp-riddle-quiz>
[/sourcecode]

## Attributes

<table>
  <tr>
    <td width="40%"><strong>data-riddle-id (required)</strong></td>
    <td>Specifies the unique ID for the Riddle item.</td>
  </tr>
  <tr>
    <td width="40%"><strong>common attributes</strong></td>
    <td>This element includes <a href="https://amp.dev/documentation/guides-and-tutorials/learn/common_attributes">common attributes</a> extended to AMP component.</td>
  </tr>
</table>

## Validation

See [amp-riddle-quiz rules](https://github.com/ampproject/amphtml/blob/master/extensions/amp-riddle-quiz/validator-amp-riddle-quiz.protoascii) in the AMP validator specification.