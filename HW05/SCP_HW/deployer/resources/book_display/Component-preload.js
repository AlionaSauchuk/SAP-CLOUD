jQuery.sap.registerPreloadedModules({version:"2.0",name:"book_display/Component-preload",modules:{"book_display/Component.js":'sap.ui.define(["sap/ui/core/UIComponent"],function(t){"use strict";return t.extend("book_display.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.apply(this,arguments),this.getRouter().initialize()}})});',"book_display/controller/App.controller.js":'sap.ui.define(["book_display/controller/BaseController"],function(o){"use strict";return o.extend("book_display.controller.App",{listFactory:function(o){var e;return e=this.byId("item").clone(o),console.log(o),e},goToDetails:function(o){var e=o.getSource(),t=encodeURIComponent(e.getBindingContext("Books").getPath());console.log(t),this.getRouter().navTo("details",{id:t})}})});',"book_display/controller/BaseController.js":'sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/core/UIComponent"],function(o,e,t){"use strict";return o.extend("book_display.controller.BaseController",{getRouter:function(){return t.getRouterFor(this)},onNavBack:function(){var o,t;o=e.getInstance(),t=o.getPreviousHash(),void 0!==t?window.history.go(-1):this.getRouter().navTo("appHome",{},!0)}})});',"book_display/controller/Details.controller.js":'sap.ui.define(["book_display/controller/BaseController","sap/m/MessageBox"],function(e,t){"use strict";return e.extend("book_display.controller.Details",{onInit:function(){sap.ui.core.UIComponent.getRouterFor(this).getRoute("details").attachPatternMatched(this._onObjectMatched,this)},_onObjectMatched:function(e){this.getView().bindElement({path:decodeURIComponent(e.getParameter("arguments").id),model:"Books"})}})});',"book_display/controller/NotFound.controller.js":'sap.ui.define(["sap/ui/demo/wt/controller/BaseController"],function(t){"use strict";return t.extend("book_display.controller.NotFound",{onInit:function(){var t,a;t=this.getRouter(),a=t.getTarget("notFound"),a.attachDisplay(function(t){this._oData=t.getParameter("data")},this)},onNavBack:function(){if(this._oData&&this._oData.fromTarget)return this.getRouter().getTargets().display(this._oData.fromTarget),void delete this._oData.fromTarget;t.prototype.onNavBack.apply(this,arguments)}})});',"book_display/index.js":'sap.ui.require(["sap/ui/core/ComponentContainer"],function(e){"use strict";new e({name:"book_display",settings:{id:"wt"}}).placeAt("content")});',"book_display/view/App.view.xml":'<mvc:View\n    controllerName="book_display.controller.App"\n    xmlns="sap.m"\n    xmlns:l="sap.ui.layout"\n    xmlns:mvc="sap.ui.core.mvc"\n    ><Shell><App id = "app"><Page\n        id="mainPage"\n        title = "{i18n>mainPageTitle}"\n        class = "sapUiResponsiveContentPadding"><content><List\n                id="bookList"\n\t\t\t\theaderText="{i18n>listHeader}"\n\t\t\t\titems="{\n\t\t\t\t\tpath: \'books>/Books\',\n\t\t\t\t\tfactory: \'.listFactory\'\n\t\t\t\t}"><ObjectListItem\n\t\t\t\t\tid="item"\n                    type = "Active"\n                    title = "{books>caption}"\n                    press = ".goToDetails"></ObjectListItem></List></content></Page></App></Shell></mvc:View>\n',"book_display/view/Details.view.xml":'<mvc:View\n    controllerName="book_display.controller.Details"\n    xmlns="sap.m"\n    xmlns:l="sap.ui.layout"\n    xmlns:mvc="sap.ui.core.mvc"\n    ><Shell><App id="details"><pages><Page\n    showNavButton = "true"\n    navButtonPress = ".onNavBack"\n    title = "{books>usid}"><Panel id="PeopleDetailPanel" headerText="Details" class="sapUiResponsiveMargin" width="auto"><content><Table><columns><Column id="bookNameColumn"><Text text="{i18n>bookNameLabelText}" /></Column><Column id="firstNameColumn"><Text text="{i18n>firstNameLabelText}" /></Column><Column id="lastNameColumn"><Text text="{i18n>lastNameLabelText}" /></Column><Column id="GenderColumn"><Text text="{i18n>genderLabelText}" /></Column><Column id="EmailsColumn"><Text text="{i18n>emailsLabelText}" /></Column></columns><items><ColumnListItem><cells><Label text="{People>UserName}" /></cells><cells><Label text="{People>FirstName}" /></cells><cells><Label text="{People>LastName}" /></cells><cells><Label text="{People>Gender}" /></cells><cells><FormattedText htmlText="{People>Emails/0}&lt;br&gt;{People>Emails/1}" /></cells></ColumnListItem></items></Table></content></Panel></Page></pages></App></Shell></mvc:View>\n',"book_display/view/NotFound.view.xml":'<mvc:View\n    controllerName = "book_display.controller.NotFound"\n    xmlns = "sap.m"\n    xmlns:mvc = "sap.ui.core.mvc"><MessagePage\n        title = "{i18n>notFound}"\n        text = "{i18n>notFoundText}"\n        description = "{i18n>notFoundDesc}"\n        showNavButton = "true"\n        navButtonPress = ".onNavBack"></mvc:View>\n',"book_display/i18n/i18n.properties":"mainPageTitle = Books List\nlistHeader = Books\nappTitle = My UI5 Application\nappDescription = Book Display\nbookNameLabelText=Caption\n","book_display/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"book_display","type":"application","i18n":"i18n/i18n.properties","title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.0"},"dataSources":{"xsoDataService":{"uri":"https://p2001081257trial-trial-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/himta.xsodata/","type":"OData","settings":{"odataVersion":"2.0"}}}},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"rootView":{"viewName":"book_display.view.App","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.30","libs":{"sap.m":{},"sap.ui.core":{}}},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"book_display.i18n.i18n"}},"books":{"dataSource":"xsoDataService","settings":{"defaultBindingMode":"TwoWay","defaultCountMode":"Inline","useBatch":false,"disableHeadRequestForToken":true}}},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"book_display.view","controlId":"app","controlAggregation":"pages","transition":"slide","bypassed":{"target":"notFound"},"async":true},"routes":[{"pattern":"","name":"appHome","target":"app"},{"pattern":"details/{id}","name":"details","target":"details"}],"targets":{"app":{"viewID":"app","viewName":"App","viewLevel":1},"details":{"viewID":"details","viewName":"Details","viewLevel":2},"notFound":{"viewId":"notFound","viewName":"NotFound","transition":"show"}}}}}'}});