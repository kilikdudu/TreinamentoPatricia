var Alloy = require('/alloy'),
    _ = require("/alloy/underscore")._,
	model, collection;

exports.definition = {
	config : {
		columns : {
			"numero" : "number",
			"uf" : "text",
			"cidade" : "text",
			"bairro" : "string"
		},
		adapter : {
			type : "properties",
			collection_name : "cep"
		}
	},
	extendModel : function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
				buscar : function(cep, callback) {
					var md = this;
					var url = "https://viacep.com.br/ws/" + cep + "/json/";
					var client = Ti.Network.createHTTPClient({
							// function called when the response data is available
							onload : function(e) {
									Ti.API.info("Received text: " + this.responseText);
									var resposta = JSON.parse(this.responseText);
									md.set({
										uf : resposta.uf,
										cidade : resposta.localidade,
										bairro : resposta.bairro
									})
									//alert('success');
									//chamar callback
									callback({sucesso: true, mensagem: "Deu certo !!"});
							},
							// function called when an error occurs, including a timeout
							onerror : function(e) {
									Ti.API.debug(e.error);
									callback({sucesso: false, mensagem: "Lascou !!!"});
							},
							timeout : 5000  // in milliseconds
					});
					// Prepare the connection.
					client.open("GET", url);
					// Send the request.
					client.send();

				}
		});

		return Model;
	},
	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			// For Backbone v1.1.2, uncomment the following to override the
			// fetch method to account for a breaking change in Backbone.
			/*
			 fetch: function(options) {
			 options = options ? _.clone(options) : {};
			 options.reset = true;
			 return Backbone.Collection.prototype.fetch.call(this, options);
			 }
			 */
		});

		return Collection;
	}
};


model = Alloy.M('cep',
	exports.definition,
	[]
);

collection = Alloy.C('cep',
	exports.definition,
	model
);

exports.Model = model;
exports.Collection = collection;
