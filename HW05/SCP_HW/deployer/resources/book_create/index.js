sap.ui.require([
	"sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";

	new ComponentContainer({
		name: "book_create",
		settings : {
			id : "wt"
		}
	}).placeAt("content");
});
