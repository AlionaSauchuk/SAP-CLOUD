sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'jquery.sap.global'
], function (Controller, JSONModel, jQuery) {
	"use strict";

	var TableController = Controller.extend("book_create.controller.App", {

		/**
		 *  Hook for initializing the controller
		 */
		onInit : function () {
			var oJSONData = {
				busy : false
			};
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
			
		},

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
	});

	return TableController;
});