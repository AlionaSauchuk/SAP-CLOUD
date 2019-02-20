sap.ui.define([
	"book_create/controller/BaseController",
    "sap/ui/core/routing/History",
    'sap/ui/core/Fragment',
],function (BaseController, History,  Fragment) {
	"use strict";
	return BaseController.extend("book_create.controller.BookDetails", {
		onInit: function(){
			var oRouter = this.getRouter();
			oRouter.getRoute("details").attachPatternMatched(this._onObjectMatched, this);
  
			this.getView().getModel().attachRequestCompleted(function() {
				this.byId('editButton').setEnabled(true);
			}.bind(this));


        },

		_showFormFragment : function (sFragmentName) {
			var oPage = this.byId("page");

			oPage.removeAllContent();
			oPage.insertContent(this._getFormFragment(sFragmentName));
        },

        _getFormFragment: function (sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];

			if (oFormFragment) {
				return oFormFragment;
			}

			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "book_create." + sFragmentName);

			this._formFragments[sFragmentName] = oFormFragment;
			return this._formFragments[sFragmentName];
		},
		
        
		onEdit: function() {
			this.byId("editButton").setVisible(false);
			this.byId("saveButton").setVisible(true);
            this.byId("cancelButton").setVisible(true);
            this.getView().setEditable(true);
		},

		onSave: function() {
			this.byId("saveButton").setVisible(false);
			this.byId("cancelButton").setVisible(false);
			this.byId("editButton").setVisible(true);
			this.rebindForm(this.oReadOnlyTemplate, "Navigation");
		},

		onCancel: function() {
			this.byId("cancelButton").setVisible(false);
			this.byId("saveButton").setVisible(false);
			this.byId("editButton").setVisible(true);
			this.rebindForm(this.oReadOnlyTemplate, "Navigation");
		},

		onOrder: function() {
			MessageToast.show("Order button pressed");
		},

		onExit: function() {
			this.aBookCollection = [];
			this.oEdiFormTemplate.destroy();
		},

		onPaste: function(oEvent) {
			var aData = oEvent.getParameter("data");
			sap.m.MessageToast.show("Pasted Data: " + aData);
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