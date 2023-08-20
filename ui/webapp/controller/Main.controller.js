sap.ui.define([
	"./BaseController", 
	"sap/m/MessageBox"
], function (BaseController, MessageBox) {
	"use strict";

	return BaseController.extend("my.ecommerce.controller.Main", {
		sayHello: function () {
			MessageBox.show("Hello World!");
		},
		handleToggleMenu: function () {
			var oSideNavigation = this.getView().byId("sideNavigation");
			oSideNavigation.setCollapsed(!oSideNavigation.getCollapsed());
		}
	});
});
