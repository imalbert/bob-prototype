var game;

Meteor.startup(function () {

	game = new Phaser.Game(640, 480, Phaser.AUTO);

	game.state.add('prototype', BobPrototype, true);

});

var BobPrototype = function () {

	this.bob = null;
	this.cursors = null;
	this.jumpTimer = 0;

}

BobPrototype.prototype = {

	init: function () {

		this.physics.startSystem(Phaser.Physics.ARCADE);

		this.physics.arcade.gravity.y = 1000;

		console.log(game.physics);

	},

	preload: function () {

		this.load.spritesheet('bob', 'bobs.png', 48, 48);

	},

	create: function () {

		this.bob = this.add.sprite(320, 1, 'bob');

		this.physics.arcade.enable(this.bob);

		this.bob.body.collideWorldBounds = true;

		this.bob.body.bounce.y = 0.4;

		this.bob.animations.add('glow', [0, 1, 2, 3, 4, 5, 6], 15, true);
		this.bob.animations.add('lessGlow', [2, 3, 4], 10, true);

		this.cursors = this.input.keyboard.createCursorKeys();

	},

	update: function () {
		
		this.bob.body.velocity.x = 0;

		if (this.cursors.left.isDown) {

			this.bob.play('lessGlow');
			this.bob.body.velocity.x = -200;

		} else if (this.cursors.right.isDown) {

			this.bob.play('lessGlow');
			this.bob.body.velocity.x = 200;

		} else {

			this.bob.play('glow');

		}

		if (this.cursors.up.isDown && this.time.time > this.jumpTimer) {
        this.bob.body.velocity.y = -500;
        //this.jumpTimer = this.time.time + 750;
    }

	}

};
