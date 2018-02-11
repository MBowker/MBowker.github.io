(function($){

	var herschel = {
		init: function(){
			this.cacheDom();
			this.bindEvents();
			this.render();
			this.resizeHandler();
		},

		cacheDom: function(){
			this.$window = $(window);
			this.$document = $(document);
			this.$htmlAndBody = this.$document.find('html, body');
			this.$html = this.$document.find('html');
			this.$body = this.$document.find('body');
			this.$header = this.$document.find('#site-header');
			this.$socialBar = this.$document.find('#herschel-social-media-links');
			this.$menuHeaderToggle = this.$document.find('#menu-toggle');
			this.$menuHeaderContainer = this.$document.find('#header-menu-container');
			this.$archiveTitle = this.$document.find('.archive .content-title');
			this.$scrollToTop = this.$document.find('#scroll-to-top');
			this.$videoPosts = this.$document.find('.single-format-video .post');
			this.$videoEmbeds = this.$videoPosts.find('iframe, video, embed, object, .video-player, .videopress-placeholder');
		},

		render: function(){
			this.$html.removeClass('no-js').addClass('js');

			if( this.$archiveTitle.length ){
				var archiveTitle = this.$archiveTitle.html().split(': ');

				if( archiveTitle.length > 1 ){
					archiveTitle.shift();
					this.$archiveTitle.html( archiveTitle.join(': ') );
				}
			}

			this.fullWidthVideoEmbeds();
		},

		bindEvents: function(){
			this.$window.resize( this.resizeHandler.bind(this) );
			this.$scrollToTop.on( 'click', this.scrollToTop.bind(this) );
			this.$menuHeaderToggle.on( 'click', this.toggleMenu.bind(this) );
			this.$document.on( 'scroll', this.scrollHandler.bind(this) );
		},

		toggleMenu: function(){
			this.$menuHeaderContainer.toggle()
		},

		adjustSocialBar: function(mm){
			if( mm.matches ){
				this.$socialBar.css( 'padding-top', '10px' );
			}else if( !this.$body.hasClass('no-social-icons') ){
				this.$socialBar.css( 'padding-top', this.$header.height() );
			}
		},

		scrollToTop: function(){
			this.$htmlAndBody.animate({scrollTop:0}, 'slow');
			return false;
		},

		resizeHandler: function(){
			this.fullWidthVideoEmbeds();

			var mm = window.matchMedia( '(max-width: 960px)' );

			if( mm.matches ){
				this.$menuHeaderContainer.hide();
			}else{
				this.$menuHeaderContainer.show();
			}

			this.adjustSocialBar(mm);
		},

		fullWidthVideoEmbeds: function(){
			if( this.$videoEmbeds.length ){
				for( var x=0; x<this.$videoEmbeds.length; x++){
					var $video = $( this.$videoEmbeds[x] );

					$video.width('100%');
					$video.height( ($video.width()/16) * 9 );
				}
			}
		},

		scrollHandler: function(){
			if( this.$document.scrollTop() >= 500 ){
				this.$scrollToTop.show(500)
			}else{
				this.$scrollToTop.hide(500);
			}
		}
	}

	$(document).ready( herschel.init.bind(herschel) );

})(jQuery);
