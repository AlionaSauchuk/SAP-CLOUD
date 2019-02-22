sap.ui.define([
	"book_create/controller/BaseController",
	"sap/ui/model/odata/v2/ODataModel",
	'jquery.sap.global',
	'sap/ui/model/Filter',
	'sap/m/MessageToast',
], function (BaseController, ODataModel, jQuery, Filter, MessageToast) {
	"use strict";

	var ListController = BaseController.extend("book_create.controller.Home", {

		/**
		 *  Hook for initializing the BaseController
		 */
		onInit : function () {	
			var oView = that.getView();
			var oList = oView.byId("bookList");
			oList.getBinding("items").refresh(true);
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
		},

		onExit : function () {
			if (this._oDialog) {
				this._oDialog.destroy();
			}
		},

		_showFormFragment: function (sFragmentName) {
			var oPage = this.byId("homePage");
			oPage.insertContent(this._getFormFragment(sFragmentName));
		},

		handleSelectDialogPress: function (oEvent) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("book_create.view.Dialog",this);	
				this.getView().addDependent(this._oDialog);
			}


			// Multi-select if required
			var bMultiSelect = !!oEvent.getSource().data("multi");
			this._oDialog.setMultiSelect(bMultiSelect);

			// Remember selections if required
			var bRemember = !!oEvent.getSource().data("remember");
			this._oDialog.setRememberSelections(bRemember);

			//add Clear button if needed
			var bShowClearButton = !!oEvent.getSource().data("showClearButton");
			this._oDialog.setShowClearButton(bShowClearButton);

			// Set growing property
			var bGrowing = oEvent.getSource().data("growing");
			this._oDialog.setGrowing(bGrowing == "true");

			// Set growing threshold
			var sGrowingThreshold = oEvent.getSource().data("threshold");
			if (sGrowingThreshold) {
				this._oDialog.setGrowingThreshold(parseInt(sGrowingThreshold));
			}

			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
		},
		
		handleSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("books>caption", sap.ui.model.FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},

		handleClose: function(oEvent) {
			var aContexts = oEvent.getParameter("selectedContexts");
			var obj = {};
			aContexts.map(function(oContext) {
				obj = oContext.getObject();
			});
			
			console.log(obj);
			if (aContexts && aContexts.length) {
			//	MessageToast.show("You have chosen " + aContexts.map(function(oContext) { return oContext.getObject().caption; }).join(", "));
				var settings = {
					"async": true,
					"crossDomain": true,
					"url": "https://p2001081257trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/Books",
					"method": "POST",
					"headers": {
					  "Content-Type": "application/json",
					  "cache-control": "no-cache"
					},
					"processData": false,
					"data":JSON.stringify(obj)
				  }
				  
				  $.ajax(settings).done(function (response) {
					console.log(response);
				  });
			} else {
				MessageToast.show("No new item was selected.");
			}
			oEvent.getSource().getBinding("items").filter([]);
		}
	});

	return ListController;
});