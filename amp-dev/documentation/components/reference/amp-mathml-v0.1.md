---
$category@: presentation
formats:
  - websites
teaser:
  text: 'Displays a [MathML formula](https://www.w3.org/Math/).'
toc: true
$title: amp-mathml
version: '0.1'
versions:
  - '0.1'
latest_version: '0.1'
is_current: true
$path: /documentation/components/amp-mathml.html
$localization:
  path: '/{locale}/documentation/components/amp-mathml.html'
layouts:
  - container
scripts:
  - >-
    <script async custom-element="amp-mathml"
    src="https://cdn.ampproject.org/v0/amp-mathml-0.1.js"></script>
---


<!--
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



## Behavior

This extension creates an iframe and renders a MathML formula.

#### Example: The Quadratic Formula

[sourcecode:html]
<amp-mathml
  layout="container"
  data-formula="\[x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\]"
>
</amp-mathml>
[/sourcecode]

#### Example: Cauchy's Integral Formula

[sourcecode:html]
<amp-mathml
  layout="container"
  data-formula="\[f(a) = \frac{1}{2\pi i} \oint\frac{f(z)}{z-a}dz\]"
>
</amp-mathml>
[/sourcecode]

#### Example: Double angle formula for Cosines

[sourcecode:html]
<amp-mathml
  layout="container"
  data-formula="$$ \cos(θ+φ)=\cos(θ)\cos(φ)−\sin(θ)\sin(φ) $$"
>
</amp-mathml>
[/sourcecode]

#### Example: Inline formula

This is an example of a formula of `` <amp-mathml layout="container" inline data-formula="`x`"></amp-mathml> ``, `<amp-mathml layout="container" inline data-formula="\(x = {-b \pm \sqrt{b^2-4ac} \over 2a}\)"></amp-mathml>` placed inline in the middle of a block of text. `<amp-mathml layout="container" inline data-formula="\( \cos(θ+φ) \)"></amp-mathml>` This shows how the formula will fit inside a block of text and can be styled with CSS.

## Attributes

##### data-formula (required)

Specifies the formula to render.

##### inline (optional)

If specified, the component renders inline (`inline-block` in CSS).

## Validation

See [amp-mathml rules](https://github.com/ampproject/amphtml/blob/master/extensions/amp-mathml/validator-amp-mathml.protoascii) in the AMP validator specification.