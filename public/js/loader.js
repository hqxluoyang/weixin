define([], function(){
	var loader = {
		// opts: {size: 10em, colors: []}
		container: null,
		options: {
			size: '10em',
			color: ['#3498db', '#e74c3c', '#f9c922']
		},
		createDiv: function(className){
			var dom = document.createElement('div');
			dom.className = className;
			return dom;
		},
		product: function(){
			var self = this;

			
			if(document.querySelectorAll('.my-loader').length > 0){

			}else{
				self.container = self.createDiv('my-loader');
				var l = self.createDiv('loader');
				l.style.width = self.options.size;

				self.container.appendChild(l);
				
				document.getElementsByTagName('body')[0].appendChild(self.container);
			}
			
		},
		displayD: function(){
			var self = this;

			if(self.container.style.display === 'none' || self.container.style.display === ''){
				self.container.style.display = 'block';
			}else{
				self.container.style.display = 'none'
			}
		}, 
		init: function(opts){
			var self = this;
			if(opts){
				self.options.size = opts.size;
				self.options.color = opts.color;
			}else{
				self.product();
				self.displayD();
			}
		}
	};

	return loader;
});
