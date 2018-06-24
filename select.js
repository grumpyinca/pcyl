"use strict";
/**
 * SELECT command - select design from catalog; fix a standard value (size) for
 * a design parameter
 */

//SELECT: procedure(p);
function select(split_line) {

    console.log('SELECT:');
    console.log('  The SELECT command is not yet implemented.');

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
    // 
    // 
    // if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
    // put skip list('SELECT:');
    // if op(2) = '' then do;
    //    put skip edit
    //    ('ENTER NAME OF THE INDEPENDENT VARIABLE TO BE SELECTED, OR',
    //     '"CATALOG  < catalog_name >"  TO SELECT FROM A CATALOG : ')
    //    (a, skip);
    //    call readit(op,len1);
    //    if len1(1) = 0 then return;
    //    end;
    // else call pop;
    // 
    // if op(1) = substr(catalog,kone,len1(1)) then do;
    //    call selctlg(p);
    //    return;
    //    end;
    // 
    // nnp=0;
    // do i=1 to n;
    //    if op(1) = substr(parm_name(i),kone,len1(1)) then do;
    //       nnp=i;
    //       call seltabl(nnp,p,oldnum,midnum,hinum);
    //       go to matchd;
    //       end;
    // end;
    // put skip list(op(1), ' ? ?');
    // go to instrt;
    // 
    // MATCHD:
    // if hinum <= 0.0 then
    //     do;
    //     put skip list
    //     ('NO SELECTIONS ARE AVAILABLE FOR ', parm_name(nnp));
    //     go to instrt;
    //     end;
    // 
    // if ioopt > 2 then put skip edit
    //     ('THE CURRENT VALUE OF ', parm_name(nnp), ' IS',
    //      p(nnp), ' ', parm_unit(nnp), '.')
    //     (a, a, a, f(8,4), a, a, a);
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
    // call readit(op,len1);
    // if op(1) = '' | op(1)= '0' then go to nsm;
    // if op(1) = '1' then do;
    //    p(nnp) = oldnum;
    //    go to set;
    //    end;
    // if op(1) = '2' then do;
    //    p(nnp) = midnum;
    //    go to set;
    //    end;
    // if op(1) = '3' then do;
    //    p(nnp) = hinum;
    //    go to set;
    //    end;
    // NSM:
    // if ioopt > 2 then put skip list('NO SELECTION MADE.');
    // go to instrt;
    // 
    // SET:
    // lmin(nnp) = FIXEDSTAT;
    // lmax(nnp) = FIXEDSTAT;
    // cmin(nnp) = p(nnp);
    // cmax(nnp) = p(nnp);
    // put skip edit
    //     (parm_name(nnp), ' FIXED AT ', p(nnp), ' ', parm_unit(nnp))
    //     (a, a, f(8,4), a, a);
    // 
    // INSTRT:
    // end select;
}

module.exports = select;
