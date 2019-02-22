jQuery.sap.registerPreloadedModules({version:"2.0",name:"book_create/Component-preload",modules:{"book_create/Component.js":'sap.ui.define(["sap/ui/core/UIComponent"],function(t){"use strict";return t.extend("Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.apply(this,arguments),this.getRouter().initialize()}})});',"book_create/controller/BaseController.js":'sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/core/UIComponent"],function(o,e,t){"use strict";return o.extend("book_create.controller.BaseController",{getRouter:function(){return t.getRouterFor(this)},onNavBack:function(){var o,t;o=e.getInstance(),t=o.getPreviousHash(),void 0!==t?window.history.go(-1):this.getRouter().navTo("app",{},!0)}})});',"book_create/controller/BookDetails.controller.js":'sap.ui.define(["book_create/controller/BaseController","sap/ui/core/routing/History","jquery.sap.global"],function(e,t,o){"use strict";return e.extend("book_create.controller.BookDetails",{onInit:function(){this.getRouter().getRoute("details").attachPatternMatched(this._onObjectMatched,this),this._showFormFragment("Display"),this.byId("edit").setEnabled(!0)},_refresh:function(){var e=oView.byId("SimpleFormDisplayColumn_oneGroup234");e&&e.getBinding("items").refresh(!0);var t=oView.byId("SimpleFormChangeColumn_oneGroup234");t&&t.getBinding("items").refresh(!0)},_formFragments:{},_showFormFragment:function(e){var t=this.byId("page");t.removeAllContent(),t.insertContent(this._getFormFragment(e))},_getFormFragment:function(e){var t=this._formFragments[e];if(t)return t;var t=sap.ui.xmlfragment("book_create.view."+e);return this._formFragments[e]=t,this._formFragments[e]},handleEditPress:function(){this._showFormFragment("Change"),this._toggleButtonsAndView(!0)},_toggleButtonsAndView:function(e){var t=this.getView();t.byId("edit").setVisible(!e),t.byId("save").setVisible(e),t.byId("cancel").setVisible(e),this._showFormFragment(e?"Change":"Display")},handleCancelPress:function(){this._toggleButtonsAndView(!1)},handleSavePress:function(){var e={};if(e.caption=sap.ui.getCore().byId("caption").getValue(),e.authid=sap.ui.getCore().byId("authid").getValue(),e.bid=sap.ui.getCore().byId("ID").getText(),e.onUpdate="/Date(1072918861000)/",e.onCreate="/Date(1072918861000)/",e.caption){var t={async:!0,crossDomain:!0,url:"https://p2001081257trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/Books(\'"+e.bid+"\')",method:"PUT",headers:{"content-type":"application/json"},data:JSON.stringify(e)};$.ajax(t).done(function(e){console.log(e)})}this._toggleButtonsAndView(!1),this._refresh()},_onObjectMatched:function(e){this.getView().bindElement({path:decodeURIComponent(e.getParameter("arguments").bookID),model:"books"})},handleDeletePress:function(){var e={};e.bid=sap.ui.getCore().byId("ID").getText();var t={async:!0,crossDomain:!0,url:"https://p2001081257trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/book/book.xsjs",method:"DELETE",headers:{"content-type":"application/json"},processData:!1,data:JSON.stringify(e)};$.ajax(t).done(function(e){console.log(e)}),this._refresh()},onNavBack:function(){var e,o;e=t.getInstance(),o=e.getPreviousHash(),void 0!==o?window.history.go(-1):this.getRouter().navTo("app",{},!0)}})});',"book_create/controller/Home.controller.js":'sap.ui.define(["book_create/controller/BaseController","sap/ui/model/odata/v2/ODataModel","jquery.sap.global","sap/ui/model/Filter","sap/m/MessageToast"],function(e,t,o,a,i){"use strict";return e.extend("book_create.controller.Home",{onInit:function(){},onItemSelected:function(e){var t=e.getSource(),o=encodeURIComponent(t.getBindingContext("books").getPath());this.getRouter().navTo("details",{bookID:o})},onSearch:function(e){var t=[],o=e.getSource().getValue();if(o&&o.length>0){var i=new a("caption",sap.ui.model.FilterOperator.Contains,o);t.push(i)}this.byId("bookList").getBinding("items").filter(t,"Application")},onExit:function(){this._oDialog&&this._oDialog.destroy()},_showFormFragment:function(e){this.byId("homePage").insertContent(this._getFormFragment(e))},handleSelectDialogPress:function(e){this._oDialog||(this._oDialog=sap.ui.xmlfragment("book_create.view.Dialog",this),this.getView().addDependent(this._oDialog));var t=!!e.getSource().data("multi");this._oDialog.setMultiSelect(t);var a=!!e.getSource().data("remember");this._oDialog.setRememberSelections(a);var i=!!e.getSource().data("showClearButton");this._oDialog.setShowClearButton(i);var n=e.getSource().data("growing");this._oDialog.setGrowing("true"==n);var s=e.getSource().data("threshold");s&&this._oDialog.setGrowingThreshold(parseInt(s)),o.sap.syncStyleClass("sapUiSizeCompact",this.getView(),this._oDialog),this._oDialog.open()},handleSearch:function(e){var t=e.getParameter("value"),o=new a("books>caption",sap.ui.model.FilterOperator.Contains,t);e.getSource().getBinding("items").filter([o])},handleClose:function(e){var t=e.getParameter("selectedContexts"),o={};if(t.map(function(e){o=e.getObject()}),console.log(o),t&&t.length){var a={async:!0,crossDomain:!0,url:"https://p2001081257trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/Books",method:"POST",headers:{"Content-Type":"application/json","cache-control":"no-cache"},processData:!1,data:JSON.stringify(o)};$.ajax(a).done(function(e){console.log(e)})}else i.show("No new item was selected.");e.getSource().getBinding("items").filter([])}})});',"book_create/init.js":'sap.ui.define([],function(){"use strict";sap.ui.require(["sap/ui/core/ComponentSupport"])});',"book_create/view/Change.fragment.xml":'<core:FragmentDefinition\r\n\txmlns="sap.m"\r\n\txmlns:l="sap.ui.layout"\r\n\txmlns:f="sap.ui.layout.form"\r\n\txmlns:core="sap.ui.core"><VBox class="sapUiSmallMargin"><f:SimpleForm id="SimpleFormChangeColumn_oneGroup234"\r\n\t\t\teditable="true"\r\n\t\t\tlayout="ColumnLayout"\r\n\t\t\tcolumnsM="2"\r\n\t\t\tcolumnsL="3"\r\n\t\t\tcolumnsXL="4"\r\n\t\t><f:content><Label text="{i18n>bookIdLabel}" /><Text id="ID" text="{books>bid}" /><Label text="{i18n>bookAuthorLabel}" /><Input id="authid" value="{books>authid}" /><Label text="{i18n>bookCaptionLabel}" /><Input id="caption" value="{books>caption}" /></f:content></f:SimpleForm></VBox></core:FragmentDefinition>',"book_create/view/Dialog.fragment.xml":'<core:FragmentDefinition\r\n\txmlns="sap.m"\r\n\txmlns:core="sap.ui.core"><SelectDialog\r\n\t\ttitle="Select Book"\r\n\t\tsearch="handleSearch"\r\n\t\tconfirm="handleClose"\r\n\t\tcancel="handleClose"\r\n\t\titems="{books>/BooksCollection}"\r\n\t><StandardListItem\r\n\t\t\tpress="onSelect"\r\n\t\t\ttitle="{books>caption}"\r\n\t\t\tdescription="{books>authid}"\r\n\t\t\ttype="Active" /></SelectDialog></core:FragmentDefinition>',"book_create/view/Display.fragment.xml":'<core:FragmentDefinition\r\n\txmlns="sap.m"\r\n\txmlns:l="sap.ui.layout"\r\n\txmlns:f="sap.ui.layout.form"\r\n\txmlns:core="sap.ui.core"><VBox class="sapUiSmallMargin"><f:SimpleForm \r\n\t\t\tid="SimpleFormDisplayColumn_oneGroup234"\r\n\t\t\teditable="false"\r\n\t\t\tlayout="ColumnLayout"\r\n\t\t\tcolumnsM="2"\r\n\t\t\tcolumnsL="3"\r\n\t\t\tcolumnsXL="4"\r\n\t\t\t><f:content><Label text="{i18n>bookIdLabel}" /><Text id="ID" text="{books>bid}" /><Label text="{i18n>bookCaptionLabel}" /><Text id="captionText" text="{books>caption}" /><Label text="{i18n>authorIdLabel}" /><Text text="{books>authid}" /><Label text="{i18n>updatedOnLabel}" /><Text text="{books>onUpdate}" /><Label text="{i18n>createdOnLabel}" /><Text text="{books>onCreate}" /></f:content></f:SimpleForm></VBox></core:FragmentDefinition>',"book_create/view/Details.view.xml":'<mvc:View\r\n\tcontrollerName="book_create.controller.BookDetails"\r\n\txmlns="sap.m"\r\n\txmlns:mvc="sap.ui.core.mvc"\r\n\txmlns:f="sap.ui.layout.form"\r\n\tbusyIndicatorDelay="0"><Page\r\n        id="page"\r\n\t\ttitle="{i18n>PageTitle}"\r\n\t\tshowNavButton="true"\r\n\t\tnavButtonPress=".onNavBack"\r\n\t\tclass="sapUiResponsiveContentPadding"><customHeader><Bar><contentRight><Button id="edit" text="Edit" enabled="false" press="handleEditPress"/><Button id="save" text="Save" visible="false" press="handleSavePress"/><Button id="cancel" text="Cancel" visible="false" press="handleCancelPress"/></contentRight><contentRight><Button id="delete" text="Delete" press="handleDeletePress"/></contentRight></Bar></customHeader></Page></mvc:View>\r\n',"book_create/view/Home.view.xml":'<mvc:View\n\tcontrollerName="book_create.controller.Home"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:l="sap.ui.layout"\n\txmlns:mvc="sap.ui.core.mvc"><Shell><App id="home"><pages><Page \n\t\t\t\t\tid="homePage"\n\t\t\t\t\tshowHeader="false" \n\t\t\t\t\tenableScrolling="true" \n\t\t\t\t\tclass="sapUiContentPadding"><subHeader><Toolbar><SearchField \n\t\t\t\t\t\t liveChange=".onSearch"\n\t\t\t\t\t\t width="100%" /></Toolbar></subHeader><content><List id="bookList" \n\t\t\t\t\t\theaderText="{i18n>bookListTitle}"\n\t\t\t\t\t\tgrowing="true"\n\t\t\t\t\t\tgrowingThreshold="10" \n\t\t\t\t\t\titems="{\n\t\t\t\t\t\t\tpath: \'books>/Books\'\n\t\t\t\t\t\t\t}"\n\t\t\t\t\t\t><headerToolbar><Toolbar><Button\n\t\t\t\t\t\t\tclass="sapUiSmallMarginBottom"\n\t\t\t\t\t\t\ttext="Show Select Dialog"\n\t\t\t\t\t\t\tpress="handleSelectDialogPress" /></Toolbar></headerToolbar><items><StandardListItem title="{books>caption}"\n\t\t\t\t\t\t\t\tinfo="Updated on: {books>onUpdate}"\n\t\t\t\t\t\t\t\tdescription="Created on: {books>onCreate}"\n\t\t\t\t\t\t\t\ttype="Navigation"\n\t\t\t\t\t\t\t\tpress = ".onItemSelected"\n\t\t\t\t\t\t\t/></items></List></content></Page></pages></App></Shell></mvc:View>\n',"book_create/i18n/i18n.properties":"\n# List Area\n#List Title\nbookListTitle=All Books\n\n#XFLD: Label for Book Name\nbookNameLabelText=Caption\n\n#XFLD: Label for First Name\nupdateOnLabelText=Update On\n\n#XFLD: Label for Last Name\ncreateLabelText=Create On\n\n#Form Area\nPageTitle=Book Details\nformCaption=Caption\n\n#Change.fragment\nbookIdLabel=ID\nbookCaptionLabel=Caption\n","book_create/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"book_create","type":"application","i18n":"i18n/i18n.properties","title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.0"},"dataSources":{"xsoDataService":{"uri":"https://p2001081257trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/","type":"OData","settings":{"odataVersion":"2.0"}}}},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"rootView":{"viewName":"book_create.view.Home","type":"XML","async":true,"id":"home"},"dependencies":{"minUI5Version":"1.48.0","libs":{"sap.m":{},"sap.ui.core":{},"sap.ui.layout":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"book_create.i18n.i18n"}},"books":{"dataSource":"xsoDataService"}},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"book_create.view","controlId":"home","controlAggregation":"pages","transition":"slide","async":true},"routes":[{"pattern":"","name":"Home","target":"app"},{"pattern":"details","name":"Details","target":"details"},{"pattern":"details/{bookID}","name":"details","target":"details"}],"targets":{"app":{"viewId":"app","viewName":"Home","viewLevel":1},"details":{"viewId":"details","viewName":"Details","viewLevel":1}}}}}'}});