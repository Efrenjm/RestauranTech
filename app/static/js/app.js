var config = window.config = {};



// Config reference element

var $ref = $("#ref");

// Configure responsive bootstrap toolkit

config.ResponsiveBootstrapToolkitVisibilityDivs = {
    'xs': $('<div class="device-xs 				  hidden-sm-up"></div>'),
    'sm': $('<div class="device-sm hidden-xs-down hidden-md-up"></div>'),
    'md': $('<div class="device-md hidden-sm-down hidden-lg-up"></div>'),
    'lg': $('<div class="device-lg hidden-md-down hidden-xl-up"></div>'),
    'xl': $('<div class="device-xl hidden-lg-down			  "></div>'),
};

ResponsiveBootstrapToolkit.use('Custom', config.ResponsiveBootstrapToolkitVisibilityDivs);

//validation configuration
config.validations = {
	debug: true,
	errorClass:'has-error',
	validClass:'success',
	errorElement:"span",
	// add error class
	highlight: function(element, errorClass, validClass) {
		$(element).parents("div.form-group")
		.addClass(errorClass)
		.removeClass(validClass); 
	}, 

	// add error class
	unhighlight: function(element, errorClass, validClass) {
		$(element).parents(".has-error")
		.removeClass(errorClass)
		.addClass(validClass); 
	},

	// submit handler

    submitHandler: function(form) {
        form.submit();
    }
}

//delay time configuration
config.delayTime = 50;
// chart configurations
config.chart = {};

config.chart.colorPrimary = tinycolor($ref.find(".chart .color-primary").css("color"));
config.chart.colorSecondary = tinycolor($ref.find(".chart .color-secondary").css("color"));
$(function() {
	animate({
		name: 'flipInY',
		selector: '.error-card > .error-title-block'
	});
	setTimeout(function(){
		var $el = $('.error-card > .error-container');
		animate({
			name: 'fadeInUp',
			selector: $el 
		});
		$el.addClass('visible');
	}, 1000);
})

/***********************************************

*        Animation Settings

***********************************************/

function animate(options) {
	var animationName = "animated " + options.name;
	var animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
	$(options.selector)
	.addClass(animationName)
	.one(animationEnd, 
		function(){
			$(this).removeClass(animationName);
		}
	);
}


$(function() {
	var $itemActions = $(".item-actions-dropdown");

	$(document).on('click',function(e) {
		if (!$(e.target).closest('.item-actions-dropdown').length) {
			$itemActions.removeClass('active');
		}
	});

	
	$('.item-actions-toggle-btn').on('click',function(e){
		e.preventDefault();
		var $thisActionList = $(this).closest('.item-actions-dropdown');
		$itemActions.not($thisActionList).removeClass('active');
		$thisActionList.toggleClass('active');	
	});
});

/***********************************************

*        NProgress Settings

***********************************************/

var npSettings = { 
	easing: 'ease', 
	speed: 500 
}



NProgress.configure(npSettings);
$(function() {
	setSameHeights();
	var resizeTimer;
	$(window).resize(function() {
		clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setSameHeights, 150);
	});
});


function setSameHeights($container) {
	$container = $container || $('.sameheight-container');
	var viewport = ResponsiveBootstrapToolkit.current();
	$container.each(function() {
		var $items = $(this).find(".sameheight-item");
		// Get max height of items in container
		var maxHeight = 0;
		$items.each(function() {
			$(this).css({height: 'auto'});
			maxHeight = Math.max(maxHeight, $(this).innerHeight());
		});

		// Set heights of items
		$items.each(function() {
			// Ignored viewports for item
			var excludedStr = $(this).data('exclude') || '';
			var excluded = excludedStr.split(',');
			// Set height of element if it's not excluded on 
			if (excluded.indexOf(viewport) === -1) {
				$(this).innerHeight(maxHeight);
			}
		});
	});
}


$(function() {

	$('.actions-list > li').on('click', '.check', function(e){
		e.preventDefault();
		$(this).parents('.tasks-item')
		.find('.checkbox')
		.prop("checked",  true);
		removeActionList();
	});
});

$(function(){
	// set sortable options
	$('.images-container').sortable({
		animation: 150,
		handle: ".control-btn.move",
		draggable: ".image-container",
		onMove: function (evt) {
			var $relatedElem = $(evt.related);
	        if ($relatedElem.hasClass('add-image')) {
	        	return false;
	        }
	    }
	});

	$controlsButtons = $('.controls');
	$controlsButtonsStar = $controlsButtons.find('.star');
	$controlsButtonsRemove = $controlsButtons.find('.remove');

	$controlsButtonsStar.on('click',function(e){
		e.preventDefault();
		$controlsButtonsStar.removeClass('active');
		$controlsButtonsStar.parents('.image-container').removeClass('main');
		$(this).addClass('active');
		$(this).parents('.image-container').addClass('main');
	})
})

$(function() {
    if (!$('#select-all-items').length) {
        return false;
    }

    $('#select-all-items').on('change', function() {
        var $this = $(this).children(':checkbox').get(0);    
        $(this).parents('li')
            .siblings()
            .find(':checkbox')
            .prop('checked', $this.checked)
            .val($this.checked)
            .change();
    });


    function drawItemsListSparklines(){
        $(".items-list-page .sparkline").each(function() {
            var type = $(this).data('type');
            // Generate random data
            var data = [];
            for (var i = 0; i < 17; i++) {
                data.push(Math.round(100 * Math.random()));
            }
            $(this).sparkline(data, {
                barColor: config.chart.colorPrimary.toString(),
                height: $(this).height(),
                type: type
            });
        });
    }


    drawItemsListSparklines();
    $(document).on("themechange", function(){
        drawItemsListSparklines();
    });
});

//LoginForm validation

$(function() {
	if (!$('.form-control').length) {
        return false;
    }

    $('.form-control').focus(function() {
		$(this).siblings('.input-group-addon').addClass('focus');
	});

	$('.form-control').blur(function() {
		$(this).siblings('.input-group-addon').removeClass('focus');
	});
});

$(function() {

	$(".wyswyg").each(function() {
		var $toolbar = $(this).find(".toolbar");
		var $editor = $(this).find(".editor");
		var editor = new Quill($editor.get(0), {
			theme: 'snow'
		});
		editor.addModule('toolbar', {
			container: $toolbar.get(0)     // Selector for toolbar container
		});
	});
});

$(function () {
	$('#sidebar-menu, #customize-menu').metisMenu({
		activeClass: 'open'
	});

	$('#sidebar-collapse-btn').on('click', function(event){
		event.preventDefault();
		$("#app").toggleClass("sidebar-open");
	});

	$("#sidebar-overlay").on('click', function() {
		$("#app").removeClass("sidebar-open");
	});
});

var modalMedia = {
	$el: $("#modal-media"),
	result: {},
	options: {},
	open: function(options) {
		options = options || {};
		this.options = options;
		this.$el.modal('show');
	},

	close: function() {
		if ($.isFunction(this.options.beforeClose)) {
			this.options.beforeClose(this.result);
		}
		this.$el.modal('hide');

		if ($.isFunction(this.options.afterClose)) {
			this.options.beforeClose(this.result);
		}
	}
};

$(function() {
	$('.nav-profile > li > a').on('click', function() {
		var $el = $(this).next();
		animate({
			name: 'flipInX',
			selector: $el
		});
	});
})

$(function () {

	// Local storage settings
	var themeSettings = getThemeSettings();
	// Elements
	var $app = $('#app');
	var $styleLink = $('#theme-style');
	var $customizeMenu = $('#customize-menu');
	// Color switcher
	var $customizeMenuColorBtns = $customizeMenu.find('.color-item');
	// Position switchers
	var $customizeMenuRadioBtns = $customizeMenu.find('.radio');
	// /////////////////////////////////////////////////
	// Initial state
	// On setting event, set corresponding options
	// Update customize view based on options
	// Update theme based on options
	/************************************************
	*				Initial State
	*************************************************/
	setThemeSettings();
	/************************************************
	*					Events
	*************************************************/
	// set theme type
	$customizeMenuColorBtns.on('click', function() {
		themeSettings.themeName = $(this).data('theme');
		setThemeSettings();
	});


	$customizeMenuRadioBtns.on('click', function() {
		var optionName = $(this).prop('name');
		var value = $(this).val();
		themeSettings[optionName] = value;
		setThemeSettings();
	});

	function setThemeSettings() {
		setThemeState()
		.delay(config.delayTime)
		.queue(function (next) {
			setThemeColor();
			setThemeControlsState();
			saveThemeSettings();
			$(document).trigger("themechange");	
			next();
		});	
	}
	/************************************************
	*			Update theme based on options
	*************************************************/

	function setThemeState() {
		// set theme type
		if (themeSettings.themeName) {
			$styleLink.attr('href', '/_src/css/app-' + themeSettings.themeName + '.css');
		}
		else {
			$styleLink.attr('href', '/_src/css/app.css');
		}
		// App classes
		//$app.removeClass('header-fixed footer-fixed sidebar-fixed');
		// set header
		$app.addClass(themeSettings.headerPosition);
		// set footer
		$app.addClass(themeSettings.footerPosition);
		// set footer
		$app.addClass(themeSettings.sidebarPosition);
		return $app;
	}
	/************************************************
	*			Update theme controls based on options
	*************************************************/

	function setThemeControlsState() {
		// set color switcher
		$customizeMenuColorBtns.each(function() {
			if($(this).data('theme') === themeSettings.themeName) {
				$(this).addClass('active');
			}
			else {
				$(this).removeClass('active');
			}
		});
		// set radio buttons
		$customizeMenuRadioBtns.each(function() {
			var name = $(this).prop('name');
			var value = $(this).val();
			if (themeSettings[name] === value) {
				$(this).prop("checked", true );
			}
			else {
				$(this).prop("checked", false );
			}
		});
	}



	/************************************************

	*			Update theme color

	*************************************************/

	function setThemeColor(){

		config.chart.colorPrimary = tinycolor($ref.find(".chart .color-primary").css("color"));	

		config.chart.colorSecondary = tinycolor($ref.find(".chart .color-secondary").css("color"));	

	}



	/************************************************

	*				Storage Functions

	*************************************************/



	function getThemeSettings() {

		var settings = (localStorage.getItem('themeSettings')) ? JSON.parse(localStorage.getItem('themeSettings')) : {};



		settings.headerPosition = settings.headerPosition || '';

		settings.sidebarPosition = settings.sidebarPosition || '';

		settings.footerPosition = settings.footerPosition || '';



		return settings;

	}



	function saveThemeSettings() {

		localStorage.setItem('themeSettings', JSON.stringify(themeSettings));

	}



});

$(function() {

	'use strict';

	$.fn.scrollContent = function(){

		var div = $(".app .dashboard-page");

		//div.css('top',70);

		div.height($(window).height() - 120);

		div.niceScroll({cursorwidth:10, cursorcolor:"rgb(58, 70, 81, 0.75)"}).resize();

		$(window).resize(function(e) {

			div.height($(window).height() - 120);

			div.niceScroll({cursorwidth:10}).resize();

		});

		div.resize(function(e){

			div.height($(window).height() - 120);

			div.niceScroll({cursorwidth:10}).resize();		

		});

		div.hover(function(e) {

			div.niceScroll({cursorwidth:10}).resize();

		});

	};

	$("#sidebar-menu").height($(window).height() - 120);

	$("#sidebar-menu").niceScroll({cursorwidth:10}).resize();

	$(window).resize(function(e) {

		$("#sidebar-menu").height($(window).height() - 120);

		$("#sidebar-menu").niceScroll({cursorwidth:10}).resize();

    });

	$("#sidebar-menu").resize(function(e){

  		$("#sidebar-menu").height($(window).height() - 120);

		$("#sidebar-menu").niceScroll({cursorwidth:10}).resize();		

	});

	$("#sidebar-menu").hover(function(e) {

        $("#sidebar-menu").niceScroll({cursorwidth:10}).resize();

    });

	

	var propiedades = {

			"language": {

							"lengthMenu": "Mostrando  _MENU_ resultados por pagina",

							"zeroRecords": "No hay registros",

							"info": "Mostrando pagina _PAGE_ de _PAGES_",

							"infoEmpty": "No hay registros",

							"infoFiltered": "(Mostrando _MAX_ total de resultos)"

						},

			"aLengthMenu": [[15, 20, 25, 30, 40, 50, -1], [15, 20, 25, 30, 40, 50, "Todos"]],

			"order": [[ 0, "desc" ]],

			"columnDefs": [{ "orderable": false, "targets": 3 }]

		};

	var propiedadesProd = {

			"language": {

							"lengthMenu": "Mostrando  _MENU_ resultados por pagina",

							"zeroRecords": "No hay registros",

							"info": "Mostrando pagina _PAGE_ de _PAGES_",

							"infoEmpty": "No hay registros",

							"infoFiltered": "(Mostrando _MAX_ total de resultos)"

						},

			"aLengthMenu": [[-1, 10, 15, 20, 25, 30, 40, 50, -1], ['Todos', 10, 15, 20, 25, 30, 40, 50, "Todos"]],

			"order": [[ 0, "asc" ]],

			"columnDefs": [{ "orderable": false, "targets": 3 }]

		};

	if($('#tblPP').length) {//Pendientes

		var oTable = $('#tblPP').dataTable(propiedades);

	}
	if($('#tblpedidos').length) {//Pendientes
		var oTable9 = $('#tblpedidos').dataTable(propiedades);
	}

	if($('#tblProductos').length) {//Pendientes

		var oTable10 = $('#tblProductos').dataTable(propiedadesProd);

	}

	if($('#tblPPA').length) {//Pago aprobado

		var oTable2 = $('#tblPPA').dataTable(propiedades);

	}

	if($('#tblPE').length) {//Enviado

		var oTable3 = $('#tblPE').dataTable(propiedades);

	}

	if($('#tblPEE').length) {//Entregado

		var oTable4 = $('#tblPEE').dataTable(propiedades);

	}

	if($('#tblPC').length) {//Cancelados

		var oTable5 = $('#tblPC').dataTable(propiedades);

	}

	propiedades = {

			"language": {

							"lengthMenu": "Showing  _MENU_ records per page",

							"zeroRecords": "Results not found",

							"info": "Showing page _PAGE_ of _PAGES_",

							"infoEmpty": "No hay registros",

							"infoFiltered": "(Filtering of _MAX_ total results)"

						},

			"aLengthMenu": [[-1, 10, 15, 20, 25, 30, 40, 50, -1], ['Todos', 10, 15, 20, 25, 30, 40, 50, "All"]],

			"order": [[ 1, "desc" ]],

			"columnDefs": [{ "orderable": false, "targets": 5 }]

		};

    if($('#tblRegistros').length) {//Cancelados

		var oTable = $('#tblRegistros').dataTable(propiedades);

	}

	

	$("body").addClass("loaded");
	$.fn.errorF = function(div, t,f){
		var ndiv = $('#'+div).parents('.form-group');
		if(t === '1'){
			ndiv.removeClass('has-danger');
			ndiv.find('.cnt-error').remove();
			return false;
		}
		ndiv.addClass('has-danger');
		if(ndiv.find('.cnt-error').length === 0){
			ndiv.append('<span class="cnt-error"> <span class="has-error">Campo requerido.</span></span>');
		}
		$('.form-control').keyup(function(e) {			
			if($(this).val().length > 0){
				$(this).parents('.form-group').removeClass('has-danger');
				$(this).parents('.form-group').find('.cnt-error').remove();
			}
		});
		$('.form-control').change(function(e) {
			$(this).parents('.form-group').removeClass('has-danger');
			$(this).parents('.form-group').find('.cnt-error').remove();
		});

		$('.froala-view').change(function(e) {
			$(this).parents('.form-group').removeClass('has-danger');
			$(this).parents('.form-group').find('.cnt-error').remove();
		});
	};	

	$.fn.loadFun = function(t){
		if($('#overlay').length == false){
			$('body').append('<div id="overlay"></div>');
		}
		if(t == 'm'){
			$('#overlay').fadeIn('fast');
		}
		else{
			$('#overlay').fadeOut('fast');
		}
	};
	$.fn.Alerta = function(m, t, es){
		if($('#cnt-alert').length == false){
			$('body').append('<div id="cnt-alert"></div>');
		}
		if($('#overlay').length == false){
			$('body').append('<div id="overlay"></div>');
		}		
		$(document).loadFun('m');
		var div = $('#cnt-alert');		
		$(div).css('display','none');
		$(div).html('<div class="'+t+' alert"><div class="msg">'+m+'</div><a class="toggle-alert" href="#">Toggle</a></div>');
		$(div).fadeIn('fast');
		$(".alert .toggle-alert").click(function(){
			if($(this).attr('data-rel') != ''){
				$('#'+$(this).attr('data-rel')).focus();
			}
			$(this).closest(".alert").fadeOut('fast');
			$(document).loadFun('h');
			return false;
		});
		
		if(t == 'success-box'){
			if($('body').attr('id') == 'pag-resumen'){

			}else{
				if(es == '1'){
					setTimeout(function(){
						$('.alert').fadeOut('fast');
						$(document).loadFun('o');
					}, 10000);	
				}else{
					setTimeout(function(){
						$('.alert').fadeOut('fast');
						$(document).loadFun('o');
					}, 2000);	
				}
			}
		}
	}

	var i = 0;
	var j = 0;
	var url = '';
	$('#logout').click(function(e) {
		e.preventDefault();
        var confirmar = confirm("Confirma que deseas salir del panel de administración"); 
		if (confirmar) {
			$.post('/administrador/?logout',
				  function(data){
					  location.href = location.href;
				  }
			);
		}
		return false;
    });

	if($('.selectpicker').length){
		var img = '';
		$('.selectpicker option').each(function(){
			img = $(this).attr('data-ico');
			$(this).css('background-image', 'url("../images/iconos/' + img + '")');
		});
	}

	$.fn.getE = function(val,val2){
		if(val === 'categories'){
			url = location.href.split('?icat=');
			$.post('/administrador/?op=getCategorias',
				function(data){
					var p = jQuery.parseJSON(data);
					var n = p.length;
					var html = '';
					for(i = 0; i < n; i++){
						html += '<tr class="item" data-id="'+ p[i].id +'" id="item-'+ p[i].id +'">';
						html += '<td class="center">' + Number(1 + i) + '</td>';
						html += '<td class="center"><img src="_src/images/iconos/ico'+ p[i].icono +'n.png"></td>';
						html += '<td class="center">'+ p[i].categoria +'</td>';
						html += '<td class="center">'+ p[i].productos +' Productos</td>';
						html += '<td class="center">';
						html += '<a title="Ver Categoría" class="btn btn-success" href="/tienda/'+ p[i].url +'/" target="_blank"><i class="icon fa fa-search-plus"></i></a> ';
						html += '<a title="Editar Categoría" class="btn btn-info editar" data-href="/administrador/?op=eCat" data-title="Edit Category"><i class="icon fa fa-edit"></i></a> ';
						html += '<a title="Administrar Productos" class="btn btn-warning" href="/administrador/productos/?icat='+ p[i].id +'"><i class="icon fa fa-file-o"></i></a> ';
						html += '<a title="Eliminar Categoría" class="btn btn-danger eliminar" data-href="/administrador/?op=delCat"><i class="icon fa fa-trash-o"></i></a>';						
						html += '</td>';
						html += '</tr>';
					}
					$('#resCats').html(html);
					$(document).cats();
				}
			);
		}

		if(val === 'products'){
			url = location.href.split('icat=');
			var cat = url[1];						
			$.getJSON('/administrador/?op=getProductos&iscat='+cat,
				function(data){
					var s = data.dat1;
                    var i = 0;
					oTable10.fnClearTable();
					for(i = 0; i < s.length; i++) {
						oTable10.fnAddData([							
							s[i].folio,
							s[i].producto,
							s[i].presentacion,
							s[i].desc,
							s[i].ops
						]);
					}
				}
			);
		}
		if(val === 'productsOrden'){
			url = location.href.split('icat=');
			var cat = url[1];
			$.post('/administrador/?op=getProductosOrden&iscat='+cat,
				function(data){
					var p = jQuery.parseJSON(data);
					var n = p.length;
					var html = '';
					if (n == 0) {
						html += '<tr class="item">';
						html += '<td colspan="3" class="center">No hay productos agregados en esta categoría</td>';
						html += '</tr>';
					}else{
					for(i = 0; i < n; i++){
						html += '<tr class="item" data-id="'+ p[i].id +'" id="item-'+ p[i].id +'">';
						html += '<td class="center">' + Number(1 + i) + '</td>';
						html += '<td class="text-left">'+ p[i].producto +'<br>Precio: $ '+ p[i].precio +'<br>Peso: '+p[i].peso+'</td>';
						html += '<td >'+ p[i].desc +'</td>';						
						html += '</tr>';
					}}
					$('#resProds').html(html);
					$(document).productos();
				}
			);
		}
		if(val === 'orders'){
			url = location.href.split('status=');
			var ord = url[1];
			$.getJSON('/administrador/?op=getPedidos&status='+ord,
				function(data){
					var s = data.dat1;
                    var i = 0;
					oTable9.fnClearTable();
					for(i = 0; i < s.length; i++) {
						oTable9.fnAddData([							
							s[i].folio,
							s[i].fecha,
							s[i].nombre,
							s[i].tel,
							s[i].total,
							s[i].ops
						]);
					}
				}
			);
		}		
		if(val === 'presentaciones'){
			url = location.href.split('?idProd=');
			$.post('/administrador/?op=getPresentaciones&idp='+url[1],
				function(data){
					var p = jQuery.parseJSON(data);
					var n = p.length;
					var html = '';
					if(n == 0){
						html += '<tr><td colspan="5" class="center">No Hay Tamaños Agregados</td></tr>';
					}else{
						for(i = 0; i < n; i++){
							html += '<tr class="item" data-id="'+ p[i].id +'" id="item-'+ p[i].id +'">';
							html += '<td class="center">' + Number(1 + i) + '</td>';
							html += '<td class="center">'+ p[i].tamanio +'</td>';
							html += '<td class="center">'+ p[i].precio +'</td>';
							html += '<td class="center">'+ p[i].stock +'</td>';
							html += '<td class="center">';
							html += '<a title="Editar Tamaño" class="btn btn-info editar" data-href="/administrador/?op=ePres" data-title="Editar tamaño"><i class="icon fa fa-edit"></i></a> ';
							html += '<a title="Administrar Imágenes" class="btn btn-warning admimgs" data-id="'+p[i].id+'" onclick="javascript:imgProducto(this);return false" data-href="/administrador/?op=admImgs" data-title="Administrar imágenes de: '+p[i].tamanio+'"><i class="icon fa fa-file-image-o"></i></a> ';
							html += '<a title="Eliminar Tamaño" class="btn btn-danger eliminar" data-href="/administrador/?op=delPres"><i class="icon fa fa-trash-o"></i></a>';						
							html += '</td>';
							html += '</tr>';
						}

					}
					$('#resPresentaciones').html(html);
					$(document).pres();
				}
			);
		}
	};

	///==============
	if($('#resProds').length){
		$(document).getE('productsOrden');
	}

	$('#cerrarTienda').click(function() {
		var url = $(this).data('href');
		var confirmar=confirm("Confirme que desea cerrar la tienda."); 
		if (confirmar) {
			var id = 1;
			$.post(url, {id:id},
				function(data){
					try{
						var result = jQuery.parseJSON(data);
						alert(result.msg);
						if(result.status === 'success-box'){
							location.href = location.href;
						}
					}
					catch(e){
						alert('Internal error');
						location.href = location.href;
					}
					$(document).getMnuCats();
			    }

			);
		}
		return false;		
    });	

	$('#abrirTienda').click(function() {
		var url = $(this).data('href');
		var confirmar=confirm("Confirme que desea abrir la tienda."); 
		if (confirmar) {
			var id = 1;
			$.post(url, {id:id},
				function(data){
					try{
						var result = jQuery.parseJSON(data);
						alert(result.msg);
						if(result.status === 'success-box'){
							location.href = location.href;
						}
					}
					catch(e){
						alert('Internal error');
						location.href = location.href;
					}
					$(document).getMnuCats();
			  }
			);
		}
		return false;		
    });	

    if($('#estadoTienda').length){
		var url = location.href;
		var uac = '';
		var uac1 = '';
		var uac2 = '';
		if(url.indexOf('productos') !== -1){
			uac = url.split('icat=');
			uac = uac[1];
		}
		$.post('/administrador/?op=getMnu',
			function(data){
				var p = jQuery.parseJSON(data);
				var n = p.length;
				var html = '';
				var arrow = '';
				var r = '';
				var clase = '';
				var r1 = p.mnu1;
				for(i = 0; i < r1.length; i++){
					if(uac == r1[i].id){clase = 'class="active open"';}else{clase = '';}
					html += '<li '+clase+'><a href="/administrador/productos/?icat='+r1[i].id+'">'+r1[i].categoria +'</a></li>';	
				}
				$('#mnu_1').html(html);
				var html = '';
				for(i = 0; i < r1.length; i++){
					if(uac == r1[i].id){clase = 'class="active open"';}else{clase = '';}
					html += '<li '+clase+'><a href="/administrador/ordenar-productos/?icat='+r1[i].id+'">'+r1[i].categoria +'</a></li>';	
				}
				$('#mnu_2').html(html);
				
			}
		);
	}

	if($('#resPresentaciones').length){
		$(document).getE('presentaciones');
	}
	$('#nPres').click(function() {
		var url = $(this).data('href');
		$('<div>').dialog({
            modal: true,
			resizable:false,
			show: { effect: 'drop', direction: "up"},
			hide: { effect: 'drop', direction: "up"},
            open: function () {
                $(this).load(url, function(){
					$(document).nPres('');
				});	
            },
            close: function() {
           		$(this).remove();
      		},
           //height: 210,
            width: 450,
			position: ['center',25],
            title: 'Agregar Tamaño'
        });
    });	
    $.fn.nPres = function(idSC){
		$('#frmAjax').unbind('submit');
		$('#frmAjax').bind('submit', function(e) {
			e.preventDefault();
			if($('#i1').val() === ''){
				alert('Por favor ingrese el tamaño del producto');
				$(document).errorF('i1','');
				return false;
			}
			if($('#i2').val() === ''){
				alert('Por favor ingrese el precio del producto');
				$(document).errorF('i2','');
				return false;
			}
			if($('#i3').val() === ''){
				alert('Por favor ingrese el stock del producto');
				$(document).errorF('i3','');
				return false;
			}

			$(this).find('input[type=submit]').val('Procesando...').attr('disabled','-1');
			var url = $(this).attr( 'data-action' );
			var datos = $(this).serialize();

			var link = location.href.split('?idProd=');
			var idp = link[1];

			console.log(datos);
			$.post(url, datos + '&idC='+idSC+'&idP='+idp,
				function(data){
					$('input[type=submit]').removeAttr('disabled').val('Guardar');
					var r = jQuery.parseJSON(data);						
					alert(r.msg);
					if(r.status === 'success-box'){
						jQuery('.ui-dialog-content').dialog('close');
						$(document).getE('presentaciones');	
					}
				}
			);
			return false;
		});
	};
	$.fn.pres = function(){
		$('.editar').unbind('click');
		$('.editar').bind('click', function(){
			var url = $(this).data('href');
			var idC = $(this).parents('tr').data('id');
			$('<div>').dialog({
				modal: true,
				resizable:false,
				show: { effect: 'drop', direction: "up"},
				hide: { effect: 'drop', direction: "up"},
				open: function () {
					$(this).load(url+'&idCat=' + idC, function(){
						$(document).nPres(idC);
					});	
				},
				close: function() {
					$(this).remove();
				},
				width: 450,
				position: ['center',25],
				title: 'Editar Tamaño'
			});
		});
		$('.eliminar').unbind('click');
		$('.eliminar').bind('click', function(){
			var confirmar=confirm("Confirme que desea eliminar la presentación actual."); 
			if (confirmar) {
				var id = $(this).parents('tr').data('id');
				$.post($(this).data('href'), {id:id},
					function(data){
						try{
							var result = jQuery.parseJSON(data);
							alert(result.msg);
							if(result.status === 'success-box'){
								$(document).getE('presentaciones');
							}
						}
						catch(e){
							alert('Internal error');
							location.href = location.href;
						}
				  }
				);
			}
			return false;
		});			
		$(".short").sortable({ placeholder: "ui-state-highlight",opacity: 0.6, cursor: 'move', update: function() {		
			var order = $(this).sortable("serialize");
			$.post("/administrador/?op=ordenCats", order, function(respuesta){
				$(document).getE('categories');
			});
		},handle: 'td:first'	
		}).disableSelection();
		$('.ui-sortable td:first-child').hover(function(e) {
			$(this).parents('tr').addClass('hoverTr');
		}, function(e){
			$(this).parents('tr').removeClass('hoverTr');
		});
	};



	if($('#resCats').length){
		$(document).getE('categories');
	}

	$('#nCat').click(function() {
		var url = $(this).data('href');
		$('<div>').dialog({
            modal: true,
			resizable:false,
			show: { effect: 'drop', direction: "up"},
			hide: { effect: 'drop', direction: "up"},
            open: function () {
                $(this).load(url, function(){
					$(document).nCat('');
				});	
            },
            close: function() {
           		$(this).remove();
      		},
           //height: 210,
            width: 450,
			position: ['center',25],
            title: 'Agregar Categoría'
        });
    });	


	$.fn.nCat = function(idSC){
		$('#frmAjax').unbind('submit');
		$('#frmAjax').bind('submit', function(e) {
			e.preventDefault();
			if($('#i1').val() === ''){
				alert('Por favor ingrese el nombre de la categoría');
				$(document).errorF('i1','');
				return false;
			}
			$(this).find('input[type=submit]').val('Procesando...').attr('disabled','-1');
			var url = $(this).attr( 'data-action' );
			var datos = $(this).serialize();
			console.log(datos);
			$.post(url, datos + '&idC='+idSC,
				function(data){
					$('input[type=submit]').removeAttr('disabled').val('Guardar');
					var r = jQuery.parseJSON(data);						
					alert(r.msg);
					if(r.status === 'success-box'){
						jQuery('.ui-dialog-content').dialog('close');
						$(document).getE('categories');	
					}
				}
			);
			return false;
		});
	};

	$.fn.cats = function(){
		$('.editar').unbind('click');
		$('.editar').bind('click', function(){
			var url = $(this).data('href');
			var idC = $(this).parents('tr').data('id');
			$('<div>').dialog({
				modal: true,
				resizable:false,
				show: { effect: 'drop', direction: "up"},
				hide: { effect: 'drop', direction: "up"},
				open: function () {
					$(this).load(url+'&idCat=' + idC, function(){
						$(document).nCat(idC);
					});	
				},
				close: function() {
					$(this).remove();
				},
				width: 450,
				position: ['center',25],
				title: 'Editar Categoría'
			});
		});
		$('.cImg').unbind('click');
		$('.cImg').bind('click', function(){
			var url = $(this).data('href');
			var idC = $(this).parents('tr').data('id');
			$('<div>').dialog({
				modal: true,
				resizable:false,
				show: { effect: 'drop', direction: "up"},
				hide: { effect: 'drop', direction: "up"},
				open: function () {
					$(this).load(url+'&idCat=' + idC, function(){
						upload('cImgCat');
					});	
				},
				close: function() {
					$(this).remove();
				},
				width: 350,
				position: ['center',20],
				title: 'Agregar/Cambiar Imagen'
			});			
		});
		$('.eliminar').unbind('click');
		$('.eliminar').bind('click', function(){
			var confirmar=confirm("Confirme que desea eliminar la categoría actual.\nTodos los productos de esta categoría seran eliminados."); 
			if (confirmar) {
				var id = $(this).parents('tr').data('id');
				$.post($(this).data('href'), {id:id},
					function(data){
						try{
							var result = jQuery.parseJSON(data);
							alert(result.msg);
							if(result.status === 'success-box'){
								$(document).getE('categories');
							}
						}
						catch(e){
							alert('Internal error');
							location.href = location.href;
						}
				  }
				);
			}
			return false;
		});			
		$(".short").sortable({ placeholder: "ui-state-highlight",opacity: 0.6, cursor: 'move', update: function() {		
			var order = $(this).sortable("serialize");
			$.post("/administrador/?op=ordenCats", order, function(respuesta){
				$(document).getE('categories');
			});
		},handle: 'td:first'	
		}).disableSelection();
		$('.ui-sortable td:first-child').hover(function(e) {
			$(this).parents('tr').addClass('hoverTr');
		}, function(e){
			$(this).parents('tr').removeClass('hoverTr');
		});
	};

	$.fn.nProducto = function(id){
		$('#frmAjax').unbind('submit');
		$('#frmAjax').bind('submit', function(e) {
			e.preventDefault();
			if($('#i1').val() === ''){
				alert('Por favor ingrese el nombre del producto.');
				$(document).errorF('i1');
				return false;
			}
			if($('#i2').val() === ''){
				alert('Por favor ingrese el precio del producto');
				$(document).errorF('i2');
				return false;
			}
			if($('#i3').val() === ''){
				alert('Por favor ingrese el peso del producto');
				$(document).errorF('i3');
				return false;
			}
			if($('#desc1').val() === ''){
				alert('Por favor ingrese la descripción del producto.');
				$(document).errorF('desc1');
				return false;
			}
			var get = location.href.split('productos/?');
			$(this).find('input[type=submit]').val('Procesando...').attr('disabled','-1');
			var url = $(this).attr( 'data-action' );
			var datos = $(this).serialize();
			
			$.post(url, datos + '&idP='+id + '&'+ get[1],
				function(data){
					$('input[type=submit]').removeAttr('disabled').val('Guardar');
					var r = jQuery.parseJSON(data);						
					alert(r.msg);
					if(r.status === 'success-box'){
						$(document).getE('products');
						$('#formProd').fadeOut(500, function(){
							$('#formProd #res').html('');
						});
						$('#tbl').css('display','block');
						$('#editarP').css('display','none');
						$('#agregarP').css('display','inline-flex');
					}
				}
			);

			return false;
		});
		$('.cancelaProd').click(function(){
			$('#formProd').css('display','none');
			$('#tbl').css('display','block');
			$('#editarP').css('display','none');
			$('#agregarP').css('display','inline-flex');
		});
	};
	if($('#tblProductos').length){
		$(document).getE('products');
	}
	$('#nProducto').click(function(e) {
		$('#tbl').css('display','none');
		var url = $(this).data('href');
		var cat = location.href.split('icat=');
		$.get(url+'&cat=' + cat[1], function(data){
			$('#formProd #res').html(data);
			$('#formProd').fadeIn(500);
			$(document).nProducto('');
		});
	});
	$('#regTblProds').click(function(){
		$('#formProd').fadeOut(500, function(){
			$('#formProd #res').html('');
		});
		$('#tbl').css('display','block');
		$('#editarP').css('display','none');
		$('#agregarP').css('display','inline-flex');
	});
	$.fn.productos = function(){		
		$(".short").sortable({ placeholder: "ui-state-highlight",opacity: 0.6, cursor: 'move', update: function() {		
			var order = $(this).sortable("serialize");
			
			$.post("/administrador/?op=ordenProds", order, function(respuesta){
				$(document).getE('productsOrden');
			});
		},handle: 'td:first'	
		}).disableSelection();
		$('.ui-sortable td:first-child').hover(function(e) {
			$(this).parents('tr').addClass('hoverTr');
		}, function(e){
			$(this).parents('tr').removeClass('hoverTr');
		});
	};
	$.fn.eProductos = function(v){
			$('#tbl').css('display','none');
			$('#editarP').css('display','inline-flex');
			$('#agregarP').css('display','none');
			var url = $(v).data('href');
			var idC = $(v).data('id');
			$.get(url+'&idP=' + idC, function(data){
				$('#formProd #res').html(data);
				$('#formProd').fadeIn(500);
				$(document).nProducto(idC);
			});
			
	};
	$.fn.admimgsProduct = function(v){
		
			var url = $(v).data('href');		
			var win = $('#modalGeneral');
			var idC = $(v).data('id');
			win.find('.modal-dialog').width('660');
			$('.dz-preview').remove();
			$('.dz-message').css('display','block');
			$('#demo-upload').data('idp',idC);
			Dropzone.autoDiscover = false;
			var myDropzone;
			if(!$('#dropzone').length){
				win.find('.modal-body').html('<ul class="nav nav-tabs modal-tabs" role="tablist">'+
					'<li class="nav-item"> <a class="nav-link active" href="#gallery" data-toggle="tab" role="tab">Imágenes</a> </li>'+
					'<li class="nav-item"> <a class="nav-link" href="#upload" data-toggle="tab" role="tab" id="upImg">Agregar Imágenes</a> </li>'+
				'</ul>'+
				'<div class="tab-content modal-tab-content">'+
					'<div class="tab-pane fade active in" id="gallery" role="tabpanel">'+
						'<div class="images-container">'+
							'<div class="row short" id="resImgs">'+                    	
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="tab-pane fade" id="upload" role="tabpanel">'+
						'<div class="upload-container">'+
							'<div id="dropzone">'+
								'<form action="/administrador/?op=uImg&idP='+idC+'" method="POST" enctype="multipart/form-data" class="dropzone needsclick dz-clickable" id="demo-upload" data-idp="'+idC+'">'+
									'<div class="dz-message-block">'+
										'<div class="dz-message needsclick">Click o Arrastre las imágenes aqui.. </div>'+
									'</div>'+
								'</form>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>');
				myDropzone = $("#demo-upload").dropzone({
					acceptedFiles: "image/jpeg,image/png",
					url: '/administrador/?op=uImg',
					maxFiles: 20, // Number of files at a time
					maxFilesize: 12, //in MB
					maxfilesexceeded: function(file)
					{
						alert('Solo puede subir una imagen a la vez'); return false;
					},
					dictFileTooBig: "La imagen subida tiene un peso de: ({{filesize}}MiB). peso maximo: {{maxFilesize}}MiB.",
					dictRemoveFile: "Eliminar",
					dictCancelUpload: "Cancelar",
					dictCancelUploadConfirmation: "¿Confirma que desea cancelar la subida?",
					success: function (file) {
					},
					init: function() {
						this.on("sending", function(file, xhr, formData){
							console.log(file);
							formData.append("idP", $("#demo-upload").data('idp'));
						}),
						this.on("success", function(file, xhr){
							$(document).getImgs($("#demo-upload").data('idp'));
							//console.log($("#demo-upload").data('idp'));
							//console.log(file.xhr.response);
						});
					}			
				});
			}
			$(document).getImgs(idC);
			//win.find('.modal-body').load(url+'&idP=' + idC);
			win.find('.modal-title').html($(this).data('title'));
			win.modal('show');	
			win.on('shown.bs.modal', function () {
				//$(document).imagenes();
			});
			win.on('hidden.bs.modal', function () {
				//myDropzone.destroy();
				//$('.modal-body').html();		
			});

			$(".short").sortable({ placeholder: "ui-state-highlight",opacity: 0.6, cursor: 'move', update: function() {		
				var order = $(this).sortable("serialize");
				var res = order.split("&");
				var pos='';
				for(i = 0; i < res.length; i++){
					var exp = res[i].split('=');
					var id = '#img-'+exp[1];
					var nombreImg = $(id).data('img');
					pos += 'img[]='+nombreImg+'&';
				}
				var datos = pos+'idP='+idC;
				console.log(datos)
				$.post("/administrador/?op=ordenImgs", datos, function(respuesta){

					$(document).getImgs(idC);
				});
			},handle: 'div:first'	
			}).disableSelection();
			$('.ui-sortable div:first-child').hover(function(e) {
				$(this).parents('div').addClass('hoverTr');
			}, function(e){
				$(this).parents('div').removeClass('hoverTr');
			});			
				
	};
	$.fn.delProductos = function(v){
			var confirmar=confirm("Confirma que se desea eliminar el producto actual."); 
			if (confirmar) {
				var id = $(v).data('id');
				$.post($(v).data('href'), {id:id},
					function(data){
						try{
							var result = jQuery.parseJSON(data);
							alert(result.msg);
							if(result.status === 'success-box'){
								$(document).getE('products');
							}
						}
						catch(e){
							alert('Internal error');
							location.href = location.href;
						}
				  	}
				);
			}
			return false;
	};
	$.fn.getImgs = function(idP){
		$.post('/administrador/?op=getImgs&idP='+idP,
			function(data){
				var p = jQuery.parseJSON(data);
				var html = '';
				var n = p.length;
				for(i = 0; i < n; i++){
					html += '<div class="col-xs-3 itemImg" id="img-'+ i +'" data-idp="'+ idP +'" data-img="'+p[i].img+'">';
					html += '<div class="image-container">';
					html += '<div class="image">';
					html += '<img src="_src/images/productos/thumb/'+ p[i].img +'">';
					html += '<figcaption>';
					html += '<a title="Eliminar imagen" class="btn btn-danger delImg"><i class="icon fa fa-trash-o"></i></a>';
					html += '</figcaption>';
					html += '</div>';
					html += '</div>';
					html += '</div>';
				}


				$('#resImgs').html(html);
				$(document).imagenes(idP);
				if(n == 0){
					$('#resImgs').html('<div class="text-center">No hay imágenes agregadas para este producto.</div>');
					$('#upImg').trigger('click');
				}
			}
		);		
	};

	$.fn.imagenes = function(idP){
		$('.delImg').unbind('click');
		$('.delImg').bind('click', function(e){
			var confirmar = confirm("Confirma que desea eliminar la imagen."); 
			if (confirmar) {
				var id = $(this).parents('.itemImg').attr('id').replace('img-','');
				$.post('/administrador/?op=delImg', {id:id, idP:idP},
					function(data){
						try{
							var result = jQuery.parseJSON(data);
							if(result.status === 'success-box'){
								$('#img-' + id).fadeOut(600, function(){
									$('#img-' + id).remove();
									$('#resImgs .itemImg').each(function(index, element) {
										$(this).attr('id', 'img-'+index);
                                    });
								});
							}else{
								alert(result.msg);
							}
						}
						catch(e){
							alert('Internal error');
							location.href = location.href;
						}
				  }
			);
			}
			return false;
		});	
	};


	$.fn.getMnuCats = function(){
		var url = location.href;
		var uac = '';
		var uac1 = '';
		var uac2 = '';
		if(url.indexOf('/productos/') !== -1){
			uac = url.split('icat=');
			uac = uac[1];
		}
		$.post('/administrador/?op=getMnu',
			function(data){
				var p = jQuery.parseJSON(data);
				var n = p.length;
				var html = '';
				var arrow = '';
				var r = '';
				var clase = '';
				var r1 = p.mnu1;
				for(i = 0; i < r1.length; i++){
					if(uac == r1[i].id){clase = 'class="active open"';}else{clase = '';}
					html += '<li '+clase+'><a href="/administrador/productos/?icat='+r1[i].id+'">'+r1[i].categoria +'</a></li>';	
				}
				$('#mnu_1').html(html);
				
			}
		);
	};
	$.fn.getMnuCats2 = function(){
		var url = location.href;
		var uac = '';
		var uac1 = '';
		var uac2 = '';
		if(url.indexOf('/ordenar-productos/') !== -1){
			uac = url.split('icat=');
			uac = uac[1];
		}
		$.post('/administrador/?op=getMnu',
			function(data){
				var p = jQuery.parseJSON(data);
				var n = p.length;
				var html = '';
				var arrow = '';
				var r = '';
				var clase = '';
				var r1 = p.mnu1;
				for(i = 0; i < r1.length; i++){
					if(uac == r1[i].id){clase = 'class="active open"';}else{clase = '';}
					html += '<li '+clase+'><a href="/administrador/ordenar-productos/?icat='+r1[i].id+'">'+r1[i].categoria +'</a></li>';	
				}
				$('#mnu_2').html(html);
				
			}
		);
	};



	//--Pedidos

	if($('#cnttblPP').length){
		$(document).getE('orders');
	}
	if($('#tblpedidos').length){
		$(document).getE('orders');
	}
	if($('#tblPresentaciones').length){
	}

	$(document).getMnuCats();
	$(document).getMnuCats2();



	$.fn.apPedido = function(id){
		$('#frmfPagos').bind('submit', function(e) {
			e.preventDefault();
			if($('#fPago').val() === ''){
				alert('Please select a payment method.');
				$(document).errorF('i1');
				return false;
			}

			$(this).find('input[type=submit]').val('Procesando...').attr('disabled','-1');
			var url = $(this).attr( 'data-action' );
			var datos = $(this).serialize();
			$.post(url, datos + '&id='+id,
					function(data){
						$('input[type=submit]').removeAttr('disabled').val('Guardar');
						var r = jQuery.parseJSON(data);				
						alert(r.msg);
						if(r.status === 'success-box'){
							jQuery('.ui-dialog-content').dialog('close');
							$(document).getE('orders');
						}//*/
					}
				);
				return false;
			});
	};

	$.fn.aPedido = function(v){
		var id = $(v).data('id').replace('a-','');
		$('<div>').dialog({
			modal: true,
			resizable:false,
			open: function () {
				$(this).load("/administrador/?op=WinApPedido", function(){
					//$('.ui-dialog-titlebar-close').addClass('btn');
					//$('.ui-dialog-titlebar-close').html('<span class="fa fa-times fa-fw"></span>');
					$(document).apPedido(id);
				});
			},
			close: function(event, ui) {
					$(this).remove();
			},
			width: 400,
			height: 160,
			title: 'Aprovar pedido'
		});
	}

	$.fn.cPedido = function(v){
		var confirmar = confirm("Confirma que desea cancelar el pedido.");
		if (confirmar) {
			$(document).loadFun('m');
			var id = $(v).attr('data-id').replace('c-','');
			$.post('/administrador/?op=cPedido', {id:id},
				function(data){
					var r = jQuery.parseJSON(data);
					$(document).Alerta(r.msg,r.status);
					if(r.status == 'success-box'){						
						$(document).getE('orders');
					}
			  	}
			);
		}
	}

	$.fn.dPedido = function(v){
		var confirmar = confirm("Confirma que desea eliminar el pedido.\n Está acción es irreversible."); 
		if(confirmar){
			var url = $(this).attr( 'href' );
			var id = $(v).attr('data-id').replace('d-','');
			$.post('/administrador/?op=dPedido', {id:id},
				function(data){
					var r = jQuery.parseJSON(data);
					$(document).Alerta(r.msg,r.status);
					if(r.status == 'success-box'){						
						$(document).getE('orders');
					}
				}
			);
		}
	}

	$.fn.aotPedido = function(v){
		var confirmar = confirm("Confirma que desea marcar el pedido en transito"); 
		if (confirmar) {
			//$(document).loadFun('m');
			var id = $(v).attr('data-id').replace('a-','');
			$.post('/administrador/?op=aotPedido', {id:id},
				function(data){
					var r = jQuery.parseJSON(data);
					$(document).Alerta(r.msg,r.status);
					if(r.status == 'success-box'){						
						$(document).getE('orders');
					}
			  	}
			);
		}		
	}

	$.fn.aodPedido = function(v){
		var confirmar = confirm("Confirma que desea marcar el pedido como entregado."); 
		if (confirmar) {
			$(document).loadFun('m');
			var id = $(v).attr('data-id').replace('a-','');
			$.post('/administrador/?op=aodPedido', {id:id},
				function(data){
					var r = jQuery.parseJSON(data);
					$(document).Alerta(r.msg,r.status);
					if(r.status == 'success-box'){						
						$(document).getE('orders');
					}
			  	}
			);
		}		
	}
	$.fn.notfPedido = function(v){
		var confirmar = confirm('Confirma que desea mandar una notificación al cliente. \n del estatus "pendiente" de su pedido.'); 
		if (confirmar) {
			//$(document).loadFun('m');
			var id = $(v).attr('data-id').replace('a-','');
			$.post('/administrador/?op=notfPedido', {id:id},
				function(data){
					var r = jQuery.parseJSON(data);
					$(document).Alerta(r.msg,r.status);
					if(r.status == 'success-box'){						
						$(document).getE('orders');
					}
			  	}
			);
		}		
	}
    

	if($('#resProds').length > 0 && $('#resProds').hasClass('pCliente')){
		$(document).getE('pCliente');
	}

	//frmEPedido

	$.fn.ePedido = function(id){
		$('#frmEPedido').unbind('submit');
		$('#frmEPedido').bind('submit', function(e) {
			e.preventDefault();
			if($('#inombre').val() === ''){
				alert('Favor de escribir el nombre del cliente.');
				$(document).errorF('inombre');
				return false;
			}
			if($('#iap').val() === ''){
				alert('Favor de escribir los apellidos del cliente.');
				$(document).errorF('iap');
				return false;
			}
			if($('#iemail').val() === ''){
				alert('Favor de escribir el correo electrónico del cliente.');
				$(document).errorF('iemail');
				return false;
			}
			if($('#itel').val() === ''){
				alert('Favor de escribir el teléfono del cliente.');
				$(document).errorF('itel');
				return false;
			}
			if($('#iobservaciones').val() === ''){
				alert('Favor de escribir los comentarios/referencias.');
				$(document).errorF('iobservaciones');
				return false;
			}
			if($('#idomicilio').val() === ''){
				alert('Favor de escribir la dirección del cliente.');
				$(document).errorF('idomicilio');
				return false;
			}
			if($('#inumext').val() === ''){
				alert('Favor de escribir el número exterior del cliente.');
				$(document).errorF('inumext');
				return false;
			}
			/*if($('#inumint').val() === ''){
				alert('Favor de escribir el número interior del cliente.');
				$(document).errorF('inumint');
				return false;
			}*/
			if($('#icol').val() === ''){
				alert('Favor de escribir la colonia del cliente.');
				$(document).errorF('icol');
				return false;
			}
			if($('#iciudad').val() === ''){
				alert('Favor de escribir la ciudad del cliente.');
				$(document).errorF('iciudad');
				return false;
			}

			if($('#iestado').val() === ''){
				alert('Favor de escribir el estado del cliente.');
				$(document).errorF('iestado');
				return false;
			}

			var get = location.href.split('ePedido=');

			$(this).find('input[type=submit]').val('Procesando...').attr('disabled','-1');
			var url = $(this).attr( 'data-action' );
			var datos = $(this).serialize();
			$.post(url, datos + '&idP='+ get[1],
				function(data){
					$('input[type=submit]').removeAttr('disabled').val('Guardar');
					var r = jQuery.parseJSON(data);						
					alert(r.msg);
					/*if(r.status === 'success-box'){
						//$('#modalGeneral').modal('hide');
						$(document).getE('productos');
						$('#formProd').fadeOut(500, function(){
							$('#formProd #res').html('');
						});
						$('#tbl').css('display','block');
					}*/
				}
			);
			return false;
		});
	};
	if($('#frmEPedido').length > 0){
		$(document).ePedido();
	}
	//
});

/***********************************************

*        NProgress Settings

***********************************************/



// start load bar

NProgress.start();



// end loading bar 

NProgress.done();

function extension(archivo){

	return (/[.]/.exec(archivo)) ? /[^.]+$/.exec(archivo) : undefined;

}
function eProducto(v){
	$(document).eProductos(v);
}
function imgProducto(v){
	$(document).admimgsProduct(v);
}
function deleteProducto(v){
	$(document).delProductos(v);
}
function aPedido(v){
	$(document).aPedido(v);
}
function notfPedido(v){
	$(document).notfPedido(v);
}
function aotPedido(v){	
	$(document).aotPedido(v);
}
function aodPedido(v){	
	$(document).aodPedido(v);
}
function cPedido(v){	
	$(document).cPedido(v);
}
function cRastreo(v){	
	$(document).cRastreo(v);
}
function dPedido(v){	
	$(document).dPedido(v);
}