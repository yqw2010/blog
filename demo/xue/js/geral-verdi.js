var proporcao = 1;
strClass = ".imgFundo";
var posLeft = 0;
var menuAberto = 200;
var imgProx = 0;
var classImgFundoAtual = "imgProjeto";
var imgAnt = 0;
var tFundo;
var direcao = 1;
var BrowserUserNotIE = true;
var BrowserMobile = false;
var btAjustarHash = false;
var dragIni = 0;
var wheel = false;
var fourDivs = false;  //control fourDivs click show


marcaMenu(0);

$("#fundo").css("padding-left", $(window).width() / 2);
$("#conteudo").css("padding-left", $(window).width());

if ($.browser.msie) {
	if (parseInt($.browser.version, 10) === 8 || parseInt($.browser.version, 10) === 7 || parseInt($.browser.version, 10) === 6) {
		BrowserUserNotIE = false;
	}
}
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
	BrowserMobile = true;
}

$("body").keydown(function(e) {
	if ((e.keyCode == 40) || (e.keyCode == 37) || (e.keyCode == 38) || (e.keyCode == 39)) {
		return false;
	}
});

function abreConteudo(nrConteudo) {
	marcaMenu(nrConteudo * -1);
	$('#projeto').fadeOut().remove();
	$('#projetosDiv-categoria').fadeOut().remove();
	posLeft = nrConteudo;

	btAjustarHash = true;
	resizedAnimado();
}

function marcaMenu(nrMenu) {
	return;
	$("#menu").find("span").css("font-size", "10px");
	$("#menu").find("a").css("font-weight", "normal");
	$("#menu_" + nrMenu).parent().find("span").css("font-size", "15px");
	$("#menu_" + nrMenu).parent().find("a").css("font-weight", "bold");
}

function resizedAnimado() {
	$("#container").css("height", $(window).height());
	$("#conteudo").css("height", $(window).height());
	$(".divConteudo").css("height", $(window).height());
	$("#espacamento_a").stop().animate({
		width: 200 - menuAberto
	}, 1000, function() {});
	$(".divConteudo").stop().animate({
		width: ($(window).width() - menuAberto)
	}, 1000, function() {});
	$(".divFundo").stop().animate({
		width: $(window).width()
	}, 1000, function() {});
	proporcao = $(window).width() / ($(window).height());
	if (proporcao < 1.5) {
		$(strClass).css("<wid></wid>th", "auto");
		$(strClass).stop().animate({
			height: ($(window).height() + $(window).height() / 10),
			marginLeft: (($(window).width() - $(strClass).width()) / 2)
		}, 1000, function() {});
	} else {
		$(strClass).css("height", "auto");
		$(strClass).stop().animate({
			width: $(window).width(),
			marginLeft: 0
		}, 1000, function() {});
	}

	$("#fundo").delay(30).stop().animate({
		left: (posLeft * $(window).width()) - ($(window).width() / 20) - ($(window).width() / 10) + menuAberto
	}, 995, function() {});
	$("#conteudo").stop().animate({
		left: ((posLeft * ($(window).width() - menuAberto)) + menuAberto)
	}, 1000);
	$(".textoCentralizado").height($(window).height());

}

function resized() {
	$("#container").css("height", $(window).height());
	$("#conteudo").css("height", $(window).height());
	$(".divConteudo").css("height", $(window).height());
	$("#espacamento_a").css({
		width: 200 - menuAberto
	});
	$(".divConteudo").css({
		width: ($(window).width() - menuAberto)
	});
	$(".divFundo").css({
		width: $(window).width()
	});
	proporcao = $(window).width() / ($(window).height());
	if (proporcao < 1.5) {
		$(strClass).css("width", "auto");
		$(strClass).css({
			height: ($(window).height() + $(window).height() / 10),
			marginLeft: (($(window).width() - $(strClass).width()) / 2)
		});
	} else {
		$(strClass).css("height", "auto");
		$(strClass).css({
			width: $(window).width(),
			marginLeft: 0
		});
	}

	if (proporcao < 1.5625) {
		$("." + classImgFundoAtual).css("height", "auto");
		$("." + classImgFundoAtual).css("width", ($(window).width() - 40));
		$("." + classImgFundoAtual).css("left", "0");
		$("." + classImgFundoAtual).css("top", (($(window).height() - $("." + classImgFundoAtual).height()) / 2));

	} else {
		$("." + classImgFundoAtual).css("width", "auto")
		$("." + classImgFundoAtual).css("top", "0");
		$("." + classImgFundoAtual).css("left", ((($(window).width() - 40) - $("." + classImgFundoAtual).width()) / 2));
		$("." + classImgFundoAtual).css("height", ($(window).height()));


	}
	if ($(window).width() > 1400) {
		resolucao = 3;
	} else if ($(window).width() > 1050) {
		resolucao = 2;
	} else {
		resolucao = 1;
	}

	ajustaImagens();


	$("#fundo").delay(30).css({
		left: (posLeft * $(window).width()) - ($(window).width() / 20) - ($(window).width() / 10) + menuAberto
	});
	$("#conteudo").css({
		left: ((posLeft * ($(window).width() - menuAberto)) + menuAberto)
	});
	$(".textoCentralizado").height($(window).height());

}

function ajustaImagens() {
	proporcaoImagem = ($(window).width() - menuAberto) / ($(window).height());
	//console.log(proporcaoImagem);	
	if (proporcaoImagem < 1.18) {
		$(".img_grayscale").css("height", "100%");
		$(".img_grayscale").css("width", "auto");
		$(".img_grayscale").css("top", "0");
		if ((BrowserUserNotIE && !BrowserMobile)) {
			$(".img_grayscale").css("left", ((($(".img_grayscale").parent().parent().parent().width()) - $(".img_grayscale").width()) / 2));
		} else {
			$(".img_grayscale").css("left", ((($(".img_grayscale").parent().parent().width()) - $(".img_grayscale").width()) / 2));
		}
	} else {
		$(".img_grayscale").css("width", "100%");
		$(".img_grayscale").css("height", "auto");
		$(".img_grayscale").css("left", "0");
		if ((BrowserUserNotIE && !BrowserMobile)) {
			$(".img_grayscale").css("top", (($(".img_grayscale").parent().parent().parent().height() - $(".img_grayscale").height()) / 2));
		} else {
			$(".img_grayscale").css("top", (($(".img_grayscale").parent().parent().height() - $(".img_grayscale").height()) / 2));
		}
	}
	var total_img = $(".img_grayscale_cat").size();
	var comparacao = 1.5625;
	if (total_img == 2) {
		comparacao = 3.13;
	}
	if (proporcaoImagem < comparacao) {
		$(".img_grayscale_cat").css("height", "100%");
		$(".img_grayscale_cat").css("width", "auto");
		$(".img_grayscale_cat").css("top", "0");
		$(".img_grayscale_cat").css("left", ((($(".img_grayscale_cat").parent().width()) - $(".img_grayscale_cat").width()) / 2));
	} else {
		$(".img_grayscale_cat").css("width", "100%");
		$(".img_grayscale_cat").css("height", "auto");
		$(".img_grayscale_cat").css("left", "0");
		$(".img_grayscale_cat").css("top", (($(".img_grayscale_cat").parent().height() - $(".img_grayscale_cat").height()) / 2));
	}

}

(function(b) {
	b.support.touch = "ontouchend" in document;
	if (!b.support.touch) {
		return;
	}
	var c = b.ui.mouse.prototype,
		e = c._mouseInit,
		a;

	function d(g, h) {
		if (g.originalEvent.touches.length > 1) {
			return;
		}
		g.preventDefault();
		var i = g.originalEvent.changedTouches[0],
			f = document.createEvent("MouseEvents");
		f.initMouseEvent(h, true, true, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, false, false, false, false, 0, null);
		g.target.dispatchEvent(f);
	}
	c._touchStart = function(g) {
		var f = this;
		if (a || !f._mouseCapture(g.originalEvent.changedTouches[0])) {
			return;
		}
		a = true;
		f._touchMoved = false;
		d(g, "mouseover");
		d(g, "mousemove");
		d(g, "mousedown");
	};
	c._touchMove = function(f) {
		if (!a) {
			return;
		}
		this._touchMoved = true;
		d(f, "mousemove");
	};
	c._touchEnd = function(f) {
		if (!a) {
			return;
		}
		d(f, "mouseup");
		d(f, "mouseout");
		if (!this._touchMoved) {
			d(f, "click");
		}
		a = false;
	};
	c._mouseInit = function() {
		var f = this;
		f.element.bind("touchstart", b.proxy(f, "_touchStart")).bind("touchmove", b.proxy(f, "_touchMove")).bind("touchend", b.proxy(f, "_touchEnd"));
		e.call(f);
	};
})(jQuery);

$(window).load(function() {
	// clone image
	if (BrowserUserNotIE && !BrowserMobile) {
		$('.item img').each(function() {
			var $this = $(this);
			$(this).parent().css({
				"width": $this.width,
				"height": $this.height
			});
		});
		// Fade im
		$('.item').mouseover(function(evt) {
			$(this).find('img:odd').stop().animate({
				opacity: 0
			}, 1000);
		})
		$('.item').mouseout(function() {
			$(this).find('img:odd').stop().animate({
				opacity: 1
			}, 1000);
		});
	}
	resized();
	$(window).resize(function() {
		resized();
	});
	recolheBarraInicial();
	var cancelar = "p";
	if (BrowserMobile) {
		cancelar = "__p__p__p__";
	}
	$("#conteudo").draggable({
		axis: "x",
		cancel: cancelar,
		start: function(event, ui) {
			dragIni = $(this).position().left
		},
		stop: function(event, ui) {
			if (dragIni < ($(this).position().left - 2)) {
				if (posLeft < 0) {
					posLeft = posLeft + 1;
				}
			} else if (dragIni > ($(this).position().left + 2)) {
				if (posLeft > -4) {
					posLeft = posLeft - 1;
				}
			}
			btAjustarHash = true;
			marcaMenu(posLeft * -1);
			resizedAnimado();
		}
	});
	var dataScroll = 0;
	$(document).bind('mousewheel', function(event, delta) {
		if ((new Date().getTime() - dataScroll) > 500 && wheel) {
			if (delta > 0) {
				if (posLeft < 0) {
					posLeft = posLeft + 1;
				}
			} else {
				if (posLeft > -4) {
					posLeft = posLeft - 1;
				}
			}
			btAjustarHash = true;
			resizedAnimado();
			marcaMenu(posLeft * -1);
			dataScroll = new Date().getTime();
		}
		return false;
	});

});

function recolheBarraInicial() {
	$('#barraBranca').css('min-width', '0');
	$('#imgFundo1').css("left", "-10%");
	$('#infoTeclado').delay(2000).fadeOut(300);
	$('#logo').delay(2000).fadeOut(300, function() {
		$('#imgFundo1').css("left", "10%");
		wheel = true;
		$("#fundo").stop().animate({
			paddingLeft: 0
		}, 500, function() {});
		$("#conteudo").stop().animate({
			paddingLeft: 0
		}, 500, function() {});
		$('#setaBranca').removeClass("setaBrancaG").addClass("setaBrancaP");
		$('#barraBranca').stop().animate({
			width: 235
		}, 600, function() {
			$("#loading").css("display", "none");
			$("#loadingImg").css("display", "none");
			$("body").keydown(function(e) {
				if (e.keyCode == 37) { // left	
					if (posLeft < 0) {
						posLeft = posLeft + 1;
						btAjustarHash = true;
						marcaMenu(posLeft * -1);
						resizedAnimado();
					} else {
						return false;
					}
				} else if (e.keyCode == 39) { // right	
					if (posLeft > -4) {
						posLeft = posLeft - 1;
						btAjustarHash = true;
						marcaMenu(posLeft * -1);
						resizedAnimado();
					} else {
						return false;
					}
				}
			});

			$('#barraBranca').css({
				overflow: 'visible'
			});
			$('#menu').fadeIn();
			$('#logo-menor').css("display", "block");
			$('#logo-menor').css("opacity", 1);
			ajustaImagens();
			if (!BrowserMobile) {
				$("#barraBranca").hover(function() {
					menuAberto = 200;
					resizedAnimado();
					$('#barraBranca').stop().animate({
						width: 235
					}, 600, function() {
						$('#barraBranca').css({
							overflow: 'visible'
						});
						ajustaImagens();
						$('#logo-menor').css("opacity", 1);
						$('#logo-menor').css("display", "block");
					});
					$('#menu').stop().animate({
						width: 220
					}, 400, function() {
						$('#menu').css("opacity", 1);
					});
				}, function() {
					menuAberto = 0;
					resizedAnimado();
					$('#menu').stop().animate({
						width: 6
					}, 600);
					$('#barraBranca').stop().delay(50).animate({
						width: 35
					}, 600, function() {
						$('#barraBranca').css({
							overflow: 'visible'
						});
						ajustaImagens();
						$('#logo-menor').css("opacity", 0);
						$('#logo-menor').css("display", "none");
					})
				});
			} else {
				$("#barraBranca").click(function() {
					if (menuAberto < 100) {
						menuAberto = 230;
						resizedAnimado();
						$('#barraBranca').stop().animate({
							width: 235
						}, 600, function() {
							$('#barraBranca').css({
								overflow: 'visible'
							});
							ajustaImagens();
							$('#logo-menor').css("opacity", 1);
							$('#logo-menor').css("display", "block");
						});
						$('#menu').stop().animate({
							width: 220
						}, 400, function() {
							$('#menu').css("opacity", 1);
						});
					} else {
						menuAberto = 0;
						resizedAnimado();
						$('#menu').stop().animate({
							width: 6
						}, 600);
						$('#barraBranca').stop().delay(50).animate({
							width: 35
						}, 600, function() {
							$('#barraBranca').css({
								overflow: 'visible'
							});
							ajustaImagens();
							$('#logo-menor').css("opacity", 0);
							$('#logo-menor').css("display", "none");
						})
					}
				});
			}

		});
	});
	if (!BrowserMobile) {
		$('.categoria_1,.categoria_2,.categoria_3,.categoria_4').find(".setaVerdeProjetoPeq").stop().fadeOut();
		$('.categoria_1,.categoria_2,.categoria_3,.categoria_4').hover(function() {
			$("." + $(this).attr('class')).find(".setaVerdeProjeto").find(".setaVerdeConteudo").stop().animate({
				"padding-left": 120
			}, 200, function() {});
			$(this).find(".setaVerdeProjetoPeq").stop().fadeIn(600, function() {
				$(this).css({
					opacity: 1
				});
			});
		}, function() {
			$("." + $(this).attr('class')).find(".setaVerdeProjeto").find(".setaVerdeConteudo").stop().animate({
				"padding-left": 70
			}, 200, function() {});
			$(this).find(".setaVerdeProjetoPeq").stop().fadeOut(600);
		});
		$('.setaVerdeProjeto').hover(function() {
			var classe = $(this).parent().parent().attr('class');
			$("." + classe).find(".item").find(".setaVerdeProjetoPeq").fadeIn();
			$("." + classe).find('img:last').stop().animate({
				opacity: 0
			}, 600);
		}, function() {
			var classe = $(this).parent().parent().attr('class');
			$("." + classe).find(".item").find(".setaVerdeProjetoPeq").fadeOut();
			$("." + classe).find('img:last').stop().animate({
				opacity: 1
			}, 600);
		});
	}

}



function inicializaSlider() {
	if (proporcao < 1.5625) {
		$("." + classImgFundoAtual).css("height", "auto");
		$("." + classImgFundoAtual).css("width", ($(window).width() - 40));
		$("." + classImgFundoAtual).css("left", "0");
		$("." + classImgFundoAtual).css("top", (($(window).height() - $("." + classImgFundoAtual).height()) / 2));
	} else {
		$("." + classImgFundoAtual).css("height", ($(window).height()));
		$("." + classImgFundoAtual).css("width", "auto");
		$("." + classImgFundoAtual).css("top", "0");
		$("." + classImgFundoAtual).css("left", ((($(window).width() - 40) - $("." + classImgFundoAtual).width()) / 2));
	}
	imgProx = 0;
	imgAnt = $('.' + classImgFundoAtual).length;
	direcao = 1;
	trocaImagem();
}

function anterior() {
	direcao = -1;
	trocaImagem();
}

function proxima() {
	direcao = 1;
	trocaImagem();
}

function trocaImagem() {
	clearTimeout(tFundo);
	imgProx = imgProx + direcao;
	if (imgProx >= $('.' + classImgFundoAtual).length) {
		imgProx = 0;
	}
	if (imgProx < 0) {
		imgProx = $('.' + classImgFundoAtual).length - 1;
	}
	$('.' + classImgFundoAtual).eq(imgAnt).fadeOut(1200);
	$('.' + classImgFundoAtual).eq(imgProx).fadeIn(1200, function() {
		$(this).css({
			opacity: 1
		})
	});
	imgAnt = imgProx;

	if ($('.' + classImgFundoAtual).length > 1) {
		tFundo = setTimeout("trocaImagem()", 8000);
	}

}



$("li[id^=_s_]").click(function() {
	/*$("#loading").css("display","none");
	$("#loadingImg").css("display","none");*/
	if(!fourDivs) return;
	var index = Math.ceil(($(this).index() + 1) / 3);
	var $temp = $("#ceil_" + index).clone()
				.css({
					"padding-left": 0,
					"left": 0,
					"cursor": "pointer",
					"z-index": 200
				});
	var text = ["焯欧天猫商城", "录影机广告", "录像机影视", "室内3D效果"];
	$temp.on("click", function(){
		$("#skyking").fadeOut(600 ,function(){
			$(".setaVerdeProjeto", $(this)).remove();
			$("img", $(this)).remove();
		});
	});

	$("#skyking").css({
		"display": "block",
		"background": "white"
	}).append($temp);

	$("#skyking .setaVerdeConteudo").eq(0).text(text[index - 1]);
	$("#skyking .setaVerdeConteudo").eq(1).css("padding-left", 120);

	$("#skyking").append("<img src=./images/" + index + ".jpg />").hide().fadeIn(600);
	fourDivs = false;
});

$("#fourDivs div").on('click', function(evt){
	abreConteudo(-2);
	fourDivs = true;
	var index = Number($(this).attr("data-num")) - 1;
	setTimeout(function(){
		$("#skyking").fadeOut(600 ,function(){
			$(".setaVerdeProjeto", $(this)).remove();
			$("img", $(this)).remove();
			$("li[id^=_s_]").eq(index * 3).trigger("click");
		});
	}, 200);
})