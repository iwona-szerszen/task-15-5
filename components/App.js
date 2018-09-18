App = React.createClass({
	getInitialState: function() {
		return {
			loading: false,
			searchingText: '',
			gif: {}
		};
	},
	getGif: function(searchingText) {
		return new Promise(
			function(resolve, reject) {
				const url = `https://api.giphy.com/v1/gifs/random?api_key=TprbRq8khJpmwAkUV2TCQzgEmAA0XIaE&tag=${searchingText}`;
				const xhr = new XMLHttpRequest();
				xhr.onload = function() {
					if (xhr.status === 200) {
						const data = JSON.parse(xhr.responseText).data;
						const gif = {
							url: data.fixed_width_downsampled_url,
							sourceUrl: data.url
						};
						resolve(gif);
					}
				}
				xhr.open('GET', url);
				xhr.send();
			}
		);
	},
	handleSearch: function(searchingText) {
		this.setState({
			loading: true
		});
		this.getGif(searchingText)
			.then(gif => this.setState({
				loading: false,
				gif: gif,
				searchingText: searchingText
			}))
	},
	render: function() {
		const styles = {
			margin: '0 auto',
			textAlign: 'center',
			width: '90%'
		};
		return (
         	<div style={styles}>
                <h1>Gifs Search Engine</h1>
                <p>Find gif on <a href="http://giphy.com">giphy</a>. Press enter to get more gifs </p>
               	<Search 
					onSearch={this.handleSearch}
				/>
				<Gif
					loading={this.state.loading}
					url={this.state.gif.url}
					sourceUrl={this.state.gif.sourceUrl}
				/>
			</div>
		);
	}
});