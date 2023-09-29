/***********************************************
gruntfile.js for {%= name %}

https://github.com/FCOO/{%= name %}

***********************************************/

module.exports = function(grunt) {

    "use strict";

    //***********************************************
    grunt.initConfig({
        "fcoo_grunt_plugin":{
            default: {
                "application"   : {
                    "id"     : 0,           //application id. Default=0
                    "subpath": "MISSING",   //The sub-path where the application is located. Default="MISSING"
                    
                    Individual id:value can be added for specific application
                },

                "haveJavaScript": true,  //true if the application have js-files
                "haveStyleSheet": true,  //true if the application have css and/or scss-files

                "beforeProdCmd" : "",    //Cmd to be run at the start of prod-task. Multi cmd can be seperated by "&"
                "beforeDevCmd"  : "",    //Cmd to be run at the start of dev-task
                "afterProdCmd"  : "",    //Cmd to be run at the end of prod-task
                "afterDevCmd"   : "",    //Cmd to be run at the end of dev-task

                "DEBUG"         : false  //if true different debugging is on and the tempoary files are not deleted
            }
        }
    });


    //****************************************************************
    //Load grunt-packages
    grunt.loadNpmTasks('grunt-fcoo-grunt-plugin');
};
