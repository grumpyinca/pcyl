/**
 * CHANGE command - allows user to input changes to problem variables see SET
 * command for user input to internal variables and program control
 */

var count = require('./count');
var sclden = require('./sclden');

//  CHANGE: procedure(p);
function change(split_line) {
    //  
    //  %include 'maxdims.inc';
    //  %include 'symbols.inc';
    //  
    //  declare  p(nmax) float;
    //  
    //  %include 'state.inc';
    //  %include 'names.inc';
    //  %include 'control.inc';
    //  %include 'constant.inc';
    //  %include 'scratch.inc';
    //  
    //  declare
    //       contnt   entry(fixed,(nmax)float),
    //       count    entry,
    //       pop      entry,
    //       sclden   entry(float,float,float,fixed) returns(float)
    //      ;
    //  
    //  declare (
    //       i        fixed,
    //       j        fixed,
    //       im           fixed,
    //       lmm          fixed,
    //       call_flag    fixed,
    //       ctemp        float,
    //       dtemp        float,
    //       utemp        character(16) varying,
    //       minimum      character(8) static initial('MINIMUM '),
    //       maximum      character(8) static initial('MAXIMUM ')
    //      );
    var minimum = 'MINIMUM';
    var maximum = 'MAXIMUM';
    //  
    //  
    //  call pop;
    //  DNAME=OP(1);
    var name = split_line.shift();
    var minmax = split_line.shift();
    var value = split_line.shift();
    //  itemp=len1(1);
    //  
    //  if len1(1) = 0 | len1(2) = 0 then go to outmsg;
    if (name !== undefined && minmax !== undefined) {
    //  j=0;
        var found_minmax = false;
    //  if op(2) = substr(minimum,kone,len1(2)) then j=1;
        if (minimum.startsWith(minmax)) found_minmax = true;
    //  if op(2) = substr(maximum,kone,len1(2)) then j=2;
        if (maximum.startsWith(minmax)) found_minmax = true;
    //  if j > 0 then if len1(3) > 0 then go to setlevl;
        if (!found_minmax) {
            value = minmax;
    //                   else go to outmsg;
    //  
    //              /*
    //                  test for character string constant first,
    //                  then check for valid OP(2)
    //              */
    //  do i = 1 to lds;
            for (let c of constants) {
    //  if dname=substr(ds_name(i),kone,itemp) then
                if (c.name.startsWith(name)) {
    //       do;
    //       ds(i)=op(2);
                    c.value = value;
                    // TODO: Do we need to do this later?
    //       call_flag=0;       /*  update constants if necessary   */
    //       call contnt(call_flag,p);
    //                    /*  announce exceptions if necessary  */
    //       if ds(i) ^= op(2) then call contnt(3,p);
    //       if ioopt > 2 then put skip(2) edit
    //           (ds_NAME(I), ' CHANGED TO ', ds(I))
    //           (a);
                    console.log(c.name, ' CHANGED TO ', c.value);
    //       go to instrt;
                    return;
    //       end;
                }
    //  end;
            }
    //  
    //  if verify(op(2),'+-1234567890.') > 0 then go to outmsg;
            if (value.match(/^[-+]?[0-9]*\.?[0-9]*$/) !== null) {
    //  
    //  DO I=1 TO N;
                for (let dp of design_parameters) {
    //  IF DNAME=SUBSTR(PARM_NAME(I),KONE,itemp) THEN
                    if (dp.name.startsWith(name)) {
    //       DO;
    //       P(I)=op(2);
                            dp.value = value;
    //       if lmin(i) = FIXEDSTAT then
                        if (dp.lmin == FIXEDSTAT) {
    //     do;
    //     cmin(i)=p(i);
                            dp.cmin = value;
    //     cmax(i)=p(i);
                            dp.cmax = value;
    //     end;
                        }
    //       if ioopt > 2 & dname ^= parm_name(i) then PUT SKIP EDIT
    //           (PARM_NAME(I), ' CHANGED TO ', P(I), '   ', PARM_UNIT(I))
    //           (r(rfmt_cfm));
                        console.log(dp.name, ' CHANGED TO ', dp.value, '   ', dp.units);
    //       GO TO INSTRT;
                        return;
    //       END;
                    }
    //  END;
                }
    //  
    //  DO I=1 TO K;
                for (let sv of state_variables) {
    //  IF DNAME=SUBSTR(ST_VAR_NAME(I),KONE,itemp) THEN DO;
                    if (sv.name.startsWith(name)) {
    //       IM=I+n;
    //       Cmin(IM)=op(2);
                        sv.cmin = value;
    //       Cmax(IM)=cmin(im);
                        sv.cmax = value;
    //       if lmin(im) ^= FIXEDSTAT then
                        if (sv.lmin != FIXEDSTAT) {
    //     do;
    //     if ioopt > 2 then put skip edit
    //           (st_var_name(i), ' IS A DEPENDENT VARIABLE.',
    //            'REMEMBER THAT A SEARCH WILL BE REQUIRED TO ',
    //            'ESTABLISH THE DESIRED VALUE.')
    //           (2a, skip);
                            console.log(sv.name,' IS A DEPENDENT VARIABLE.','REMEMBER THAT A SEARCH WILL BE REQUIRED TO ','ESTABLISH THE DESIRED VALUE.');
    //     if ioopt >= 2 then put skip(2) edit
    //         (st_var_name(i), ' FIXED AT', cmin(im), '   ',
    //          st_var_unit(i))
    //         (2a, f(14,4), 2a);
                            console.log(sv.name, ' CHANGED TO ', sv.cmin, '   ', sv.units);
    //     lmin(im) = FIXEDSTAT;
                            sv.lmin = FIXEDSTAT;
    //     lmax(im) = FIXEDSTAT;
                            sv.lmax = FIXEDSTAT;
    //     call count;
                            count();
    //     end;
                        }
    //       Smin(IM)=sclden(x(i),cmin(im),sdlim(im),FIXEDSTAT);
                        sv.smin = sclden(sv.value, sv.cmin, sv.sdlim, FIXEDSTAT);
    //       Smax(IM)=smin(im);
                        sv.smax = sv.smin;
    //       GO TO INSTRT;
                        return;
    //       END;
                    }
    //  END;
                }
    //  
    //  do i = 1 to ldi;
    //  if dname=substr(di_name(i),kone,itemp) then
    //       do;
    //       di(i)=op(2);
    //       call_flag=0;         /*  update constants if necessary     */
    //       call contnt(call_flag,p);
    //                    /*  announce exceptions if necessary  */
    //       if di(i) ^= op(2) then call contnt(3,p);
    //       if ioopt > 2 then put skip(2) edit
    //           (di_NAME(I), ' CHANGED TO ', di(I), '   ', di_UNIT(I))
    //           (2a,f(4,0),2a);
    //       go to instrt;
    //       end;
    //  end;
    //  
    //  do i = 1 to ld;
    //  if dname=substr(dc_name(i),kone,itemp) then
    //       do;
    //       dtemp=op(2);
    //       d(i)=dtemp;
    //       call_flag=0;         /*  update constants if necessary     */
    //       call contnt(call_flag,p);
    //                    /*  announce exceptions if necessary  */
    //       if d(i) ^= dtemp then call contnt(3,p);
    //       if ioopt > 2 then put skip(2) edit
    //           (dc_NAME(I), ' CHANGED TO ', d(I), '   ', dc_UNIT(I))
    //           (r(rfmt_cfm));
    //       go to instrt;
    //       end;
    //  end;
    //  
    //  PUT SKIP(2) EDIT(DNAME, ' ? ?') (A);
                console.log(name, ' ? ?');
    //  go to outmsg;
            }
        } else {
            if (value !== undefined) {
    //  
    //  SETLEVL:
    //  lmm=0;
    //  do i=1 to n while(lmm=0);
    //  if op(3) = substr(parm_name(i),kone,len1(3)) then lmm=-i;
    //  end;
    //  
    //  do i=1 to k while(lmm=0);
    //  if op(3) = substr(st_var_name(i),kone,len1(3)) then lmm=-(i+n);
    //  end;
    //  
    //  do i=1 to ld while(lmm=0);
    //  if op(3) = substr(dc_name(i),kone,len1(3)) then lmm=-(i+m);
    //  end;
    //  
    //  if lmm = 0 & verify(op(3),'+-1234567890.') > 0 then go to outmsg;
                if (value.match(/^[-+]?[0-9]*\.?[0-9]*$/) !== null) {
    //  
    //  do i=1 to n;
                    for (let dp of design_parameters) {
    //  if dname = substr(parm_name(i),kone,itemp) then
                        if (dp.name.startsWith(name)) {
    //     do;
    //     ctemp=p(i);
                            var ctemp = dp.value;
    //     go to setparm;
                            //  SETPARM:
                            //  if i <= n then if op(1) ^= parm_name(i) then
                            //     do;
                            //     dname=parm_name(i);
                            //     utemp=parm_unit(i);
                            //     end;
                            //      else
                            //     do;
                            //     dname='';
                            //     utemp='';
                            //     end;
                            //  if lmin(i) = FIXEDSTAT then do;
                            if (dp.lmin == FIXEDSTAT) {
                            //     put skip list('WARNING ...  FIXED STATUS REPLACED.');
                                console.log('WARNING ...  FIXED STATUS REPLACED.');
                            //     lmin(i)=FREESTAT;
                                dp.lmin = FREESTAT;
                            //     lmax(i)=FREESTAT;
                                dp.lmax = FREESTAT;
                            //     end;
                            }
                            //  if j = 1 then do;
                            if (minimum.startsWith(minmax)) {
                            //       if lmm >= FREESTAT then do;
                            //         lmin(i)=SETSTAT;
                                dp.lmin = SETSTAT;
                            //         cmin(i)=op(3);
                                dp.cmin = value;
                            //         end;
                            //      else do; // TODO: DO for FDCL, skipping for right now
                            //         lmin(i)=lmm;
                            //         if lmin(i) < -m then cmin(i)= d(-lmin(i)-m);
                            //            else if lmin(i) < -n then cmin(i)=x(-lmin(i)-n);
                            //                     else cmin(i)=p(-lmin(i));
                            //         end;
                            //       smin(i)=sclden(ctemp,cmin(i),sdlim(i),lmin(i));
                               dp.smin = sclden(ctemp, dp.cmin, dp.sdlim, dp.lmin);
                            //       if ioopt > 2 & dname ^= '' then put skip(2) edit
                            //     (dname, ' MINIMUM CHANGED TO', cmin(i), '   ', utemp)
                            //     (r(rfmt_cfm));
                                            console.log(dp.name, ' MINIMUM CHANGED TO', dp.cmin, '   ', dp.units);
                            //       end;
                            }
                            //    else do;
                            else {
                            //       if lmm >= FREESTAT then do;
                            //         lmax(i)=SETSTAT;
                                dp.lmax = SETSTAT;
                            //         cmax(i)=op(3);
                                dp.cmax = value;
                            //         end;
                            //      else do; // TODO: DO for FDCL, skipping for right now
                            //         lmax(i)=lmm;
                            //         if lmax(i) < -m then cmax(i)= d(-lmax(i)-m);
                            //            else if lmax(i) < -n then cmax(i)=x(-lmax(i)-n);
                            //                     else cmax(i)=p(-lmax(i));
                            //         end;
                            //       smax(i)=sclden(ctemp,cmax(i),sdlim(i),lmin(i));
                                dp.smax = sclden(ctemp, dp.cmax, dp.sdlim, dp.lmax); // TODO: Changed lmin to lmax?
                            //       if ioopt > 2 & dname ^= '' then put skip(2) edit
                            //     (dname, ' MAXIMUM CHANGED TO', cmax(i), '   ', utemp)
                            //     (r(rfmt_cfm));
                                console.log(dp.name, ' MAXIMUM CHANGED TO', dp.cmax, '   ', dp.units);
                            //       end;
                            }
                            //  call count;
                            count();
                            //  go to instrt;
                            return;
    //     end;
                        }
    //  end;
                    }
    //  
    //  do i=1 to k;
                    for (let sv of state_variables) {
    //  if dname = substr(st_var_name(i),kone,itemp) then
                        if (sv.name.startsWith(name)) {
    //     do;
    //     ctemp=x(i);
                            var ctemp = sv.value;
    //     go to setvar;
                            //  SETVAR:
                            //  if op(1) ^= st_var_name(i) then
                            //     do;
                            //     dname=st_var_name(i);
                            //     utemp=st_var_unit(i);
                            //     end;
                            //      else
                            //     do;
                            //     dname='';
                            //     utemp='';
                            //     end;
                            //  i=i+n;
                            //  if lmin(i) = FIXEDSTAT then do;
                            if (sv.lmin == FIXEDSTAT) {
                            //     put skip list('WARNING ...  FIXED STATUS REPLACED.');
                                console.log('WARNING ...  FIXED STATUS REPLACED.');
                            //     lmin(i)=FREESTAT;
                                sv.lmin = FREESTAT;
                            //     lmax(i)=FREESTAT;
                                sv.lmax = FREESTAT;
                            //     end;
                            }
                            //  if j = 1 then do;
                            if (minimum.startsWith(minmax)) {
                            //       if lmm >= FREESTAT then do;
                            //         lmin(i)=SETSTAT;
                                sv.lmin = SETSTAT;
                            //         cmin(i)=op(3);
                                sv.cmin = value;
                            //         end;
                            //      else do; // TODO: DO for FDCL, skipping for right now
                            //         lmin(i)=lmm;
                            //         if lmin(i) < -m then cmin(i)= d(-lmin(i)-m);
                            //            else if lmin(i) < -n then cmin(i)=x(-lmin(i)-n);
                            //                     else cmin(i)=p(-lmin(i));
                            //         end;
                            //       smin(i)=sclden(ctemp,cmin(i),sdlim(i),lmin(i));
                                sv.smin = sclden(ctemp, sv.cmin, sv.sdlim, sv.lmin);
                            //       if ioopt > 2 & dname ^= '' then put skip(2) edit
                            //     (dname, ' MINIMUM CHANGED TO', cmin(i), '   ', utemp)
                            //     (r(rfmt_cfm));
                                console.log(sv.name, ' MINIMUM CHANGED TO', sv.cmin, '   ', sv.units);
                            //       end;
                            }
                            //    else do;
                            else {
                            //       if lmm >= FREESTAT then do;
                            //         lmax(i)=SETSTAT;
                                sv.lmax = SETSTAT;
                            //         cmax(i)=op(3);
                                sv.cmax = value;
                            //         end;
                            //      else do; // TODO: DO for FDCL, skipping for right now
                            //         lmax(i)=lmm;
                            //         if lmax(i) < -m then cmax(i)= d(-lmax(i)-m);
                            //            else if lmax(i) < -n then cmax(i)=x(-lmax(i)-n);
                            //                     else cmax(i)=p(-lmax(i));
                            //         end;
                            //       smax(i)=sclden(ctemp,cmax(i),sdlim(i),lmin(i));
                                sv.smax = sclden(ctemp, sv.cmax, sv.sdlim, sv.lmax); // TODO: Changed lmin to lmax?
                            //       if ioopt > 2 & dname ^= '' then put skip(2) edit
                            //     (dname, ' MAXIMUM CHANGED TO', cmax(i), '   ', utemp)
                            //     (r(rfmt_cfm));
                                console.log(sv.name, ' MAXIMUM CHANGED TO', sv.cmax, '   ', sv.units);
                            //       end;
                            }
                            //  call count;
                            count();
                            //  go to instrt;
                            return;
    //     end;
                        }
    //  end;
                    }
    //  
    //  put skip(2) edit(dname, ' ? ?') (a);
                    console.log(name, ' ? ?');
    //  go to outmsg;
                }
                
    //  
    //  SETVAR:
    //  if op(1) ^= st_var_name(i) then
    //     do;
    //     dname=st_var_name(i);
    //     utemp=st_var_unit(i);
    //     end;
    //      else
    //     do;
    //     dname='';
    //     utemp='';
    //     end;
    //  i=i+n;
    //  
    //  SETPARM:
    //  if i <= n then if op(1) ^= parm_name(i) then
    //     do;
    //     dname=parm_name(i);
    //     utemp=parm_unit(i);
    //     end;
    //      else
    //     do;
    //     dname='';
    //     utemp='';
    //     end;
    //  if lmin(i) = FIXEDSTAT then do;
    //     put skip list('WARNING ...  FIXED STATUS REPLACED.');
    //     lmin(i)=FREESTAT;
    //     lmax(i)=FREESTAT;
    //     end;
    //  if j = 1 then do;
    //       if lmm >= FREESTAT then do;
    //         lmin(i)=SETSTAT;
    //         cmin(i)=op(3);
    //         end;
    //      else do; // TODO: DO for FDCL, skipping for right now
    //         lmin(i)=lmm;
    //         if lmin(i) < -m then cmin(i)= d(-lmin(i)-m);
    //            else if lmin(i) < -n then cmin(i)=x(-lmin(i)-n);
    //                     else cmin(i)=p(-lmin(i));
    //         end;
    //       smin(i)=sclden(ctemp,cmin(i),sdlim(i),lmin(i));
    //       if ioopt > 2 & dname ^= '' then put skip(2) edit
    //     (dname, ' MINIMUM CHANGED TO', cmin(i), '   ', utemp)
    //     (r(rfmt_cfm));
    //       end;
    //    else do;
    //       if lmm >= FREESTAT then do;
    //         lmax(i)=SETSTAT;
    //         cmax(i)=op(3);
    //         end;
    //      else do; // TODO: DO for FDCL, skipping for right now
    //         lmax(i)=lmm;
    //         if lmax(i) < -m then cmax(i)= d(-lmax(i)-m);
    //            else if lmax(i) < -n then cmax(i)=x(-lmax(i)-n);
    //                     else cmax(i)=p(-lmax(i));
    //         end;
    //       smax(i)=sclden(ctemp,cmax(i),sdlim(i),lmin(i));
    //       if ioopt > 2 & dname ^= '' then put skip(2) edit
    //     (dname, ' MAXIMUM CHANGED TO', cmax(i), '   ', utemp)
    //     (r(rfmt_cfm));
    //       end;
    //  call count;
    //  go to instrt;
            }
        }
    //  
    }
    //  OUTMSG:
    //  put skip edit
    //      ('CHANGE ...',
    //       'SYNTAX:   CHANGE  NAME  VALUE',
    //       '    OR    CHANGE  NAME  [MIN | MAX]  VALUE',
    //       '    OR    CHANGE  NAME  [MIN | MAX]  NAME'
    //      )
    //      (a, skip);
        console.log('CHANGE ...');
        console.log('SYNTAX:   CHANGE  NAME  VALUE');
        console.log('    OR    CHANGE  NAME  [MIN | MAX]  VALUE');
        console.log('    OR    CHANGE  NAME  [MIN | MAX]  NAME');
    //  
    //  RFMT_CFM: format(2A, F(14,4), 2A);
    //  
    //  INSTRT:
    //  
    //  END CHANGE;
}

module.exports = change;
