sap.ui.define([
	"book_create/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	'jquery.sap.global',
	'sap/ui/model/Filter'
], function (BaseController, JSONModel, jQuery, Filter) {
	"use strict";

	var TableController = BaseController.extend("book_create.controller.Home", {

		/**
		 *  Hook for initializing the BaseController
		 */
		onInit : function () {	
		},

		onItemSelected: function(oEvent) {

			var oSelectedItem = oEvent.getSource();
			var context = encodeURIComponent(oSelectedItem.getBindingContext('books').getPath());
			this.getRouter().navTo("details",  {bookID: context});
            
		},

		onSearch : function (oEvt) {

			// add filter for search
			var aFilters = [];
			var sQuery = oEvt.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("caption", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var list = this.byId("bookList");
			var binding = list.getBinding("items");
			binding.filter(aFilters, "Application");
		}
	});

	return TableController;
});