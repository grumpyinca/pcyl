"use strict";
/**
 * SELECT command - select design from catalog; fix a standard value (size) for
 * a design parameter
 */
var selctlg = require("./selctlg");
var seltabl = require("./seltabl");
var sprintf = require("sprintf-js").sprintf;
function select(split_line) {
    /** ***************************************************************** */
    /*
     * select a specific design or component from an external table or data base
     */
    /** ***************************************************************** */
    var catalog = 'CATALOG';
    var name = split_line.shift();
    console.log('SELECT:');
    if (name === undefined) {
        console.log('ENTER NAME OF THE INDEPENDENT VARIABLE TO BE SELECTED, OR');
        console.log('"CATALOG  < catalog_name >"  TO SELECT FROM A CATALOG : ')
        var choice = undefined; //  TODO: Add in prompt?
        if (choice === undefined)
            return;
    }
    if (catalog.startsWith(name)) {
        selctlg();
        return;
    }
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        var result = seltabl(dp);
        if (result.hinum <= 0.0) {
            console.log(sprintf('NO SELECTIONS ARE AVAILABLE FOR %s', name));
            return;
        }
        if (IOOPT > 2) {
            console.log(sprintf('THE CURRENT VALUE OF %s IS%8.4f %s.', dp.name, dp.value, dp.units));
        }
        console.log(sprintf('THE NEAREST AVAILABLE SELECTIONS FOR %s ARE:', dp.name));
        console.log('        <enter> OR  0  FOR  NO SELECTION');
        console.log('                    1  FOR %%8.4f  %s', result.oldnum, dp.units);
        console.log('                    2  FOR %%8.4f  %s', result.midnum, dp.units);
        console.log('                    3  FOR %%8.4f  %s', result.hinum, dp.units);
        console.log('ENTER THE NUMBER (1-3) CORRESPONDING TO YOUR SELECTION.');
        console.log('(DEFAULT IS NO SELECTION)                             : ');
        var choice = ''; //  TODO: Add in prompt?
        if (choice == '1') {
            dp.value = result.oldnum;
        } else if (choice == '2') {
            dp.value = result.midnum;
        } else if (choice == '3') {
            dp.value = result.hinum;
        } else {
            if (IOOPT > 2)
                console.log('NO SELECTION MADE.');
            return;
        }
        dp.lmin = FIXEDSTAT;
        dp.lmax = FIXEDSTAT;
        dp.cmin = dp.value;
        dp.smin = sclden(dp.value, dp.cmin, dp.sdlim, SETSTAT);
        dp.cmax = dp.value;
        dp.smax = sclden(dp.value, dp.cmax, dp.sdlim, SETSTAT);
        console.log(sprintf('%s FIXED AT %8.4f %s', dp.name, dp.value, dp.units));
    }
    console.log(name + ' ? ?');
}
module.exports = select;
