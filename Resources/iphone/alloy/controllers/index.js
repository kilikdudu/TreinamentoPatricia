var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;




function __processArg(obj, key) {
	var arg = null;
	if (obj) {
		arg = obj[key] || null;
	}
	return arg;
}

function Controller() {

	require('/alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
	this.__controllerPath = 'index';
	this.args = arguments[0] || {};

	if (arguments[0]) {
		var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
		var $model = __processArg(arguments[0], '$model');
		var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
	}
	var $ = this;
	var exports = {};
	var __defers = {};







	$.__views.index = Ti.UI.createWindow(
	{ backgroundColor: "white", layout: "vertical", height: Ti.UI.FILL, width: Ti.UI.FILL, id: "index" });

	$.__views.index && $.addTopLevelView($.__views.index);
	$.__views.label = Ti.UI.createLabel(
	{ width: Ti.UI.SIZE, height: 40, color: "#000", font: { fontSize: 12 }, text: 'Informe o CEP:', id: "label", top: 150 });

	$.__views.index.add($.__views.label);
	doClick ? $.addListener($.__views.label, 'click', doClick) : __defers['$.__views.label!click!doClick'] = true;$.__views.cep = Ti.UI.createTextField(
	{ borderWidth: 2, borderRadius: 4, borderColor: "darkgray", textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, keyboardType: Ti.UI.KEYBOARD_TYPE_NUMBER_PAD, id: "cep", color: "green", width: 250, height: 45 });

	$.__views.index.add($.__views.cep);
	$.__views.button = Ti.UI.createButton(
	{ id: "button", title: "Buscar", top: 10, width: 100, height: 50 });

	$.__views.index.add($.__views.button);
	doClick ? $.addListener($.__views.button, 'click', doClick) : __defers['$.__views.button!click!doClick'] = true;exports.destroy = function () {};




	_.extend($, $.__views);


	function doClick(e) {
		var mdCep = Alloy.createModel("cep", {});
		mdCep.buscar($.cep.value, function (ret) {
			if (ret.sucesso) {
				alert(ret.mensagem);
			} else {
				alert(ret.mensagem);
			}
		});
	}

	$.index.open();





	__defers['$.__views.label!click!doClick'] && $.addListener($.__views.label, 'click', doClick);__defers['$.__views.button!click!doClick'] && $.addListener($.__views.button, 'click', doClick);



	_.extend($, exports);
}

module.exports = Controller;