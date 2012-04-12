function isTouchDevice(e) {
    try {
        document.createEvent('TouchEvent');
        return true;
    } catch(error) {
        return false;
    }
}

$(function() {

	var m, b,
		geoSelector = 0,
		partSelector = 0,
		catSelector = 0,
		yearSelector = 0,
		interaction,
		embedUrl, apiUrl, center,
		curTop,
		onScroll, offScroll,
		mm = com.modestmaps,
		basemap = 'gfdrr-labs.map-44bl16ot',
		layer = 'fews-net.sahel-fewsnet-foodsecurity-apriljune-2012',
		urlBase = 'http://api.tiles.mapbox.com/v3/',
		url = urlBase + basemap + ',' + layer + '.jsonp';
		
	// Build background map
	wax.tilejson(urlBase + basemap + '.jsonp', function(tilejson) {
		b = new mm.Map('map-bg',
		new wax.mm.connector(tilejson));
		b.setCenterZoom(new mm.Location(15, -1), 4);
	});
	
	// Build map
	wax.tilejson(url, function(tilejson) {
		
		tilejson.minzoom = 4;
		tilejson.maxzoom = 8;
		
		m = new mm.Map('map',
		new wax.mm.connector(tilejson));
		
		interaction = wax.mm.interaction()
		  .map(m)
		  .tilejson(tilejson)
		  .on(wax.tooltip().parent(m.parent).events());
		  
		legend = wax.mm.legend(m, tilejson).appendTo(m.parent);
		wax.mm.zoomer(m, tilejson).appendTo(m.parent);
		m.setCenterZoom(new mm.Location(15, -1), 4);
		
		var bw = wax.mm.bwdetect(m, {
          auto: true,
          png: '.png64?'
        });
		
		m.addCallback("drawn", function (m) {
		  b.setCenterZoom(m.getCenter(), m.getZoom());
		});
	});
	
	// Update layer order
	function updateLayers() {
		layer = '';
		$('#sortable li a').each(function(i) {
			if ($(this).hasClass('active')) {
				if (layer == '') {
					layer = this.id;
				} else {
					layer = [
						this.id,
						layer
					].join(',');
				}
			}
		});
	}
	
	// Refresh map, change overlay
	function refreshMap() {
		if (layer == '') {
			url = urlBase + basemap + '.jsonp';
		} else {
			url = urlBase + basemap + ',' + layer + '.jsonp';
		}
		wax.tilejson(url, function(newTileJson) {
			newTileJson.minzoom = 4;
			newTileJson.maxzoom = 8;
			m.setLayerAt(0, new wax.mm.connector(newTileJson));
			$('.wax-tooltip').remove();
			interaction.tilejson(newTileJson);
			$('.wax-legend').remove();
			legend = wax.mm.legend(m, newTileJson).appendTo(m.parent);
		});
	}
	
	// Sidebar nav
	$('#sidebar ul.mainmenu li a').click(function (e) {
	  e.preventDefault();
	  $('#sidebar .panel').removeClass('active');
	  $('#sidebar ul.mainmenu li a').removeClass('active');
	  $('#sidebar .panel.' + this.id).addClass('active');
	  $(this).addClass('active');
	  if (this.id == 'data') {
	    $('#sidebar').css('width','624px');
	    $('#sidebar .content').css('width','624px');
	    $('#sidebar .panel').css('width', '565px');
	    $('#sidebar ul.mainmenu').css('width','624px');
	    $('#sidebar ul.mainmenu li.first a').css('width','185px');
	    $('#sidebar ul.mainmenu li.third a').css('width','185px');
	    $('#sidebar ul.mainmenu li.second a').css('width','251px');
	    $('#attribution').css('left','650px');
	    layer = 'fews-net.sahel-fewsnet-foodsecurity-apriljune-2012';
	    $('.datalist a#fews-net\\.sahel-fewsnet-foodsecurity-apriljune-2012').addClass('active');
	    $('.datalist a#fews-net\\.sahel-fewsnet-foodsecurity-apriljune-2012').parent().parent().prependTo('#sortable');
	    $('.datalist a#fews-net\\.sahel-fewsnet-foodsecurity-apriljune-2012').next().addClass('dark');
	    easeIt(15, -1, 5);
	    updateEmbedApi();
	    refreshMap();
	    if(isTouchDevice()) {
	      setTimeout(function() {
    	    //onScroll = new iScroll('onlayers');
    	    offScroll = new iScroll('offlayers');
    	  }, 200);
   	    }
	  } else {
	    $('#sidebar').css('width','399px');
	    $('#sidebar .content').css('width','399px');
	    $('#sidebar .panel').css('width', '340px');
	    $('#sidebar ul.mainmenu').css('width','399px');
	    $('#sidebar ul.mainmenu li.first a').css('width','120px');
	    $('#sidebar ul.mainmenu li.third a').css('width','120px');
	    $('#sidebar ul.mainmenu li.second a').css('width','156px');
	    $('#attribution').css('left','425px');
	  }
	});
	
	// Data filtering
	$('.filter-geo li a').click(function(e) {
	  e.preventDefault();
	  if ($(this).hasClass('active')) {
	    $(this).removeClass('active');
	    if (geoSelector == 1) {
	      $('#offlayers li').removeClass('geo-off');
	    } else {
	      $('#offlayers li.' + this.id).addClass('geo-off');
	    }
	    geoSelector -= 1;
	  } else {
	    $(this).addClass('active');
	    if (!geoSelector) {
	      $('#offlayers li').addClass('geo-off');
	      $('#offlayers li.' + this.id).removeClass('geo-off');
	    } else {
	      $('#offlayers li.' + this.id).removeClass('geo-off');
	    }
	    geoSelector += 1;
	  }
	  setTimeout(function() {
	  	offScroll.refresh();
	  }, 100);
	});
	$('.filter-part li a').click(function(e) {
	  e.preventDefault();
	  if ($(this).hasClass('active')) {
	    $(this).removeClass('active');
	    if (partSelector == 1) {
	      $('#offlayers li').removeClass('part-off');
	    } else {
	      $('#offlayers li.' + this.id).addClass('part-off');
	    }
	    partSelector -= 1;
	  } else {
	    $(this).addClass('active');
	    if (!partSelector) {
	      $('#offlayers li').addClass('part-off');
	      $('#offlayers li.' + this.id).removeClass('part-off');
	    } else {
	      $('#offlayers li.' + this.id).removeClass('part-off');
	    }
	    partSelector += 1;
	  }
	  setTimeout(function() {
	  	offScroll.refresh();
	  }, 100);
	});
	$('.filter-cat li a').click(function(e) {
	  e.preventDefault();
	  if ($(this).hasClass('active')) {
	    $(this).removeClass('active');
	    if (catSelector == 1) {
	      $('#offlayers li').removeClass('cat-off');
	    } else {
	      $('#offlayers li.' + this.id).addClass('cat-off');
	    }
	    catSelector -= 1;
	  } else {
	    $(this).addClass('active');
	    if (!catSelector) {
	      $('#offlayers li').addClass('cat-off');
	      $('#offlayers li.' + this.id).removeClass('cat-off');
	    } else {
	      $('#offlayers li.' + this.id).removeClass('cat-off');
	    }
	    catSelector += 1;
	  }
	  setTimeout(function() {
	  	offScroll.refresh();
	  }, 100);
	});
	$('.filter-year li a').click(function(e) {
	  e.preventDefault();
	  if ($(this).hasClass('active')) {
	    $(this).removeClass('active');
	    if (yearSelector == 1) {
	      $('#offlayers li').removeClass('year-off');
	    } else {
	      $('#offlayers li.' + this.id).addClass('year-off');
	    }
	    yearSelector -= 1;
	  } else {
	    $(this).addClass('active');
	    if (!yearSelector) {
	      $('#offlayers li').addClass('year-off');
	      $('#offlayers li.' + this.id).removeClass('year-off');
	    } else {
	      $('#offlayers li.' + this.id).removeClass('year-off');
	    }
	    yearSelector += 1;
	  }
	  setTimeout(function() {
	  	offScroll.refresh();
	  }, 100);
	});
	
	// Draggable data list
	$('#sortable').sortable({
	    axis: 'y',
	    containment:'parent',
	    tolerance: 'pointer',
		update: function() {
			updateLayers();
			updateEmbedApi();
			refreshMap();
		}
	});
	$('#sortable').disableSelection();
	
	// easeIt
	function easeIt(x, y, z, callback) {
        var options = {
            location: new mm.Location(x, y),
            zoom: z || 5,
            ease: 'linear',
            time: 1500
        };
        if (typeof callback === 'function') {
            options.callback = callback;
        }
        easey.slow(m, options);
    }
  
  // Story layer switcher
  $('#sidebar .story p a, #sidebar .partners p a').click(function (e) {
    e.preventDefault();
    if ($(this).parent().hasClass('explore-story')) {
    	$('a#story').trigger('click');
    } else if 
    	($(this).parent().hasClass('explore-data')) {
    	$('a#data').trigger('click');
    } else {
    	$(this).addClass('active');
    	layer = this.id;
    }
    if ($(this).hasClass('regional')) {
      easeIt(15, -1, 5);
    }
    if ($(this).hasClass('regional2')) {
      easeIt(15, -1, 4);
    }
    if ($(this).hasClass('mali')) {
      easeIt(16.7, -8.4, 6);
    }
    if ($(this).hasClass('mauritania')) {
      easeIt(20.5, -17, 6);
    }
    if ($(this).hasClass('burkina')) {
      easeIt(12, -6, 7);
    }
    if ($(this).hasClass('niger')) {
      easeIt(17.5, 1, 6);
    }
    if ($(this).hasClass('chad')) {
      easeIt(15.5, 11.5, 6);
    }
    if (!$(this).hasClass('about-link')) {
      refreshMap();
    }
  });
  
  // Data layerswitcher
  $('.datalist a.layer-link').click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
    	$(this).removeClass('active');
    	$(this).next().removeClass('dark');
    	$(this).parent().parent().prependTo('#layerlist');
    } else {
    	$(this).addClass('active');
    	$(this).parent().parent().prependTo('#sortable');
    	$(this).next().addClass('dark');
    }
    $('#offlayers').css('top',$('#onlayers').height() + 15);
    updateLayers();
    updateEmbedApi();
	refreshMap();
  });
  
  // Layer details dropdown
  $('.datalist a.layer-arrow').click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).parent().next().removeClass('active');
      if ($(this).prev().hasClass('active')) {
        $('#offlayers').css('top',curTop);
      }
    } else {
      curTop = $('#offlayers').css('top');
      $('.datalist a.layer-arrow').removeClass('active');
      $('.datalist .detail').removeClass('active');
      $(this).addClass('active');
      $(this).parent().next().addClass('active');
      if ($(this).prev().hasClass('active')) {
        setTimeout(function() {
          $('#offlayers').css('top',$('#onlayers').height() + 175);
          }, 100);
      }
    }
  });
  
  // Hide/show sidebar
  $('a.close').click(function(e) {
    e.preventDefault();
    $('#sidebar').removeClass('active');
    $('.pull-tab').addClass('active');
  });
  
  $('a.pull-tab').click(function(e) {
    e.preventDefault();
    $('#sidebar').addClass('active');
    $(this).removeClass('active');
  });
  
  // Tooltips follow mouse
  $('#map').mousemove(function(e) {
        $('.wax-tooltip').each(function() {
            $(this).css('display', 'block');
            if (!$(this).hasClass('arrowtrue')) {
                $(this).append('<div class="arrow"></div>');
                $(this).addClass('arrowtrue');
            }
            if (($(this).width() + 35) < (screen.width - e.pageX)) {
                if ($(this).hasClass('flip')) { $(this).removeClass('flip'); }
                $(this).css({
                    top: e.pageY - ($(this).height()/2) - 15,
                    left: e.pageX + 18
                });
            } else {
                $(this).addClass('flip').css({
                    top: e.pageY - ($(this).height()/2) - 15,
                    left: e.pageX - $(this).width() - 34
                });
            }
        });
  });
  
  // Update embed & API codes
  function updateEmbedApi() {
    center = m.pointLocation(new mm.Point(m.dimensions.x/2,m.dimensions.y/2));
    if (layer == '') {
      apiUrl = urlBase + basemap + '.jsonp';
      embedUrl = '<iframe src="'
      			 + urlBase
    			 + basemap
                 + '/mm/zoompan,tooltips,legend,bwdetect.html#'
                 + m.coordinate.zoom + '/'
                 + center.lat + '/'
                 + center.lon + '"'
                 + ' frameborder="0" width="650" height="500"></iframe>';
	} else {
	  apiUrl = urlBase + basemap + ',' + layer + '.jsonp';
	  embedUrl = '<iframe src="'
	  			 + urlBase
    			 + basemap + ','
    			 + layer
                 + '/mm/zoompan,tooltips,legend,bwdetect.html#'
                 + m.coordinate.zoom + '/'
                 + center.lat + '/'
                 + center.lon + '"'
                 + ' frameborder="0" width="650" height="500"></iframe>';
	}
	$('textarea.embed-code').text(embedUrl);
	$('textarea.api-code').text(apiUrl);
	$('#share-embed-field textarea').text(embedUrl);
  }
  
  
  
  // Share
    $('a.share').click(function(e){
        e.preventDefault();
        if(isTouchDevice()) {console.log('share');}

        var twitter = 'http://twitter.com/intent/tweet?status=' + 
        'Sahel Food Crisis ' + encodeURIComponent(window.location);
        var facebook = 'https://www.facebook.com/sharer.php?t=Sahel%20Food%20Crisis&u=' + 
                        encodeURIComponent(window.location);

        document.getElementById('twitter').href = twitter;
        document.getElementById('facebook').href = facebook;
        
        updateEmbedApi();
        $('.share-modal').css('display', 'block');
        $('#share-embed-code')[0].tabindex = 0;
        $('#share-embed-code')[0].select();
    });
    
    // About
    $('a.about,a.about-link').click(function(e){
  	  e.preventDefault();
      $('.about-modal').css('display', 'block');
    });

    $('a.share-close, a.about-close').click(function(e){
        e.preventDefault();
        $('.share-modal').css('display', 'none');
        $('.about-modal').css('display', 'none');
    });
    
	if(isTouchDevice()) {
    	$('body').removeClass('no-touch');;
   	}
});