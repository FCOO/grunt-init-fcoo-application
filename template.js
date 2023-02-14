/*
 * grunt-init-fcoo-application
 * https://gruntjs.com/
 *
 */

'use strict';

// Basic template description.
exports.description = 'Create a FCOO repository for a application';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'Please wait...';//'Please enter following information:';


// Template-specific notes to be displayed after question prompts.
exports.after =
    '*******************************************\n' +
    'FINISH :-)\n' +
    '>You can now use the following cmd\n' +
    '>grunt check\n' +
    '>grunt dev\n' +
    '>grunt build\n' +
    '*******************************************\n' +
    '';



// Any existing file or directory matching this wildcard will cause a warning : All files are moved into .ORIGINAL
exports.warnOn = 'NOT';

// The actual init template.
exports.template = function(grunt, init, done) {

    function moveToORIGINAL(path, originalPath){
        var list = grunt.file.expand({'cwd': path, expand: false, 'src':['*.*', '**']}, '**');
        for (var i=0; i<list.length; i++ ){
            if (list[i]){
                var fileNames = list[i].split('/');
                if (fileNames.length == 1){
                    var fileName = fileNames[0],
                            newPath = path + '/' + fileName,
                            newOriginalPath = originalPath + '/' + fileName;

                    if (grunt.file.isDir( newPath )){
                        grunt.file.mkdir( newOriginalPath );
                      moveToORIGINAL( newPath, newOriginalPath );
                        grunt.file.delete( newPath );
                    }
                    else {
                        grunt.file.copy( newPath, newOriginalPath );
                        grunt.file.delete( newPath );
                    }
                }
            }
        }
    }

    var deleteList = ['temp', 'node_modules', 'bower_components', '.ORIGINAL'];
    for (var i=0; i<deleteList.length; i++ )
        if (grunt.file.isDir( deleteList[i] ))
            grunt.file.delete( deleteList[i] );


    grunt.file.mkdir('.ORIGINAL');
    moveToORIGINAL('.', '.ORIGINAL');

    // Clone github/fcoo/gruntfile.js into /temp
    grunt.util.spawn(
        {
            cmd: "git",
            args: ["clone", "https://github.com/fcoo/fcoo-gruntfile.js", "./temp"],
            opts: {
                cwd: init.destpath(),
                stdio: "inherit"
            }
        },
        function(error, result, code) {
            grunt.log.writeln('\nPlease enter following information:');
            init.process(
                {type: 'jquery'},
                [
                    init.prompt('name'),

                    init.prompt('description (from README.md)'),
/*
                    init.prompt('github_user'),
                    init.prompt('version'),
                    init.prompt('repository'),
                    init.prompt('homepage'),
*/
                    init.prompt('author_name'),

                    init.prompt('author_email'),
                ],

                function(err, props) {
                    //Add default values
                    props.licenses = ['MIT'];
                    props.year = (new Date()).getFullYear();

                    props.is_application = 'true';
                    props.have_ghpages = 'false';

                    // Files to copy (and process).
                    var files = init.filesToCopy(props);

                    //Add properly-named license files.
                    init.addLicenseFiles(files, props.licenses);

                    //Add package.json and all .*rc from fcoo-gruntfile.js to files
                    var fileList = ['package.json', '.browserslistrc', '.eslintrc', '.uglifyrc', '.yarnrc', '.bowerrc', '.gitignore'];
                    for (var i=0; i<fileList.length; i++ )
                        files[ fileList[i] ] = init.destpath() + '/temp/' + fileList[i];

                    // Actually copy (and process) files.
                    init.copyAndProcess(files, props);


                    // Run "npm install" and "grunt dev" in project's directory
                    grunt.log.writeln('Install node-packages...');
                    grunt.util.spawn(
                        {
                            cmd: "yarn",
                            args: ["--force"],
                            opts: {
                                cwd: init.destpath(),
                                stdio: "inherit"
                            }
                        },
                        function(error, result, code) {
                            grunt.log.writeln('DONE! Now run "bower update; grunt dev');
                            done();
                        }
                    );

                } //end of function(err, props) {
            ); //end of init.process(...
        } //end of function(error, result, code)
    ); //end of grunt.util.spawn(
}; //end of exports.template = function(grunt, init, done) {













