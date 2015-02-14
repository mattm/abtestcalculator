'use strict';

/**
 * External dependencies
 */
var assert = require( 'assert' );

/**
 * Internal dependencies
 */
var Rectangle = require( '../js/graphs/rectangle' );

var testRectangle = new Rectangle( 100, 200, 50, 75 );

describe( 'rectangle', function() {
	it( 'should set all the props', function() {
		assert.equal( testRectangle.x, 100 );
		assert.equal( testRectangle.y, 200 );
		assert.equal( testRectangle.width, 50 );
		assert.equal( testRectangle.height, 75 );
		assert.equal( testRectangle.right, 150 );
		assert.equal( testRectangle.bottom, 275 );
	} );
} );
