function doClick(e) {
	var mdCep = Alloy.createModel("cep",{});
	mdCep.buscar($.cep.value , function(ret) {
		if (ret.sucesso) {
			alert(ret.mensagem);
		} else  {
			alert (ret.mensagem);
		}
	});
}

$.index.open();
