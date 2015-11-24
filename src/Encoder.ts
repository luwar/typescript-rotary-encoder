declare let I2C: any;
declare let digitalRead: any;
declare let pinMode: any;
declare let setWatch: any;


class Encoder {

    last: number = 0;

    constructor( private pina: any, private pinb: any, private callback: any ) {

        // this.last = this.states[this.last]

        let onChange = () => {
            let a = digitalRead( this.pina );
            let b = digitalRead( this.pinb );

            this.last = (this.last << 2) | (a << 1) | b;

            console.log( "a = " + a + "   b = " + b );
            // console.log( "a = " + a + "   b = " + b + "  last = 0x" + this.last.toString(16));

            /*
             switch (this.last) {
             case 0x0: this.last = 0x0; break;
             case 0x1: this.last = 0x1; break;
             case 0x2: this.last = 0x2; break;
             case 0x3: this.last = 0x3; console.log( "Error 0x3" ); break;
             case 0x4: this.last = 0x0; callback( +1 ); break;
             case 0x5: this.last = 0x1; break;
             case 0x6: this.last = 0x2; console.log( "Error 0x6" ); break;
             case 0x7: this.last = 0x3; break;
             case 0x8: this.last = 0x0; callback( -1 ); break;
             case 0x9: this.last = 0x1; console.log( "Error 0x9" ); break;
             case 0xa: this.last = 0x2; break;
             case 0xb: this.last = 0x3; break;
             case 0xc: this.last = 0x0; console.log( "Error 0xc" ); break;
             case 0xd: this.last = 0x1; break;
             case 0xe: this.last = 0x2; break;
             case 0xf: this.last = 0x3; break;

             //case 0x10: this.last = 0x4; break;
             //case 0x11: this.last = 0x1; break;
             //case 0x12: this.last = 0x6; break;
             //case 0x13: this.last = 0x7; console.log( "Error 0x13" ); break;

             case 0x14: this.last = 0x0; break;
             case 0x15: this.last = 0x5; break;
             case 0x16: this.last = 0x6; console.log( "Error 0x16" ); break;
             case 0x17: this.last = 0x3; break;
             case 0x18: this.last = 0x0; break;
             case 0x19: this.last = 0x5; console.log( "Error 0x19" ); break;
             case 0x1a: this.last = 0x6; break;
             case 0x1b: this.last = 0x3; break;
             //case 0x1c: this.last = 0x4; callback( -1 ); console.log( "Error 0x1c" ); break;
             //case 0x1d: this.last = 0x5; break;
             //case 0x1e: this.last = 0x6; break;
             //case 0x1f: this.last = 0x7; break;

             default: {
             console.log( "Besonderer Error 0x" + this.last.toString(16) ); break;
             }
             }
             */
        };

        pinMode( pina, "input_pulldown" );
        pinMode( pinb, "input_pulldown" );

        let a = digitalRead( this.pina );
        let b = digitalRead( this.pinb );
        this.last = 0 | (a << 1) | b;

        console.log( "a = " + a + "   b = " + b );

        setWatch( onChange, pina, { repeat: true } );
        setWatch( onChange, pinb, { repeat: true } );
    }

}


declare let I2C1: any;
declare let A5: any;
declare let A6: any;
declare let exports: any;
//let step = 0;
//let encoder = new Encoder( A5, A6, function ( direction: number ) {
//    step += direction;
//    console.log( "Step = " + step );
//} );


exports.connect = function(pina, pinb, callback) {
    return new Encoder(pina, pinb, callback);
};
