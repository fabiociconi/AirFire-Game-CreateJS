(function () {

    window.game = window.game || {}

    function HealthBar() {
        this.initialize();
    }

   

    var p = HealthBar.prototype = new createjs.Container();
    p.width = 60;
    p.height = 20;
    p.fillColor = 'red';
    p.strokeColor = 'cyan';
    p.bar;

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.x = this.y = 5;
        this.buildBar();
        this.load();
    }

    p.buildBar = function () {

        var health = new createjs.Shape();
        health.graphics.beginStroke(this.strokeColor);
        health.graphics.drawRect(0, 0, this.width, this.height);
        this.bar = new createjs.Shape();
        this.bar.graphics.beginFill(this.fillColor);
        this.bar.graphics.drawRect(0, 0, this.width, this.height);
        this.bar.scaleX = 0;
        this.addChild(this.bar, health);

    }
    p.load = function (perc){
        perc = 1;
        createjs.Tween.get(this.bar).to({scaleX: perc},1000);
     
    }

    p.updateLife = function (perc) {
        perc = perc > 1 ? 1 : perc;
        this.bar.scaleX = perc;
    }
    window.game.HealthBar = HealthBar;

}());