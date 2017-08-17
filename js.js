$(document).ready(function () {
    $(".submenu").click(function () {
        console.log("wtf?")
        if ($(this).hasClass("largeWidth")) {
            $(".submenu").removeClass('largeWidth');
        } else {
            $(".submenu").removeClass('largeWidth');
            $(this).toggleClass('largeWidth');
        }
    });
});

// APP



var khApp = angular.module('khApp', []);
khApp.controller('mainController', function ($scope) {

    // create a message to display in our view
    $scope.message = 'Testing 123.';

    $scope.menus = ["KHFM","KH2FM","BBS"];


});
