var resx = {};
resx.top1 = 100000;
resx.top2 = 100000;
resx.rrec = false;
resx.appid = "imperialsupplies01";

function upperCaseIt(value) {
    try {
        return (typeof value !== undefined && Object.prototype.toString.call(value) === "[object String]") ? value.toUpperCase() : value;
    } catch (ignore) {}
}

function getCertonaValue(prop) {
    try {
        if (typeof certona !== "undefined" && Object.prototype.toString.call(certona) === "[object Object]") {
            return certona[prop] || "";
        }
    } catch (ignore) {}
}

function getItemIdURL(url) { //scrapes URL for 'item' parameter to obtain item id
    try {
        var param = url.match(/item\=[0-9]+/).toString(), 
            itemID = param.split("\=");

        itemID = itemID[1];

        return itemID;
    } catch (ignore) {}
}

function buttonEvents(buttonType, selector) {
    try {
        jQuery("body").off("click", selector).on("click", selector, function () {
            try {
                resx.rrelem = "";
                resx.rrnum = "";
                resx.rrec = false;

                var buttonActions = {
                    "addtocart_op": function () { //input.hero.primaryBtn (ORDERS)
                        resx.itemid = getItemIdURL(window.location.href);
                        resx.event = "addtocart_op";
                        certonaResx.run();
                    },
                    "DEFAULT": function () {
                        return;
                    }
                };

                (buttonActions[buttonType] || buttonActions["DEFAULT"])();
            } catch (ignore) {}
        });
    } catch (ignore) {}
}

function callCertona() {
    try {
        resx.event = "";
        resx.itemid = "";
        resx.rrelem = "";
        resx.rrnum = 20;
        resx.rrec = false;
        resx.qty = "";
        resx.price = "";
        resx.total = "";
        resx.transactionid = "";

        var pageType = upperCaseIt(getCertonaValue("pagetype"));

        switch (pageType) {

        case "HOME":
            resx.links = (certona.recitems !== undefined ? certona.recitems : "");
            resx.pageid = (certona.pageid !== undefined ? certona.pageid : "");
            resx.trackingid = (certona.trackingid !== undefined ? certona.trackingid : "");
            break;

        case "PARENTCATEGORYLANDING":
            break;

        case "CATEGORYLANDING":
            break;

        case "SUBCATEGORYLANDING":
            break;

        case "CATEGORY":
            break;

        case "SEARCH":
            break;

        case "NOSEARCH":
            resx.links = (certona.recitems !== undefined ? certona.recitems : "");
            resx.pageid = (certona.pageid !== undefined ? certona.pageid : "");
            resx.trackingid = (certona.trackingid !== undefined ? certona.trackingid : "");
            break;

        case "PRODUCT":
            if (certona.rrec === "true") {
                resx.event = "product_r";
            } else {
                resx.event = "product";
            }
            resx.itemid = getCertonaValue("itemid");
            resx.links = (certona.recitems !== undefined ? certona.recitems : "");
            resx.pageid = (certona.pageid !== undefined ? certona.pageid : "");
            resx.trackingid = (certona.trackingid !== undefined ? certona.trackingid : "");
            break;

        case "ORDERS":
            buttonEvents("addtocart_op", "input.hero.primaryBtn"); //add to cart button (CREATE ORDER button)
            buttonEvents("addtocart_op", "a.ordersTable__selectOrderLink"); //add to cart button (ORDER NUMBER ADD LINK)
            break;

        case "ADDTOCART":
            if (certona.rrec === "true") {
                resx.event = "addtocart_opr";
            } else {
                resx.event = "addtocart_op";
            }
            resx.itemid = getCertonaValue("itemid");
            resx.links = (certona.recitems !== undefined ? certona.recitems : "");
            resx.pageid = (certona.pageid !== undefined ? certona.pageid : "");
            resx.trackingid = (certona.trackingid !== undefined ? certona.trackingid : "");
            break;

        case "ACCOUNT":
            resx.customerid = getCertonaValue("customerid");
            break;

        case "CART":
            resx.event = "viewcart";
            resx.customerid = getCertonaValue("customerid");
            resx.itemid = getCertonaValue("itemid");
            break;

        case "PURCHASE":
            resx.event = "purchase";
            resx.customerid = getCertonaValue("customerid");
            resx.itemid = getCertonaValue("itemid");
            resx.qty = getCertonaValue("qty");
            resx.price = getCertonaValue("price");
            resx.total = getCertonaValue("total");
            resx.transactionid = getCertonaValue("transactionid");
            break;

        case "ERROR":
            break;

        default:
            return;
        }

        certonaResx.run();

    } catch (ignore) {}
}
