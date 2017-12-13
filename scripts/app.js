/**
 * @name App
 * @package Angular
 * @author Naycool Gonzalez <naycoolgonzalez@gmail.com>
 * @description Instacia de la app
 */

(function (){

  "use strict";

  angular
    .module("app",['ngToLetters'])
    .controller("myCtrl", ["$scope", "ngToLetters", myCtrl])

  function myCtrl ($scope, ngToLetters) {
    $scope.value = 2000;

    /**
     * Ejemplo utilizando la factory
     */
    $scope.$watch('value',function (newValue) {
      console.log("Ejemplo utilizando la factory: ", ngToLetters.NumeroALetras(newValue));
    });
  }
})();
