sap.ui.define([
	"book_create/controller/BaseController",
	"sap/ui/core/routing/History"
],function (BaseController, History) {
	"use strict";
	return BaseController.extend("book_create.controller.BookDetails", {
		onInit: function(){
			var oRouter = this.getRouter();
			oRouter.getRoute("details").attachPatternMatched(this._onObjectMatched, this);
		},


		_onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path: decodeURIComponent(oEvent.getParameter("arguments").bookID),
				model: "books"
			}
			);
		},


		onNavBack: function () {

			var oHistory, sPreviousHash;
	  
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
	  
			if (sPreviousHash !== undefined) {
			  window.history.go(-1);
			} else {
			  this.getRouter().navTo("app", {}, true);
			}
		}
	});
});