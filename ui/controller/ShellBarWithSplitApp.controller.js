sap.ui.define([
	'sap/ui/Device',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/Popover',
	'sap/m/Button',
	'sap/m/library',
	"sap/ui/model/resource/ResourceModel"
], function ( Device, Controller, JSONModel, Popover, Button, mobileLibrary, ResourceModel) {
	"use strict";

	var CController = Controller.extend("my.ecommerce.controller.ShellBarWithSplitApp", {
		onInit : function() {
			this.oModel = new JSONModel();
			this.oModel.loadData("./model/model.json", null, false);
			this.getView().setModel(this.oModel);
			 // set i18n model on view
			 const i18nModel = new ResourceModel({
				bundleName: "my.ecommerce.i18n.i18n"
			 });
			 this.getView().setModel(i18nModel, "i18n");
			 console.log("Model", this.getView().getModel("i18n"));
		},

		onItemSelect : function(oEvent) {
			var item = oEvent.getParameter('item');
			this.byId("pageContainer").to(this.getView().createId(item.getKey()));
		},

		onMenuButtonPress : function() {
			var toolPage = this.byId("toolPage");

			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		}
	});


	return CController;

});
