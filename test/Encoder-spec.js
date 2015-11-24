
function pinMode() {

}


describe( "greeter", function () {
    it( "should greet with message", function () {

        var step = 0;
        var Encoder = require( "../lib/Encoder.js" );
        Encoder.connect();

        var A5 = 10; // todo
        var A6 = 12; // todo

        //var encoder = new Encoder();
        //var encoder = new Encoder( A5, A6, function ( direction ) {
        //    step += direction;
        //    console.log( "Step = " + step );
        //);

        expect( encoder.last ).toBe( 12 );

        //var a = 122;
        //expect( a + 1 ).toBe( 124 );
        //var greeter = new Greeter('friend');
        //expect(greeter.greet()).toBe('Bonjour, friend!');
    } );
} );
