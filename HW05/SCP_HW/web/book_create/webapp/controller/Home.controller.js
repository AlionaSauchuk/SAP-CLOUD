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
			/*
			this.oTable = this.byId("bookTable");
			this.oReadOnlyTemplate = this.byId("bookTable").removeItem(0);
			this.rebindTable(this.oReadOnlyTemplate, "Navigation");
			this.oEditableTemplate = new sap.m.ColumnListItem({
				cells: [
					new sap.m.Input({
						value: "{books>caption}"
					})
				]
			});			
			*/
			
		},

		onItemSelected: function(oEvent) {

			var oSelectedItem = oEvent.getSource();
			var context = encodeURIComponent(oSelectedItem.getBindingContext('books').getPath());
			console.log(context);
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
		},

/*
		rebindTable: function(oTemplate, sKeyboardMode) {		
			this.oTable.bindItems({
				path: "books>/Books",
				template: oTemplate,
				key: "books>caption"
			}).setKeyboardMode(sKeyboardMode);
		},

		onEdit: function() {
			this.byId("editButton").setVisible(false);
			this.byId("saveButton").setVisible(true);
			this.byId("cancelButton").setVisible(true);
			this.rebindTable(this.oEditableTemplate, "Edit");
		},

		onSave: function() {
			this.byId("saveButton").setVisible(false);
			this.byId("cancelButton").setVisible(false);
			this.byId("editButton").setVisible(true);
			this.rebindTable(this.oReadOnlyTemplate, "Navigation");
		},

		onCancel: function() {
			this.byId("cancelButton").setVisible(false);
			this.byId("saveButton").setVisible(false);
			this.byId("editButton").setVisible(true);
			this.rebindTable(this.oReadOnlyTemplate, "Navigation");
		},

		onOrder: function() {
			MessageToast.show("Order button pressed");
		},

		onExit: function() {
			this.aBookCollection = [];
			this.oEditableTemplate.destroy();
		},

		onPaste: function(oEvent) {
			var aData = oEvent.getParameter("data");
			sap.m.MessageToast.show("Pasted Data: " + aData);
		}
		*/
	});

	return TableController;
});