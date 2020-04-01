---
$title: Familiarizarse con el código de inicio
$order: 1
---

## AMP boilerplate
Una página AMP es una página HTML con algunas restricciones para un rendimiento fiable. Las páginas de AMP tienen un poco de marcado especial que lo identifica como una página de AMP.

Una página de AMP desnuda se ve así:

```html
<!doctype html>
<html amp>
 <head>
   <meta charset="utf-8">
   <link rel="canonical" href="hello-world.html">
   <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
   <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
 </head>
 <body>Hello World!</body>
</html>
```

## Componentes AMP

El tutorial con código de inicio ([`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html)) construye la página AMP desde cero con su contenido de página (imágenes, texto, etc.) e incluye algunos componentes de AMP:

```html
<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
<script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js"></script>
<script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
<script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"></script>
```

Los componentes de AMP ofrecen funcionalidad adicional y componentes de interfaz de usuario que agregan interactividad a las páginas de AMP. El código de inicio utiliza los siguientes componentes de AMP:

- [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md): Un carrusel de imágenes que muestra múltiples vistas del producto.
- [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md): Un sistema de plantillas para procesar las respuestas de los servidores desde amp-form.
- [`amp-form`](../../../../documentation/components/reference/amp-form.md): Añade funcionalidad especial para los elementos `<form>` que son necesarios para las páginas AMP.
- [`amp-selector`](../../../../documentation/components/reference/amp-selector.md): Ofrece una forma semántica de seleccionar uno o varios elementos de un grupo de elementos. Puede ser utilizado como una fuente de entrada a amp-form.

## Interactividad básica

El código de inicio ofrece alguna interactividad básica:

- El carrusel de imágenes ([`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)) muestra varias vistas del producto.
- El producto se puede añadir al carrito del usuario (a través de [`amp-form`](../../../../documentation/components/reference/amp-form.md)) pulsando el botón "Añadir al carrito" en la parte inferior de la página.

**Pruébalo**: Desliza el carrusel de imágenes y toca el botón "Añadir al carrito".
