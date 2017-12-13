# ngToLetters
@autor Naycool Gonzalez <naycoolgonzalez@gmail.com>

Convert from numbers to letters

Thanks to: Rodolfo Carmona y Jean <jpbadoino@gmail.com>
authors of the script to convert from letters to numbers

[GitHub](https://gist.github.com/e563340276f89b22042a.git)
[Website](https://eglador.wordpress.com/2013/02/27/conversion-de-numeros-a-letras-con-javascript/)



## ngProgress.js

[![GitHub](https://github.com/nik0571/ngToLetters)](https://github.com/nik0571/ngToLetters

## Usage

Download ngToLetters.js manually or install with bower

```bash
$ bower install ngToLetters
```

Include **ngToLetters.js** ( or **ngToLetters.min.js**) in your website.

```html
<script src="bower_components/ngToLetters/dist/ngToLetters.min.js"></script>
```

Set **ngToLetters** as a dependency in your module

```javascript
var app = angular.module('app', ['ngToLetters']);
```

Use ** ngToLetters ** with directive

```html
  <span ng-to-letters="value"></span>
```

Use ** ngToLetters ** with filter

```html
  <span>{{value | ngToLetters}}<span>
```

Inject **ngToLetters** in your controller

```javascript
var MainCtrl = function(ngToLetters) {}
```

Create a instance of the progressbar

```javascript
  ngToLetters.NumeroALetras(value);
```
