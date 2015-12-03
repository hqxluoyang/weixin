var React = require('react');
var DefaultLayout = require('./layouts/default');


var MaterialPage = React.createClass({
	render: function(){
		return (
			<DefaultLayout>
				<div className="collection">
				    <a href="#!" className="collection-item">Alan<span className="badge">1</span></a>
				    <a href="#!" className="collection-item">Alan<span className="new badge">4</span></a>
				    <a href="#!" className="collection-item">Alan</a>
					<a href="#!" className="collection-item">Alan<span className="badge">14</span></a>
				</div>

				<a href="http://materializecss.com/getting-started.html" id="download-button" className="btn-large waves-effect waves-light orange">{this.props.title}</a>

				<div className="fixed-action-btn" style={{bottom: '45px', right: '24px'}}>
				    <a className="btn-floating btn-large red">
				    	<i className="large material-icons">mode_edit</i>
				    </a>
				    <ul>
						<li><a className="btn-floating red"><i className="material-icons">insert_chart</i></a></li>
						<li><a className="btn-floating yellow darken-1"><i className="material-icons">format_quote</i></a></li>
				    	<li><a className="btn-floating green"><i className="material-icons">publish</i></a></li>
				    	<li><a className="btn-floating blue"><i className="material-icons">attach_file</i></a></li>
					</ul>
				</div>

				<div className="row">
			      	<div className="col s12 m5">
			        	<div className="card-panel teal">
			          		<span className="white-text">I am a very simple card. I am good at containing small bits of information.
			          		I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
			          		</span>
			        	</div>
			    	</div>
			    </div>

			    
			</DefaultLayout>
		);
	}
});

module.exports = MaterialPage;