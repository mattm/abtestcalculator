define( [ './normal-distribution' ], function( NormalDistribution ) {

	// See: http://mathworld.wolfram.com/NormalDifferenceDistribution.html
	function NormalDifferenceDistribution( proportionA, proportionB ) {
		var mean = proportionB.mean - proportionA.mean;
		var sd = Math.sqrt( proportionA.variance + proportionB.variance );
		NormalDistribution.call( this, mean, sd );
	}

	NormalDifferenceDistribution.prototype = Object.create( NormalDistribution.prototype );
	NormalDifferenceDistribution.prototype.constructor = NormalDifferenceDistribution;

	return NormalDifferenceDistribution;
} );