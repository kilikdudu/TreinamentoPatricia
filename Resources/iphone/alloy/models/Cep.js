var Alloy = require('/alloy'),
    _ = require("/alloy/underscore")._,
    model,
    collection;

exports.definition = {
	config: {
		columns: {
			"numero": "number",
			"uf": "text",
			"cidade": "text",
			"bairro": "string"
		},
		adapter: {
			type: "properties",
			collection_name: "cep"
		}
	},
	extendModel: function (Model) {
		_.extend(Model.prototype, {
			buscar: function (cep, callback) {
				var md = this;
				var url = "https://viacep.com.br/ws/" + cep + "/json/";
				var client = Ti.Network.createHTTPClient({
					onload: function (e) {
						Ti.API.info("Received text: " + this.responseText);
						var resposta = JSON.parse(this.responseText);
						md.set({
							uf: resposta.uf,
							cidade: resposta.localidade,
							bairro: resposta.bairro
						});

						callback({ sucesso: true, mensagem: "Deu certo !!" });
					},

					onerror: function (e) {
						Ti.API.debug(e.error);
						callback({ sucesso: false, mensagem: "Lascou !!!" });
					},
					timeout: 5000 });

				client.open("GET", url);

				client.send();
			}
		});

		return Model;
	},
	extendCollection: function (Collection) {
		_.extend(Collection.prototype, {});

		return Collection;
	}
};

model = Alloy.M('cep', exports.definition, []);

collection = Alloy.C('cep', exports.definition, model);

exports.Model = model;
exports.Collection = collection;