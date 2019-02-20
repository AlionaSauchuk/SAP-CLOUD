sap.ui.define([
	"book_create/controller/BaseController",
    "sap/ui/core/routing/History",
		'jquery.sap.global'
],function (BaseController, History,  jQuery,) {
	"use strict";
	return BaseController.extend("book_create.controller.BookDetails", {
		onInit: function(){
			var oRouter = this.getRouter();
			oRouter.getRoute("details").attachPatternMatched(this._onObjectMatched, this);

			this._showFormFragment('Display');
			this.byId('edit').setEnabled(true);
		},

		_formFragments: {},

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

		var	oFormFragment = sap.ui.xmlfragment("book_create.view." + sFragmentName);

			this._formFragments[sFragmentName] = oFormFragment;
			return this._formFragments[sFragmentName];
		},
		
		handleEditPress : function () {

			//Clone the data
			this._oSupplier = jQuery.extend({}, this.getView().getModel().getData().SupplierCollection[0]);
			this._toggleButtonsAndView(true);

		},

		_toggleButtonsAndView : function (bEdit) {
			var oView = this.getView();

			// Show the appropriate action buttons
			oView.byId("edit").setVisible(!bEdit);
			oView.byId("save").setVisible(bEdit);
			oView.byId("cancel").setVisible(bEdit);

			// Set the right form type
			this._showFormFragment(bEdit ? "Change" : "Display");
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