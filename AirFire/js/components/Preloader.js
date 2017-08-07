(function () {
////
// Funcao que cria uma barra de load e atualiza a %
//
    window.ui = window.ui || {};

    var Preloader = function (fill, stroke) {
        this.fillColor = fill;
        this.strokeColor = stroke;
        this.initialize();
    }
    var p = Preloader.prototype = new createjs.Container();

    p.width = 400;
    p.height = 40;
    p.fillColor;
    p.strokeColor;
    p.bar;

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.addMessages();
        this.drawPreloader();
    }

    p.drawPreloader = function () {
        var outline = new createjs.Shape();
        outline.graphics.beginStroke(this.strokeColor);
        outline.graphics.drawRect(0, 0, this.width, this.height);
        this.bar = new createjs.Shape();
        this.bar.graphics.beginFill(this.fillColor);
        this.bar.graphics.drawRect(0, 0, this.width, this.height);
        this.bar.scaleX = 0;
        this.addChild(this.bar, outline);
    }

      p.addMessages = function () {

        this.msgTxt = new createjs.Text("Loading Contents", '24px Verdana', '#F00');
        
        this.addChild(this.msgTxt);
    }

    p.update = function (perc) {
        perc = perc > 1 ? 1 : perc;
        this.bar.scaleX = perc;
    }

    window.ui.Preloader = Preloader;

}());