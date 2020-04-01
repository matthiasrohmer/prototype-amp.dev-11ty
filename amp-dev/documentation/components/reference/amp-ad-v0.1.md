---
$category@: ads-analytics
formats:
  - websites
teaser:
  text: A container to display an ad.
toc: true
$title: amp-ad
version: '0.1'
versions:
  - '0.1'
latest_version: '0.1'
is_current: true
$path: /documentation/components/amp-ad.html
$localization:
  path: '/{locale}/documentation/components/amp-ad.html'
layouts:
  - fill
  - fixed
  - fixed-height
  - flex-item
  - fluid
  - intrinsic
  - nodisplay
  - responsive
scripts:
  - >-
    <script async custom-element="amp-ad"
    src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
---


<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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



The `amp-embed` is an alias to the `amp-ad` tag, deriving all of its functionality with a different tag name. Use `amp-embed` when semantically more accurate. AMP documents only support ads/embeds served via HTTPS.

[tip type="note"]
The specification of `amp-ad` / `amp-embed` is likely to significantly evolve over time. The current approach is designed to bootstrap the format to be able to show ads.
[/tip]

## Behavior

Ads are loaded like all other resources in AMP documents, with a special
custom element called `<amp-ad>`. No ad network-provided JavaScript is allowed to run inside the AMP document. Instead, the AMP runtime loads an iframe from a
different origin (via iframe sandbox) as the AMP document and executes the ad
network’s JS inside that iframe sandbox.

The `<amp-ad>` requires width and height values to be specified according to the [rule](<https://amp.dev/documentation/guides-and-tutorials/learn/amp-html-layout/#(tl;dr)-summary-of-layout-requirements-&-behaviors>) of its layout type. It requires a `type` argument that select what ad network is displayed. All `data-*` attributes on the tag are automatically passed as arguments to the code that eventually renders the ad. What `data-` attributes are required for a given type of network depends and must be documented with the ad network.

#### Example: Displaying a few ads

[example preview="inline" playground="true" imports="amp-ad"]

[sourcecode:html]
<amp-ad
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5"
  width="300"
  height="250"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
<amp-ad
  width="300"
  height="250"
  type="industrybrains"
  data-width="300"
  data-height="250"
  data-cid="19626-3798936394"
>
</amp-ad>
<amp-embed
  type="taboola"
  width="400"
  height="300"
  layout="responsive"
  data-publisher="amp-demo"
  data-mode="thumbnails-a"
  data-placement="Ads Example"
  data-article="auto"
>
</amp-embed>
[/sourcecode]

[/example]

## Attributes

<table>
  <tr>
    <td width="40%"><strong>type (required)</strong></td>
    <td>Specifies an identifier for the <a href="#supported-ad-networks">ad network</a>. The <code>type</code>attribute selects the template to use for the ad tag.</td>
  </tr>
  <tr>
    <td width="40%"><strong>src (optional)</strong></td>
    <td>Use this attribute to load a script tag for the specified ad network. This can be used for ad networks that require exactly a single script tag to be inserted in the page. The <code>src</code> value must have a prefix that is white-listed for the specified ad network, and the value must use <code>https</code> protocol.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>Most ad networks require further configuration, which can be passed to the network by using HTML <code>data-</code> attributes. The parameter names are subject to standard data attribute dash to camel case conversion. For example, "data-foo-bar" is send to the ad for configuration as "fooBar". See the documentation for the <a href="#supported-ad-networks">ad network</a> on which attributes can be used.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-vars-foo-bar</strong></td>
    <td>Attributes starting with <code>data-vars-</code> are reserved for <a href="https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute"><code>amp-analytics</code> vars</a>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>json (optional)</strong></td>
    <td>Use this attribute to pass a configuration to the ad as an arbitrarily complex JSON object. The object is passed to the ad as-is with no mangling done on the names.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-consent-notification-id (optional)</strong></td>
    <td>If provided, requires confirming the <a href="https://amp.dev/documentation/components/amp-user-notification.html">amp-user-notification</a> with the given HTML-id until the "AMP client id" for the user (similar to a cookie) is passed to the ad. This means that ad rendering is delayed until the user confirms the notification.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-loading-strategy (optional)</strong></td>
    <td>Instructs the ad to start loading when the ad is within the given number of viewports away from the current viewport. Without the <code>data-loading-strategy</code> attribute, the number is 3 by default. You can specify a float value in the range of [0, 3] (If the value is not specified the value is set to 1.25). Use a smaller value to gain a higher degree of viewability (i.e., increase the chance that an ad, once loaded, will be seen) but with the risk of generating fewer impressions (i.e., fewer ads loaded). If the attribute is specified but the value is left blank, the system assigns a float value, which optimizes for viewability without drastically impacting the impressions. Note, specifying <code>prefer-viewability-over-views</code> as the value also automatically optimizes viewability.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-ad-container-id (optional)</strong></td>
    <td>Informs the ad of the container component id in the case of attempting to collapse. The container component must be an <code>&lt;amp-layout&gt;</code> component that's parent of the ad. When the <code>data-ad-container-id</code> is specified, and such a <code>&lt;amp-layout&gt;</code> container component is found, AMP runtime will try to collapse the container component instead of the ad component during no fill. This feature can be useful when an ad indicator is in presence.
</td>
  </tr>
  <tr>
    <td width="40%"><strong>common attributes</strong></td>
    <td>This element includes <a href="https://amp.dev/documentation/guides-and-tutorials/learn/common_attributes">common attributes</a> extended to AMP components.</td>
  </tr>
</table>

## Placeholder

Optionally, `amp-ad` supports a child element with the `placeholder` attribute. If supported by the ad network, this element is shown until the ad is available for viewing. Learn more in [Placeholders & Fallbacks](https://amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders).

[sourcecode:html]
<amp-ad width="300" height="250" type="foo">
  <div placeholder>Loading ...</div>
</amp-ad>
[/sourcecode]

## No ad available

If no ad is available for the slot, AMP attempts to collapse the `amp-ad` element (that is, set to `display: none`). AMP determines that this operation can be performed without affecting the user's scroll position. If the ad is in the current viewport, the ad will not be collapsed because it affects the user's scroll position; however, if the ad is outside of the current viewport, it will be collapsed.

In the case that the attempt to collapse fails. The `amp-ad` component supports a child element with the `fallback` attribute. If there is a fallback element in presence, the customized fallback element is shown. Otherwise AMP will apply a default fallback.

Example with fallback:

[sourcecode:html]
<amp-ad width="300" height="250" type="foo">
  <div fallback>No ad for you</div>
</amp-ad>
[/sourcecode]

## Serving video ads

There are 3 ways to monetize videos in AMP with video ads:

1. AMP natively supports a number video players like BrightCove, DailyMotion, etc. that can monetize ads. For a full list, see the [media](https://www.ampproject.org/docs/reference/components#media) components.

2. Use the [amp-ima-video](https://amp.dev/documentation/components/amp-ima-video.html) component that comes with a built-in IMA SDK and HTML5 video player

3. If you use a video player that is not supported in AMP, you can serve your custom player using [amp-iframe](https://amp.dev/documentation/examples/components/amp-iframe/).
   When using `amp-iframe` approach:
   _ Make sure there is a poster if loading the player in the first viewport. [Details](https://amp.dev/documentation/components/amp-iframe#iframe-with-placeholder).
   _ Video and poster must be served over HTTPS.

## Running ads from a custom domain

AMP supports loading the bootstrap iframe that is used to load ads from a custom domain such as your own domain.

To enable this, copy the file [remote.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../3p/remote.html) to your web server. Next up add the following meta tag to your AMP file(s):

[sourcecode:html]
<meta
  name="amp-3p-iframe-src"
  content="https://assets.your-domain.com/path/to/remote.html"
/>
[/sourcecode]

The `content` attribute of the meta tag is the absolute URL to your copy of the remote.html file on your web server. This URL must use a "https" schema. It cannot reside on the same origin as your AMP files. For example, if you host AMP files on `www.example.com`, this URL must not be on `www.example.com` but `something-else.example.com` is OK. See ["Iframe origin policy"](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../spec/amp-iframe-origin-policy.md) for further details on allowed origins for iframes.

### Security

**Validate incoming data** before passing it on to the `draw3p` function, to make sure your iframe only does things it expects to do. This is true, in particular, for ad networks that allow custom JavaScript injection.

Iframes should also enforce that they are only iframed into origins that they expect to be iframed into. The origins would be:

- your own origins
- `https://cdn.ampproject.org` for the AMP cache

In the case of the AMP cache you also need to check that the "source origin" (origin of the document served by cdn.ampproject.org) is one of your origins.

Enforcing origins can be done with the 3rd argument to `draw3p` and must additionally be done using the [allow-from](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options) directive for full browser support.

### Enhance incoming ad configuration

This is completely optional: It is sometimes desired to enhance the ad request before making the ad request to the ad server.

If your ad network supports [fast fetch](https://amp.dev/documentation/guides-and-tutorials/contribute/adnetwork_integration#creating-an-amp-ad-implementation), then please use [Real Time Config](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md) (RTC). (e.g. DoubleClick and AdSense integrations both support fast fetch and RTC)

If your ad network uses delayed fetch, you can pass a callback to the `draw3p` function call in the [remote.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../3p/remote.html) file. The callback receives the incoming configuration as first argument and then receives another callback as second argument (Called `done` in the example below). This callback must be called with the updated config in order for ad rendering to proceed.

Example:

[sourcecode:JS]
draw3p(function(config, done) {
  config.targeting = Math.random() > 0.5 ? 'sport' : 'fashion';
  // Don't actually call setTimeout here. This should only serve as an
  // example that is OK to call the done callback asynchronously.
  setTimeout(function() {
    done(config);
  }, 100)
}, ['allowed-ad-type'], ['your-domain.com']);
[/sourcecode]

## Styling

`<amp-ad>` elements may not themselves have or be placed in containers that have CSS `position: fixed` set (with the exception of `amp-lightbox`).
This is due to the UX implications of full page overlay ads. It may be considered to allow similar ad formats in the future inside of AMP controlled containers that maintain certain UX invariants.

## Validation

See [amp-ad rules](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/validator-amp-ad.protoascii) in the AMP validator specification.

## Supported ad networks <a name="supported-ad-networks"></a>

- [A8](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/a8.md)
- [A9](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/a9.md)
- [AccessTrade](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/accesstrade.md)
- [Adblade](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adblade.md)
- [AdButler](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adbutler.md)
- [Adform](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adform.md)
- [Adfox](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adfox.md)
- [Ad Generation](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adgeneration.md)
- [AdGlare](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adglare.md)
- [Adhese](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adhese.md)
- [Adincube](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adincube.md)
- [ADITION](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adition.md)
- [Adman](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adman.md)
- [AdmanMedia](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/admanmedia.md)
- [Admixer](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/admixer.md)
- [AdOcean](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adocean.md)
- [Adop](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adop.md)
- [AdPicker](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adpicker.md)
- [AdPlugg](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adplugg.md)
- [Adpon](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adpon.md)
- [AdReactor](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adreactor.md)
- [AdSense](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/google/adsense.md)
- [AdSensor](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adsensor.md)
- [AdServSolutions](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adservsolutions.md)
- [AdsLoom](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adsloom.md)
- [AdsNative](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adsnative.md)
- [AdSpeed](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adspeed.md)
- [AdSpirit](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adspirit.md)
- [AdStir](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adstir.md)
- [AdStyle](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adstyle.md)
- [AdTech](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adtech.md)
- [AdThrive](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adthrive.md)
- [AdUnity](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adunity.md)
- [Ad Up Technology](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/aduptech.md)
- [Adventive](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adventive.md)
- [Adverline](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adverline.md)
- [Adverticum](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adverticum.md)
- [AdvertServe](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/advertserve.md)
- [Adyoulike](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adyoulike.md)
- [Affiliate-B](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/affiliateb.md)
- [AJA](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/aja.md)
- [AMoAd](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/amoad.md)
- [Aniview](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/aniview.md)
- [AppNexus](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/appnexus.md)
- [AppVador](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/appvador.md)
- [Atomx](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/atomx.md)
- [Baidu](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/baidu.md)
- [BeaverAds](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/beaverads.md)
- [BeOpinion](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../amp-beopinion/amp-beopinion.md)
- [Bidtellect](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/bidtellect.md)
- [Blade](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/blade.md)
- [brainy](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/brainy.md)
- [Broadstreet Ads](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/broadstreetads.md)
- [ByPlay](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/byplay.md)
- [CA A.J.A. Infeed](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/caajainfeed.md)
- [CA-ProFit-X](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/caprofitx.md)
- [Cedato](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/cedato.md)
- [Colombia](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/colombia.md)
- [Connatix](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/connatix.md)
- [Conative](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/conative.md)
- [Content.ad](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/contentad.md)
- [Criteo](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/criteo.md)
- [CSA](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/google/csa.md)
- [CxenseDisplay](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/eas.md)
- [Dianomi](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/dianomi.md)
- [Directadvert](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/directadvert.md)
- [DistroScale](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/distroscale.md)
- [Dot and Media](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/dotandads.md)
- [Doubleclick](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/google/doubleclick.md)
- [DynAd](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/dynad.md)
- [eADV](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/eadv.md)
- [E-Planning](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/eplanning.md)
- [Empower](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/empower.md)
- [Ezoic](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/ezoic.md)
- [Felmat](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/felmat.md)
- [FlexOneELEPHANT](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/f1e.md)
- [FlexOneHARRIER](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/f1h.md)
- [Flite](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/flite.md)
- [fluct](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/fluct.md)
- [Fork Media](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/forkmedia.md)
- [FreeWheel](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/freewheel.md)
- [Fusion](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/fusion.md)
- [GenieeSSP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/genieessp.md)
- [Giraff](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/giraff.md)
- [GMOSSP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/gmossp.md)
- [GumGum](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/gumgum.md)
- [Holder](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/holder.md)
- [iBillboard](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/ibillboard.md)
- [Idealmedia](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/idealmedia.md)
- [I-Mobile](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/imobile.md)
- [Imonomy](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/imonomy.md)
- [Imedia](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/imedia.md)
- [Improve Digital](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/improvedigital.md)
- [Insticator](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/insticator.md)
- [Index Exchange](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/ix.md)
- [Industrybrains](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/industrybrains.md)
- [InMobi](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/inmobi.md)
- [Innity](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/innity.md)
- [Invibes](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/invibes.md)
- [Kargo](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/kargo.md)
- [Kiosked](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/kiosked.md)
- [Kixer](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/kixer.md)
- [Kuadio](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/kuadio.md)
- [Lentainform](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/lentainform.md)
- [Ligatus](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/ligatus.md)
- [LockerDome](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/lockerdome.md)
- [LOGLY](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/logly.md)
- [LOKA](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/loka.md)
- [MADS](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/mads.md)
- [MANTIS](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/mantis.md)
- [Media.net](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/medianet.md)
- [Mediavine](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/mediavine.md)
- [Medyanet](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/medyanet.md)
- [Meg](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/meg.md)
- [Mgid](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/mgid.md)
- [MicroAd](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/microad.md)
- [MixiMedia](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/miximedia.md)
- [Mixpo](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/mixpo.md)
- [Monetizer101](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/monetizer101.md)
- [mox](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/mox.md)
- [myTarget](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/mytarget.md)
- [myWidget](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/mywidget.md)
- [NativeRoll](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/nativeroll.md)
- [Nativery](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/nativery.md)
- [Nativo](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/nativo.md)
- [Navegg](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/navegg.md)
- [Nend](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/nend.md)
- [NETLETIX](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/netletix.md)
- [Noddus](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/noddus.md)
- [Nokta](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/nokta.md)
- [Newsroom AI](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/nws.md)
- [OneAD](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/onead.md)
- [OnNetwork](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/onnetwork.md)
- [Open AdStream (OAS)](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/openadstream.md)
- [OpenX](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/openx.md)
- [opinary](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/opinary.md)
- [Pixels](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/pixels.md)
- [plista](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/plista.md)
- [polymorphicAds](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/polymorphicads.md)
- [popin](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/popin.md)
- [Pressboard](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/pressboard.md)
- [PromoteIQ](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/promoteiq.md)
- [PubGuru](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/pubguru.md)
- [PubMatic](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/pubmatic.md)
- [Pubmine](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/pubmine.md)
- [PulsePoint](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/pulsepoint.md)
- [PuffNetwork](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/puffnetwork.md)
- [Purch](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/purch.md)
- [Rambler&Co](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/capirs.md)
- [RbInfoxSg](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/rbinfox.md)
- [Realclick](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/realclick.md)
- [recomAD](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/recomad.md)
- [Red for Publishers](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/rfp.md)
- [Relap](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/relap.md)
- [Revcontent](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/revcontent.md)
- [RevJet](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/revjet.md)
- [rnetplus](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/rnetplus.md)
- [Rubicon Project](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/rubicon.md)
- [RUNative](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/runative.md)
- [SAS CI 360 Match](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/sas.md)
- [Seeding Alliance](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/seedingalliance.md)
- [Sekindo](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/sekindo.md)
- [Sharethrough](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/sharethrough.md)
- [SHE Media](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/shemedia.md)
- [Sklik](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/sklik.md)
- [SSP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/ssp.md)
- [SlimCut Media](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/slimcutmedia.md)
- [Smart AdServer](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/smartadserver.md)
- [smartclip](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/smartclip.md)
- [SmileWanted](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/smilewanted.md)
- [sogou Ad](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/sogouad.md)
- [Sortable](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/sortable.md)
- [SOVRN](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/sovrn.md)
- [Speakol](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/speakol.md)
- [SpotX](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/spotx.md)
- [SpringAds](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/springAds.md)
- [Sulvo](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/sulvo.md)
- [SunMedia](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/sunmedia.md)
- [Swoop](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/swoop.md)
- [TcsEmotion](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/tcsemotion.md)
- [Teads](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/teads.md)
- [torimochi](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/torimochi.md)
- [Tracdelight](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/tracdelight.md)
- [TripleLift](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/triplelift.md)
- [Trugaze](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/trugaze.md)
- [UZOU](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/uzou.md)
- [ValueCommerce](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/valuecommerce.md)
- [video intelligence](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/videointelligence.md)
- [Videonow](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/videonow.md)
- [Viralize](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/viralize.md)
- [UAS](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/uas.md)
- [ucfunnel](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/ucfunnel.md)
- [Unruly](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/unruly.md)
- [VMFive](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/vmfive.md)
- [Webediads](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/webediads.md)
- [Weborama](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/weborama.md)
- [Widespace](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/widespace.md)
- [Wisteria](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/wisteria.md)
- [WPMedia](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/wpmedia.md)
- [Xlift](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/xlift.md)
- [Yahoo](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/yahoo.md)
- [YahooJP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/yahoojp.md)
- [Yandex](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/yandex.md)
- [Yengo](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/yengo.md)
- [Yieldbot](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/yieldbot.md)
- [Yieldmo](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/yieldmo.md)
- [Yieldone](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/yieldone.md)
- [Yieldpro](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/yieldpro.md)
- [Zedo](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/zedo.md)
- [Zucks](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/zucks.md)

## Supported embed types

- [1wo](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/1wo.md)
- [24smi](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/24smi.md)
- [AdsLoom](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/adsloom.md)
- [Bringhub](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/bringhub.md)
- [Dable](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/dable.md)
- [Engageya](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/engageya.md)
- [Epeex](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/epeex.md)
- [Insticator](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/insticator.md)
- [Jubna](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/jubna.md)
- [Outbrain](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/outbrain.md)
- [Postquare](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/postquare.md)
- [PubExchange](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/pubexchange.md)
- [ReadMo](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/readmo.md)
- [Smi2](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/smi2.md)
- [SVK-Native](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/svknative.md)
- [Strossle](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/strossle.md)
- [Taboola](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/taboola.md)
- [TE Medya](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/temedya.md)
- [Whopa InFeed](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/whopainfeed.md)
- [Yahoo Native Ads](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/yahoonativeads.md)
- [Zen](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/zen.md)
- [ZergNet](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/../../ads/zergnet.md)