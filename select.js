"use strict";
/**
 * SELECT command - select design from catalog; fix a standard value (size) for
 * a design parameter
 */
var selctlg = require("./selctlg");
var seltabl = require("./seltabl");
var sprintf = require("sprintf-js").sprintf;

//SELECT: procedure(p);
function select(split_line) {
    // %include 'maxdims.inc';
    // declare (
    //      p(nmax) float
    //     );
    // 
    // /********************************************************************/
    // /*  select a specific design or component from an
    //     external table or data base                     */
    // /********************************************************************/
    // 
    // %include 'symbols.inc';
    // %include 'state.inc';
    // %include 'control.inc';
    // %include 'names.inc';
    // %include 'constant.inc';
    // %include 'scratch.inc';
    // 
    // declare
    //    pop  entry,
    //    readit   entry((ncargs)character(32) varying, (ncargs)fixed),
    //    selctlg  entry((nmax)float),
    //    seltabl  entry(fixed, (nmax)float, float, float, float)
    //    ;
    // 
    // 
    // declare
    //      catalog character(7) static initial('CATALOG'),
    //     (oldnum, midnum, hinum) float,
    //     (i, nnp) fixed
    //    ;
    var catalog = 'CATALOG';
    // 
    // 
    var name = split_line.shift();
    // if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
    // put skip list('SELECT:');
    console.log('SELECT:');
    // if op(2) = '' then do;
    //    put skip edit
    //    ('ENTER NAME OF THE INDEPENDENT VARIABLE TO BE SELECTED, OR',
    //     '"CATALOG  < catalog_name >"  TO SELECT FROM A CATALOG : ')
    //    (a, skip);
    if (name === undefined) {
        console.log('ENTER NAME OF THE INDEPENDENT VARIABLE TO BE SELECTED, OR');
        console.log('"CATALOG  < catalog_name >"  TO SELECT FROM A CATALOG : ')
        //    call readit(op,len1); // TODO: Add in prompt?
        var choice = undefined;
        //    if len1(1) = 0 then return;
        if (choice === undefined)
            return;
        //    end;
    }
    // else call pop;
    // 
    // if op(1) = substr(catalog,kone,len1(1)) then do;
    if (catalog.startsWith(name)) {
        selctlg();
        return;
        //    call selctlg(p);
        //    return;
        //    end;
    }
    // 
    // nnp=0;
    // do i=1 to n;
    //    if op(1) = substr(parm_name(i),kone,len1(1)) then do;
    for (let i = 0; i < design.design_parameters.length; i++) {
        var dp = design.design_parameters[i];
        //       nnp=i;
        //       call seltabl(nnp,p,oldnum,midnum,hinum);
        var result = seltabl(dp);
        // MATCHD:
        // if hinum <= 0.0 then
        if (result.hinum <= 0.0) {
            //     do;
            //     put skip list
            //     ('NO SELECTIONS ARE AVAILABLE FOR ', parm_name(nnp));
            console.log(sprintf('NO SELECTIONS ARE AVAILABLE FOR %s', dp.name));
            //     go to instrt;
            return;
            //     end;
        }
        // 
        // if ioopt > 2 then put skip edit
        //     ('THE CURRENT VALUE OF ', parm_name(nnp), ' IS',
        //      p(nnp), ' ', parm_unit(nnp), '.')
        //     (a, a, a, f(8,4), a, a, a);
        if (IOOPT > 2) {
            console.log(sprintf('THE CURRENT VALUE OF %s IS%8.4f %s.', dp.name, dp.value, dp.units));
        }
        // put skip(2) edit
        //     ('THE NEAREST AVAILABLE SELECTIONS FOR ', parm_name(nnp), ' ARE:',
        //      '<enter> OR  0  FOR  NO SELECTION',
        //          '1  FOR', oldnum, parm_unit(nnp),
        //          '2  FOR', midnum, parm_unit(nnp),
        //          '3  FOR', hinum,  parm_unit(nnp),
        //      'ENTER THE NUMBER (1-3) CORRESPONDING TO YOUR SELECTION.',
        //      '(DEFAULT IS NO SELECTION)', ': ')
        //     (a, a, a, skip, col(9), a, skip, 3(col(21), a, f(8,4), x(2), a),
        //      skip(2), a, skip, a, col(55), a);
        console.log(sprintf('THE NEAREST AVAILABLE SELECTIONS FOR %s ARE:', dp.name));
        console.log('        <enter> OR  0  FOR  NO SELECTION');
        console.log('                    1  FOR %%8.4f  %s', result.oldnum, dp.units);
        console.log('                    2  FOR %%8.4f  %s', result.midnum, dp.units);
        console.log('                    3  FOR %%8.4f  %s', result.hinum, dp.units);
        console.log('ENTER THE NUMBER (1-3) CORRESPONDING TO YOUR SELECTION.');
        console.log('(DEFAULT IS NO SELECTION)                             : ');
        // call readit(op,len1);
        // if op(1) = '' | op(1)= '0' then go to nsm;
        // if op(1) = '1' then do;
        if (choice == '1') {
            //    p(nnp) = oldnum;
            dp.value = result.oldnum;
            //    go to set;
            //    end;
            // if op(1) = '2' then do;
        } else if (choice == '2') {
            //    p(nnp) = midnum;
            dp.value = result.midnum;
            //    go to set;
            //    end;
            // if op(1) = '3' then do;
        } else if (choice == '3') {
            //    p(nnp) = hinum;
            dp.value = result.hinum;
            //    go to set;
            //    end;
        } else {
            // NSM:
            // if ioopt > 2 then put skip list('NO SELECTION MADE.');
            if (IOOPT > 2)
                console.log('NO SELECTION MADE.');
            // go to instrt;
            return;
        }
        // 
        // SET:
        // lmin(nnp) = FIXEDSTAT;
        dp.lmin = FIXEDSTAT;
        // lmax(nnp) = FIXEDSTAT;
        dp.lmax = FIXEDSTAT;
        // cmin(nnp) = p(nnp);
        dp.cmin = dp.value;
        // cmax(nnp) = p(nnp);
        dp.cmax = dp.value;
        // put skip edit
        //     (parm_name(nnp), ' FIXED AT ', p(nnp), ' ', parm_unit(nnp))
        //     (a, a, f(8,4), a, a);
        console.log(sprintf('%s FIXED AT %8.4f %s', dp.name, dp.value, dp.units));
        //       end;
        // end;
    }
    // put skip list(op(1), ' ? ?');
    console.log(catalog + ' ? ?');
    // go to instrt;
    // 
    // 
    // INSTRT:
    // end select;
}

module.exports = select;
