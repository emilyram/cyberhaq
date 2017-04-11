$( document ).ready(function() {

    var autocompleteParams = {
        source: _.map(webpage_data, 'url'),
        messages: {
            noResults: '',
            results: function() {}
        }
    };

	$(document).on('enterKey', '.urlbar', function(e) {
      var data = _.find(webpage_data, { url: $(this).val() });
      if(data) {
        $(this).siblings('.webpage-iframe').attr('src', data.src);
        $('#instruction-text').html(data.instructions);
        var tabID = $(this).parent().attr('id');
        $('a[href="#' + tabID + '"]').html(data.title + '&nbsp;&nbsp;');
      }
	});

    $(document).on('keyup', '.urlbar', function(e) {
	  if(e.keyCode == 13)
	  {
	    $(this).trigger("enterKey");
	  }
	});

// TAB STUFF

    var tabNum = 1; // Each tab created gets UNIQUE tab ID
    $('.x-btn').click(function() {
      var tab = $('a[href="#tab1"]').parent();
      var index = $('li.nav-item').index(tab);
      var active = tab.hasClass('active');
      $('a[href="#tab1"]').parent().remove();
      $('#tab1').remove();
      fixTabs(active, index);
    }).css({ display: 'none' });
    $('.autocomplete').autocomplete(autocompleteParams);

    $('#add-tab').click(function() {
      tabNum++;
      $('.x-btn').css({ display: '' });
      var item = $('<li class="nav-item"></li>').appendTo('ul.nav-tabs');
      var tab = $('<a data-toggle="tab" href="#tab' + tabNum + '">Bank&nbsp;&nbsp;</a>').appendTo(item);
      var xbtn = $('<button type="button" class="close x-btn">&times;</button>').appendTo(item);
      xbtn.click(function() {
        var tab = $('a[href="#tab' + this.tabNum + '"]').parent();
        var index = $('li.nav-item').index(tab);
        var active = tab.hasClass('active');
        $('a[href="#tab' + this.tabNum + '"]').parent().remove();
        $('#tab' + this.tabNum).remove();
        fixTabs(active, index);
      }.bind( { tabNum : tabNum } ));

      var pane = $('<div id="tab' + tabNum + '" class="tab-pane fade fill"></div>').appendTo('.tab-content');
      var urlBar = $('<input type="text" class="urlbar autocomplete" value="https://www.galacticbank.com"></input>').appendTo(pane);
      urlBar.autocomplete(autocompleteParams);
      pane.append('<br><br><iframe class="webpage-iframe" src="bank/login.html"></iframe>');
      tab.tab('show');
    });

    var fixTabs = function(active, index) {
      if($('.x-btn').length === 1) $('.x-btn').css({ display: 'none' });
      if(active) {
        if(index >= $('li.nav-item').length) {
          $('li:last a').tab('show');
        } else {
          $('li:eq(' + index + ') a').tab('show');
        }
      }
    };
});
