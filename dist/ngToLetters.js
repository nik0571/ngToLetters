/**
 * @name App
 * @package Angular
 * @author Naycool Gonzalez <naycoolgonzalez@gmail.com>
 * @description modulo
 */

(function () {

  "use strict";

  angular
    .module("ngToLetters", [])
    .directive("ngToLetters", ['$filter', _directive])
    .filter("ngToLetters", ['ngToLetters', _filter])
    .factory("ngToLetters", [_factory])

  /**
   * @name _factory
   * @desc se crea factory para ser utilizado en angular
   */
  function _factory() {
  /*************************************************************/
  // NumeroALetras
  // @author Rodolfo Carmona
  // @contributor Jean (jpbadoino@gmail.com)
  /*************************************************************/

    var divisor,
        cientos,
        resto,
        letras,
        strMillones,
        strMiles,
        centenas,
        decenas,
        decena,
        unidad,
        strCentenas;

    function Unidades(num) {

      switch (num) {
        case 1:
          return "UN";
        case 2:
          return "DOS";
        case 3:
          return "TRES";
        case 4:
          return "CUATRO";
        case 5:
          return "CINCO";
        case 6:
          return "SEIS";
        case 7:
          return "SIETE";
        case 8:
          return "OCHO";
        case 9:
          return "NUEVE";
      }

      return "";
    }

    function Decenas(num) {

      decena = Math.floor(num / 10);
      unidad = num - (decena * 10);

      switch (decena) {
        case 1:
          switch (unidad) {
            case 0:
              return "DIEZ";
            case 1:
              return "ONCE";
            case 2:
              return "DOCE";
            case 3:
              return "TRECE";
            case 4:
              return "CATORCE";
            case 5:
              return "QUINCE";
            default:
              return "DIECI" + Unidades(unidad);
          }
        case 2:
          switch (unidad) {
            case 0:
              return "VEINTE";
            default:
              return "VEINTI" + Unidades(unidad);
          }
        case 3:
          return DecenasY("TREINTA", unidad);
        case 4:
          return DecenasY("CUARENTA", unidad);
        case 5:
          return DecenasY("CINCUENTA", unidad);
        case 6:
          return DecenasY("SESENTA", unidad);
        case 7:
          return DecenasY("SETENTA", unidad);
        case 8:
          return DecenasY("OCHENTA", unidad);
        case 9:
          return DecenasY("NOVENTA", unidad);
        case 0:
          return Unidades(unidad);
      }
    } //Unidades()

    function DecenasY(strSin, numUnidades) {
      if (numUnidades > 0)
        return strSin + " Y " + Unidades(numUnidades)

      return strSin;
    } //DecenasY()

    function Centenas(num) {

      centenas = Math.floor(num / 100);
      decenas = num - (centenas * 100);

      switch (centenas) {
        case 1:
          if (decenas > 0)
            return "CIENTO " + Decenas(decenas);
          return "CIEN";
        case 2:
          return "DOSCIENTOS " + Decenas(decenas);
        case 3:
          return "TRESCIENTOS " + Decenas(decenas);
        case 4:
          return "CUATROCIENTOS " + Decenas(decenas);
        case 5:
          return "QUINIENTOS " + Decenas(decenas);
        case 6:
          return "SEISCIENTOS " + Decenas(decenas);
        case 7:
          return "SETECIENTOS " + Decenas(decenas);
        case 8:
          return "OCHOCIENTOS " + Decenas(decenas);
        case 9:
          return "NOVECIENTOS " + Decenas(decenas);
      }

      return Decenas(decenas);
    } //Centenas()

    function Seccion(num, divisor, strSingular, strPlural) {
      cientos = Math.floor(num / divisor)
      resto = num - (cientos * divisor)

      letras = "";

      if (cientos > 0)
        if (cientos > 1)
          letras = Centenas(cientos) + " " + strPlural;
        else
          letras = strSingular;

      if (resto > 0)
        letras += "";

      return letras;
    } //Seccion()

    function Miles(num) {
      divisor = 1000;
      cientos = Math.floor(num / divisor)
      resto = num - (cientos * divisor)

      strMiles = Seccion(num, divisor, "UN MIL", "MIL");
      strCentenas = Centenas(resto);

      if (strMiles == "")
        return strCentenas;

      return strMiles + " " + strCentenas;

      //return Seccion(num, divisor, "UN MIL", "MIL") + " " + Centenas(resto);
    } //Miles()

    function Millones(num) {
      divisor = 1000000;
      cientos = Math.floor(num / divisor)
      resto = num - (cientos * divisor)

      strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
      strMiles = Miles(resto);

      if (strMillones == "")
        return strMiles;

      return strMillones + " " + strMiles;

      //return Seccion(num, divisor, "UN MILLON", "MILLONES") + " " + Miles(resto);
    } //Millones()

    function NumeroALetras(num, optional = {}) {
      optional.pluralCurrency = optional.pluralCurrency || 'PESOS';
      optional.singularCurrency = optional.singularCurrency || 'PESO';
      var data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: "",
        letrasMonedaPlural: optional.pluralCurrency,
        letrasMonedaSingular: optional.singularCurrency
      };

      if (data.centavos > 0)
        data.letrasCentavos = "CON " + data.centavos + "/100";

      if (data.enteros == 0)
        return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
      if (data.enteros == 1)
        return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
      else
        return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
    } //NumeroALetras()

    return {
      "Unidades": Unidades,
      "Decenas": Decenas,
      "DecenasY": DecenasY,
      "Centenas": Centenas,
      "Seccion": Seccion,
      "Miles": Miles,
      "Millones": Millones,
      "NumeroALetras": NumeroALetras,
    }
  }

  /**
   * @name _filter
   * @desc se crea filtro para ser utilizado en angular
   */
  function _filter(ngToLetters) {
    return function (input, optional1 = {}, optional2) {
      return ngToLetters.NumeroALetras(input,optional1);
    }
  }

  /**
   * @name _directive
   * @desc se crea directiva para ser utilizado en angular
   */
  function _directive($filter) {
    return {
      restrict: 'A',
      scope: {
        ngToLetters: "=",
        pluralCurrency: "@",
        singularCurrency: "@",
      },
      link: function (scope, element, attrs) {
        scope.$watch('ngToLetters',function (newValue) {
          element.html($filter('ngToLetters')(newValue, {
            pluralCurrency: scope.pluralCurrency,
            singularCurrency: scope.singularCurrency
          }));
        });
      },
    }

  }

})();