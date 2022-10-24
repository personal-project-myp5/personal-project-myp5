game.HUD = game.HUD || {};

game.HUD.Container = me.Container.extend({
    init: function() {
        this._super(me.Container, 'init');
        this.isPersistent = true;

        this.collidable = false;

        this.z = Infinity;

        this.name = "HUD";

        this.addChild(new game.HUD.ScoreItem(5, 5));
    }
});


game.HUD.ScoreItem = me.Renderable.extend({
    init: function(x, y) {
        this._super(me.Renderable, "init", [x, y, 10, 10]);

        this.stepsFont = new me.Font('gamefont', 80, '#000', 'center');

        this.floating = true;
    },

    draw: function (renderer) {
        if (game.data.start && me.state.isCurrent(me.state.PLAY))
            this.stepsFont.draw(renderer, game.data.steps, me.game.viewport.width/2, 10);
    }

});

var BackgroundLayer = me.ImageLayer.extend({
    init: function(image, z, speed) {
        var settings = {};
        settings.name = image;
        settings.width = 900;
        settings.height = 600;
        settings.image = image;
        settings.z = z;
        settings.ratio = 1;
        this._super(me.ImageLayer, 'init', [0, 0, settings]);
    },

    update: function() {
        if (me.input.isKeyPressed('mute')) {
            game.data.muted = !game.data.muted;
            if (game.data.muted){
                me.audio.disable();
            }else{
                me.audio.enable();
            }
        }
        return true;
    }
});
