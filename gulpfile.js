var gulp = require( 'gulp' );
var del = require( 'del' );

// Enhance gulp with help text for tasks
gulp = require( 'gulp-help' )( gulp, {description: "Shows this help info", aliases: ["default"]} );

// Autoloading gulp plugins from package.json
var $ = require( "gulp-load-plugins" )( {lazy: true} );

var config = {
    tsSource: ["src/**/*.ts"],
    tsDest: "lib"
};

gulp.task( "clean", "Cleans all generated files form lib folder", function ( cb ) {
    return del( [config.tsDest + "/**/*"], cb );
} );


var tsProject = $.typescript.createProject( {
    target: "ES3",
    noImplicitAny: false,
    declarationFiles: false,
    noExternalResolve: true
} );


gulp.task( "ts-compile", "transpiling TypeScript files", function () {
    log( "Transpiling TypeScript files" );

    return gulp.src( config.tsSource )
        .pipe( $.plumber() )
        .pipe( $.sourcemaps.init() )
        .pipe( $.typescript( tsProject ) )

        .pipe( $.sourcemaps.write( '.', {
            includeContent: false,
            //sourceRoot: function ( file ) {
            // Trick for working with breakpoints in IDEA/WebStorm.
            //return new Array( file.relative.split( "/" ).length ).join( "../" );
            //},
            debug: true
        } ) )

        .pipe( gulp.dest( config.tsDest ) );
} );

gulp.task( "ts-lint", "Analyze TypeScript code with TSLint", function () {
    log( "Analyzing *.ts-files with TSLint" );

    return gulp
        .src( config.tsSource )
        .pipe( $.tslint() )  // tslint.json und https://github.com/palantir/tslint
        .pipe( $.tslint.report( $.tslintStylish, {emitError: false} ) );
} );

gulp.task( "watch", "monitors *.ts files and recompiles if changed", ["ts-compile"], function () {
    gulp.watch( config.tsSource, ["ts-compile", "ts-lint"] );
} );


gulp.task( "build", "Compiles all TypeScript source files and updates module references", ["ts-lint", "ts-compile"] );

gulp.task( "test", 'Runs the Jasmine test specs', ['ts-compile'], function () {
    return gulp.src( 'test/*.js' )
        .pipe( $.jasmine() );
} );

//------------------------------------------------------------------------------------------------------------------
// Helper
//------------------------------------------------------------------------------------------------------------------

function log( msg ) {
    if (typeof(msg) === "object") {
        for (var item in msg) {
            if (msg.hasOwnProperty( item )) {
                $.util.log( $.util.colors.blue( msg[item] ) )
            }
        }
    } else {
        $.util.log( $.util.colors.blue( msg ) );
    }
}


