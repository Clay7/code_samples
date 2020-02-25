//EXAMPLE FUNCTION THAT WAITS FOR JQUERY AND DATA OBJECT TO BE SET. ONCE SET function GoCertona() IS EXECUTED.

var giveUpMs = 0;
var resx = {};
resx.appid = "silverstarbrands02";
resx.top1 = 100000;
resx.top2 = 100000;
resx.rrec = false;
resx.rrnum = 20;

function goCertona () {
    try {
        var pageType = getPageType();

//console.log("pagetype = " + pageType);
        switch (pageType) {

        case "home":
            if (certona.recommendations === true) {
                resx.rrelem = "home2_rr";
                resx.rrec = true;
                resx.rrcall = "certonaRecommendations";
            }
            break;

        case "category":
            quickview();
            addToCart();
            resx.rrqs = "categoryID=" + (certona.categoryid !== undefined ? certona.categoryid : "");
            break;

        case "search":
            break;

        case "nosearch":
            break;

        case "product":
            resx.event = location.href.indexOf("rrec=true") >= 0 ? "product_r" : "product";
            resx.itemid = (certona.itemid !== undefined ? certona.itemid : "");
            resx.rrqs = "categoryID=" + (certona.categoryid !== undefined ? certona.categoryid : "");
            if (certona.recommendations === true) {
                resx.rrelem = "product2_rr";
                resx.rrec = true;
                resx.rrcall = "certonaRecommendations";
            }
            addToCart();
            break;

        case "myaccount":
            resx.customerid = (certona.customerid !== undefined ? certona.customerid : "");
            break;

        case "wishlist":
            resx.event = "wishlist";
            resx.itemid = (certona.itemid !== undefined ? certona.itemid : "");
            resx.customerid = (certona.customerid !== undefined ? certona.customerid : "");

            //add 1 item to cart
            jQuery("body").on("click","button.button--regular",function() {
                try{
                    var itemid = jQuery(this).parents("section.product-layout__misc").siblings("section.product-layout__content").find("section.col-description small span:first-child").text();
                    resx.itemid = itemid;
                    resx.event = "addtocart_op";
                    certonaResx.run();
                } catch (ignore) {}
            });
            break;

        case "orderhistory":
            break;

        case "cart":
            resx.event = "viewcart";
            resx.itemid = (certona.itemid !== undefined ? certona.itemid : "");
            resx.customerid = (certona.customerid !== undefined ? certona.customerid : "");
            if (certona.recommendations === true) {
                resx.rrelem = "cart2_rr";
                resx.rrec = true;
                resx.rrcall = "certonaRecommendations";
            }
            break;

        case "purchase":
            resx.event = "purchase";
            if (typeof certona !== "undefined") {
                resx.itemid = (certona.itemid !== undefined ? certona.itemid : "");
                resx.qty = (certona.qty !== undefined ? certona.qty : "");
                resx.price = (certona.price !== undefined ? certona.price : "");
                resx.total = (certona.total !== undefined ? certona.total : "");
                resx.transactionid = (certona.transactionid !== undefined ? certona.transactionid : "");
                resx.customerid = (certona.customerid !== undefined ? certona.customerid : "");
            }
            break;

        case "error404":
            break;

        default:
            return;
        }

        certonaResx.run();

    } catch (ignore) {}
}

function getCertonaObject() {
    try {
        if (typeof jQuery !== "undefined" && typeof certona !== "undefined" && typeof certona.pagetype !== "undefined") {
            goCertona();
        } else {
            if (giveUpMs < 3000) {
                giveUpMs += 10;
                window.setTimeout(getCertonaObject, 10);
            }
        }
    } catch (ignore) {}
}

ready(function () {
   getCertonaObject();
});
