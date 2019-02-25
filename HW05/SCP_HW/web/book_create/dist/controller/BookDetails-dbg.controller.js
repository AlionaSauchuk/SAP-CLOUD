sap.ui.define([
	"book_create/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (BaseController, History, JSONModel) {
	"use strict";
	return BaseController.extend("book_create.controller.BookDetails", {

		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("details").attachPatternMatched(this._onObjectMatched, this);

			this._showFormFragment('Display');
			this._toggleButtonsAndView('Display');
		},

		_formFragments: {},

		_showFormFragment: function (sFragmentName) {
			var oPage = this.byId("page");

			oPage.removeAllContent();
			oPage.insertContent(this._getFormFragment(sFragmentName));
		},

		_getFormFragment: function (sFragmentName) {

			var oFormFragment = this._formFragments[sFragmentName];

			if (oFormFragment) {
				return oFormFragment;
			}

			var oFormFragment = sap.ui.xmlfragment("book_create.view." + sFragmentName);
			this._formFragments[sFragmentName] = oFormFragment;
		
			return this._formFragments[sFragmentName];
		},

		handleEditPress: function () {
			this._showFormFragment('Change');
			this._toggleButtonsAndView('Edit');
		},

		_toggleButtonsAndView: function (bEdit) {
			
			var oMdl = new JSONModel(); 
			if(bEdit==='Edit'){
				oMdl.loadData("./model/editMode.json")
			}else{
				oMdl.loadData("./model/displayMode.json")
			}		
	
			this.getView().setModel(oMdl); 
		},

		handleCancelPress: function () {
			this._toggleButtonsAndView('Display');
		},

		handleSavePress: function () {
			var obj = {};
			obj.caption = sap.ui.getCore().byId("caption").getValue();
			obj.authid = sap.ui.getCore().byId("authid").getValue();
			obj.bid = sap.ui.getCore().byId("cID").getText();
			obj.onUpdate = "/Date(1072918861000)/";
			obj.onCreate = "/Date(1072918861000)/";
			if (obj.caption) {
				var settings = {
					"async": true,
					"crossDomain": true,
					"url": "https://p2001081257trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/Books('"+ obj.bid + "')",
					"method": "PUT",
					"headers": {
						"content-type": "application/json"
					},
					"data": JSON.stringify(obj)
				};
				$.ajax(settings).done(function (response) {
				});
			}
			
			this._toggleButtonsAndView('Display');
		},

		_onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path: decodeURIComponent(oEvent.getParameter("arguments").bookID),
				model: "books"
			});
		},

		handleDeletePress: function () {
			var obj = {};
			obj.bid = sap.ui.getCore().byId("ID").getText();
			    var settings = {
			        "async": true,
			        "crossDomain": true,
			        "url": "https://p2001081257trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/book/book.xsjs",
			        "method": "DELETE",
			        "headers": {
			            "content-type": "application/json"
			        },
			        "processData": false,
			        "data": JSON.stringify(obj)
			    };
			    $.ajax(settings).done(function (response) {
				});
				
			this.onNavBack();
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