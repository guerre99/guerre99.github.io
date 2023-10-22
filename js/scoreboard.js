const ScoreBoard = {
	init: function (ctx) {
		this.ctx = ctx
	},

	update: function (score) {
		this.ctx.font = '30px Arial'
		this.ctx.fillStyle = 'White'
		this.ctx.fillText('Score: ' + Math.floor(score), 50, 50)
	},
}