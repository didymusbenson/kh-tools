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
