jQuery.sap.registerPreloadedModules({version:"2.0",name:"book_create/Component-preload",modules:{"book_create/Component.js":'sap.ui.define(["sap/ui/core/UIComponent"],function(t){"use strict";return t.extend("Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.apply(this,arguments),this.getRouter().initialize()}})});',"book_create/controller/BaseController.js":'sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/core/UIComponent"],function(o,e,t){"use strict";return o.extend("book_create.controller.BaseController",{getRouter:function(){return t.getRouterFor(this)},onNavBack:function(){var o,t;o=e.getInstance(),t=o.getPreviousHash(),void 0!==t?window.history.go(-1):this.getRouter().navTo("app",{},!0)}})});',"book_create/controller/BookDetails.controller.js":'sap.ui.define(["book_create/controller/BaseController","sap/ui/core/routing/History","jquery.sap.global"],function(t,e,n){"use strict";return t.extend("book_create.controller.BookDetails",{onInit:function(){this.getRouter().getRoute("details").attachPatternMatched(this._onObjectMatched,this),this._showFormFragment("Display"),this.byId("edit").setEnabled(!0)},_formFragments:{},_showFormFragment:function(t){var e=this.byId("page");e.removeAllContent(),e.insertContent(this._getFormFragment(t))},_getFormFragment:function(t){var e=this._formFragments[t];if(e)return e;var e=sap.ui.xmlfragment("book_create.view."+t);return this._formFragments[t]=e,this._formFragments[t]},handleEditPress:function(){this._showFormFragment("Change"),this._toggleButtonsAndView(!0)},_toggleButtonsAndView:function(t){var e=this.getView();e.byId("edit").setVisible(!t),e.byId("save").setVisible(t),e.byId("cancel").setVisible(t),this._showFormFragment(t?"Change":"Display")},handleCancelPress:function(){this._toggleButtonsAndView(!1)},handleSavePress:function(){this._toggleButtonsAndView(!1)},_onObjectMatched:function(t){this.getView().bindElement({path:decodeURIComponent(t.getParameter("arguments").bookID),model:"books"})},onNavBack:function(){var t,n;t=e.getInstance(),n=t.getPreviousHash(),void 0!==n?window.history.go(-1):this.getRouter().navTo("app",{},!0)}})});',"book_create/controller/Home.controller.js":'sap.ui.define(["book_create/controller/BaseController","sap/ui/model/json/JSONModel","jquery.sap.global","sap/ui/model/Filter"],function(e,o,t,n){"use strict";return e.extend("book_create.controller.Home",{onInit:function(){},onItemSelected:function(e){var o=e.getSource(),t=encodeURIComponent(o.getBindingContext("books").getPath());this.getRouter().navTo("details",{bookID:t})},onSearch:function(e){var o=[],t=e.getSource().getValue();if(t&&t.length>0){var i=new n("caption",sap.ui.model.FilterOperator.Contains,t);o.push(i)}this.byId("bookList").getBinding("items").filter(o,"Application")}})});',"book_create/initMockServer.js":'sap.ui.define([],function(){"use strict";sap.ui.require(["sap/ui/core/ComponentSupport"])});',"book_create/view/Change.fragment.xml":'<core:FragmentDefinition\r\n\txmlns="sap.m"\r\n\txmlns:l="sap.ui.layout"\r\n\txmlns:f="sap.ui.layout.form"\r\n\txmlns:core="sap.ui.core"><VBox class="sapUiSmallMargin"><f:SimpleForm id="SimpleFormChangeColumn_oneGroup234"\r\n\t\t\teditable="true"\r\n\t\t\tlayout="ColumnLayout"\r\n\t\t\tcolumnsM="2"\r\n\t\t\tcolumnsL="3"\r\n\t\t\tcolumnsXL="4"\r\n\t\t\t><f:content><Label text="{i18n>bookListTitle}" /><Input id="caption" value="{books>caption}" /></f:content></f:SimpleForm></VBox></core:FragmentDefinition>',"book_create/view/Display.fragment.xml":'<core:FragmentDefinition\r\n\txmlns="sap.m"\r\n\txmlns:l="sap.ui.layout"\r\n\txmlns:f="sap.ui.layout.form"\r\n\txmlns:core="sap.ui.core"><VBox class="sapUiSmallMargin"><f:SimpleForm id="SimpleFormDisplayColumn_oneGroup234"\r\n\t\t\teditable="false"\r\n\t\t\tlayout="ColumnLayout"\r\n\t\t\tcolumnsM="2"\r\n\t\t\tcolumnsL="3"\r\n\t\t\tcolumnsXL="4"\r\n\t\t\t><f:content><Label text="{i18n>bookListTitle}" /><Text id="captionText" text="{books>caption}" /></f:content></f:SimpleForm></VBox></core:FragmentDefinition>',"book_create/view/Details.view.xml":'<mvc:View\r\n\tcontrollerName="book_create.controller.BookDetails"\r\n\txmlns="sap.m"\r\n\txmlns:mvc="sap.ui.core.mvc"\r\n\txmlns:f="sap.ui.layout.form"\r\n\tbusyIndicatorDelay="0"><Page\r\n        id="page"\r\n\t\ttitle="{i18n>PageTitle}"\r\n\t\tshowNavButton="true"\r\n\t\tnavButtonPress=".onNavBack"\r\n\t\tclass="sapUiResponsiveContentPadding"><customHeader><Bar><contentRight><Button id="edit" text="Edit" enabled="false" press="handleEditPress" /><Button id="save" text="Save" type="Emphasized" visible="false" press="handleSavePress" /><Button id="cancel" text="Cancel" visible="false" press="handleCancelPress" /></contentRight></Bar></customHeader></Page></mvc:View>\r\n',"book_create/view/Home.view.xml":'<mvc:View\n\tcontrollerName="book_create.controller.Home"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:l="sap.ui.layout"\n\txmlns:mvc="sap.ui.core.mvc"><Shell><App id="home"><pages><Page \n\t\t\t\t\tshowHeader="false" \n\t\t\t\t\tenableScrolling="true" \n\t\t\t\t\tclass="sapUiContentPadding"><subHeader><Toolbar><SearchField \n\t\t\t\t\t\t liveChange=".onSearch"\n\t\t\t\t\t\t width="100%" /></Toolbar></subHeader><content><List id="bookList" \n\t\t\t\t\t\theaderText="{i18n>bookListTitle}"\n\t\t\t\t\t\tgrowing="true"\n\t\t\t\t\t\tgrowingThreshold="10" \n\t\t\t\t\t\titems="{\n\t\t\t\t\t\t\tpath: \'books>/Books\'\n\t\t\t\t\t\t\t}"\n\t\t\t\t\t\t><items><StandardListItem title="{books>caption}"\n\t\t\t\t\t\t\t\t\t\t\tinfo="Updated on: {books>onUpdate}"\n\t\t\t\t\t\t\t\t\t\t\tdescription="Created on: {books>onCreate}"\n\t\t\t\t\t\t\t\t\t\t\ttype="Navigation"\n\t\t\t\t\t\t\t\t\t\t\tpress = ".onItemSelected"\n\t\t\t\t\t\t\t/></items></List></content></Page></pages></App></Shell></mvc:View>\n',"book_create/i18n/i18n.properties":"\n# List Area\n#List Title\nbookListTitle=All Books\n\n#XFLD: Label for Book Name\nbookNameLabelText=Caption\n\n#XFLD: Label for First Name\nupdateOnLabelText=Update On\n\n#XFLD: Label for Last Name\ncreateLabelText=Create On\n\n#Form Area\nPageTitle=Book Details\nformCaption=Caption\n","book_create/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"book_create","type":"application","i18n":"i18n/i18n.properties","title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.0"},"dataSources":{"xsoDataService":{"uri":"https://cors-anywhere.herokuapp.com/https://p2001081257trial-trial-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/himta.xsodata/","type":"OData","settings":{"odataVersion":"2.0"}}}},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"rootView":{"viewName":"book_create.view.Home","type":"XML","async":true,"id":"home"},"dependencies":{"minUI5Version":"1.48.0","libs":{"sap.m":{},"sap.ui.core":{},"sap.ui.layout":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"book_create.i18n.i18n"}},"books":{"dataSource":"xsoDataService"}},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"book_create.view","controlId":"home","controlAggregation":"pages","transition":"slide","async":true},"routes":[{"pattern":"","name":"Home","target":"app"},{"pattern":"details","name":"Details","target":"details"},{"pattern":"details/{bookID}","name":"details","target":"details"}],"targets":{"app":{"viewId":"app","viewName":"Home","viewLevel":1},"details":{"viewId":"details","viewName":"Details","viewLevel":1}}}}}'}});