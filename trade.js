"use strict";
/**
 * TRADE command - probe trade-offs associated with constraint violations when
 * no feasible solution is available
 */

//TRADE: procedure(p,obj);
function trade(split_line) {

    console.log('TRADE:');
    console.log('  The TRADE command is not yet implemented.')

    // 
    // %include 'maxdims.inc';
    // 
    // declare (p(nmax), obj) float;
    // 
    // %include 'symbols.inc';
    // %include 'state.inc';
    // %include 'names.inc';
    // %include 'control.inc';
    // %include 'search.inc';
    // %include 'constant.inc';
    // %include 'scratch.inc';
    // 
    // declare
    //      despak   entry ((nmax)float, float),
    //      readit   entry((ncargs)character(32) varying, (ncargs)fixed),
    //      pop      entry,
    //      reset    entry ((nmax)float),
    //      sclden   entry(float,float,float,fixed) returns(float),
    //      srch     entry ((nmax)float, float),
    //      update   entry ((nmax)float);
    // 
    // declare (
    //      i,
    //      j,
    //      im,
    //      nviol,
    //      ldir(mmax),
    //      VFLAG(mmax)
    //     ) fixed;
    // 
    // declare (
    //      DIR(mmax), C1, C2, C3, RK1, RK2, RK3, A, B, SMC,
    //      RK1AC, RK2AB, RK3BC, CAPA, CAPB, CAPC, ARG, C0,
    //      bigest, smalest
    //     ) float;
    // 
    // /*
    //   TRADE works with constant level constraints only.
    // 
    //   VFLAG contains the indices of the violated constraints. The sub-set
    //   of constraints indicated by vflag forms the "A" vector described in
    //   the thesis.
    // 
    //   Future work:  make a single routine to set a constraint level; let
    //   it worry about scaling denominators, etc.
    // */
    // 
    // TRADE:
    // if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
    // PUT SKIP LIST('TRADE: ');
    // 
    // TOP:
    // CALL DESPAK(P,OBJ);
    // CALL UPDATE(p);
    // NVIOL=0;
    // 
    // DO I=1 TO m;
    // if lmin(i) = SETSTAT & vmin(i) > 0.0 then
    //      do;
    //      NVIOL=NVIOL+1;
    //      VFLAG(NVIOL)=I;
    //      ldir(nviol)=-1;
    //      END;
    //   else if lmax(i) = SETSTAT & vmax(i) > 0.0 then
    //      do;
    //      NVIOL=NVIOL+1;
    //      VFLAG(NVIOL)=I;
    //      ldir(nviol)=+1;
    //      end;
    // END;
    // 
    // IF OBJ <= OBJMIN ! NVIOL=0 THEN DO;
    //      PUT SKIP(2) EDIT
    //     ('OBJ < OBJMIN - USE OF TRADE IS NOT APPROPRIATE.')
    //     (A);
    //      GO TO EXITT;
    //      END;
    // 
    // put skip(2) edit
    //    ('EXISTING CONSTRAINTS:')
    //    (a);
    // call clister;
    // call pop;
    // 
    // WHAT:
    // IF len1(1) = 0 THEN DO;
    //    PUT SKIP(2) EDIT
    //       (
    //    'SPECIFY YOUR TRADE STRATEGY ...  RELAX CONSTRAINTS:',
    //    '<enter>  OR  0  IN PROPORTION TO THEIR CURRENT VIOLATION',
    //    '1  IN AN ARBITRARY RATIO',
    //    '2  TO THE POINT OF THE EXISTING VIOLATIONS',
    //    '3  RETURN TO COMMAND LEVEL',
    //    ': '
    //       )
    //       (A, col(9), a, 3(col(22), a), skip, a);
    //    CALL READIT(op,len1);
    //    END;
    // 
    //                         /*  arbitrary ratio  */
    // IF OP(1)= '1' THEN
    //      DO I=1 TO NVIOL;
    //      J=VFLAG(I);
    //      len1(1)=0;
    // 
    //      do while(len1(1)=0);
    //      if j <= n then dname=parm_name(j);
    //        else dname=st_var_name(j-n);
    //      PUT SKIP EDIT
    //     ('WEIGHT FOR ', dname, ': ')
    //     (A);
    //      CALL READIT(op,len1);
    //      end;
    // 
    //      value=op(1);
    //      DIR(I)=LDIR(i)*VALUE;
    //      END;
    // 
    //                        /*   existing violations  */
    //   else IF OP(1)= '2' THEN
    //      DO;
    // 
    //      DO I=1 TO NVIOL;
    //      J=VFLAG(I);
    //      if ldir(i) < 0 then
    //        do;
    //        Cmin(J)=Cmin(J)+Vmin(J)*Smin(J)*LDIR(i);
    //        smin(j)=sclden(x(j),cmin(j),sdlim(j),SETSTAT);
    //        end;
    //     else
    //        do;
    //        Cmax(J)=Cmax(J)+Vmax(J)*Smax(J)*LDIR(i);
    //        smax(j)=sclden(x(j),cmax(j),sdlim(j),SETSTAT);
    //        end;
    //      END;
    // 
    //      PUT SKIP(2) EDIT
    //     ('CONSTRAINT LEVELS RELAXED TO EXISTING VIOLATIONS.')
    //     (A);
    //      GO TO EXITT;
    //      END;
    // 
    //                     /*  return to command level  */
    //   else IF OP(1)= '3' THEN GO TO EXITT;
    // 
    //                 /*  in proportion to existing violation  */
    //   else
    //      DO I=1 TO NVIOL;
    //      J=VFLAG(I);
    //      if ldir(i) < 0 then DIR(I)=LDIR(i)*Vmin(J);
    //             else dir(i)=ldir(i)*vmax(j);
    //      END;
    // 
    // /******  CREATE normalized VECTOR IN VIOLATED CONSTRAINT SPACE  ******/
    // VALUE=0.0;
    // itemp=0;
    // 
    // DO I=1 TO NVIOL;
    // temp2=abs(dir(i));
    // if temp2 > value then do;
    //          value=temp2;
    //          itemp=i;
    //          end;
    // END;
    // 
    // IF VALUE < smallnum THEN GO TO WHAT;
    // 
    // DO I=1 TO NVIOL;
    // DIR(I)=DIR(I)/VALUE;
    // if ldir(i) < 0 then TC(I)=Cmin(VFLAG(I));
    //        else tc(i)=cmax(vflag(i));
    // END;
    // 
    // C1=0.0;
    // RK1=OBJ;
    // 
    // TAGAIN:
    //                    /*   estimate best step size  */
    // smalest=1.0;
    // bigest =0.0;
    // do i=1 to nviol;
    // temp2=abs(dir(i));
    // j=vflag(i);
    // if ldir(i) < 0 then
    //       if temp2 > smallnum then temp=vmin(j)/temp2;
    //               else temp=vmin(j);
    //    else
    //       if temp2 > smallnum then temp=vmax(j)/temp2;
    //               else temp=vmax(j);
    // if temp  > smallnum
    //  & temp  < smalest  then smalest = temp;
    // if temp  > bigest   then bigest  = temp;
    // end;
    // 
    // j=vflag(itemp);
    // if ldir(itemp) < 0 then temp1=0.90*vmin(j);
    //            else temp1=0.90*vmax(j);
    // if temp1 < 0.01 then temp1=0.01;
    // 
    // PUT SKIP EDIT
    //    (
    //     'ENTER LOCAL EXPLORATION SIZE  (%)',
    //     'POSSIBILITIES RANGE FROM', 90.0*smalest, ' TO', 100.0*bigest,
    //     '(DEFAULT =', temp1*100.0, ' %)    : '
    //    )
    //    (A, skip, 2(a, f(6,1)), col(18), a, f(6,1), a);
    // CALL READIT(op,len1);
    // if len1(1)=0 then c3=temp1;
    //          else do;
    //         c3=op(1);
    //         IF C3 < smallnum THEN GO TO TAGAIN;
    //         C3=C3/100.0;
    //         end;
    // if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
    // 
    // /*******  TAKE FIRST EXPLORATORY RELAXATION STEP  *******************/
    // DO  I=1 TO NVIOL;
    // J=VFLAG(I);
    // if ldir(i) < 0 then
    //       do;
    //       Cmin(J)=Cmin(J)+DIR(I)*Cmin(J)*C3;
    //       smin(j)=sclden(x(j),cmin(j),sdlim(j),SETSTAT);
    //       end;
    //    else
    //       do;
    //       cmax(j)=cmax(j)+dir(i)*cmax(j)*c3;
    //       smax(j)=sclden(x(j),cmax(j),sdlim(j),SETSTAT);
    //       end;
    // END;
    // 
    // CALL DESPAK(P,OBJ);
    // IF OBJ > OBJMIN THEN call SRCH(p,obj);
    // 
    // NOTPOS:
    // IF OBJ <= OBJMIN THEN DO;
    //      PUT SKIP(2) EDIT
    //     (
    //      'A FEASIBLE POINT HAS BEEN ESTABLISHED.',
    //      'EXISTING CONSTRAINTS:'
    //     )
    //     (A, skip);
    //      call clister;
    //      PUT SKIP(2) EDIT
    //     (
    //      'SPECIFY:',
    //      '<enter>  OR  0  TO RESTART WITH A SMALLER STEP SIZE',
    //      '1  TO RETURN TO COMMAND LEVEL WITH THESE CONSTRAINTS',
    //      ': '
    //     )
    //     (A, skip, col(9), a, col(22), a, skip, a);
    //      CALL READIT(op,len1);
    //      IF OP(1)= '1' THEN GO TO EXITT;
    // 
    //      DO I=1 TO NVIOL;
    //      J=VFLAG(I);
    //      if ldir(i) < 0 then
    //       do;
    //       Cmin(J)=TC(I);
    //       smin(j)=sclden(x(j),cmin(j),sdlim(j),SETSTAT);
    //       end;
    //    else
    //       do;
    //       cmax(j)=tc(i);
    //       smax(j)=sclden(x(j),cmax(j),sdlim(j),SETSTAT);
    //       end;
    //      END;
    // 
    //                /*  call to despak here ???  */
    //      CALL RESET(p);
    //      GO TO TAGAIN;
    //      END;
    // 
    // IF IOOPT > 1 THEN
    //      do;
    //      put skip(2) edit
    //      ('TRIAL (FULL STEP) CONSTRAINTS:')
    //      (a);
    //      call clister;
    //      end;
    // 
    // RK3=OBJ;
    // 
    //  /******  MAKE SECOND EXPLORATORY STEP 1/2 WAY TO THE FIRST ONE  ****/
    // C2=C3/2.0;
    // 
    // DO I=1 TO NVIOL;
    // J=VFLAG(I);
    // if ldir(i) < 0 then
    //       do;
    //       cmin(j)=tc(i)+dir(i)*tc(i)*c2;
    //       smin(j)=sclden(x(j),cmin(j),sdlim(j),SETSTAT);
    //       end;
    //    else
    //       do;
    //       cmax(j)=tc(i)+dir(i)*tc(i)*c2;
    //       smax(j)=sclden(x(j),cmax(j),sdlim(j),SETSTAT);
    //       end;
    // END;
    // 
    // CALL RESET(p);
    // call SRCH(p,obj);
    // 
    // IF OBJ <= OBJMIN THEN GO TO NOTPOS;
    // 
    // IF IOOPT > 1 THEN
    //      do;
    //      put skip(2) edit
    //      ('TRIAL (HALF STEP) CONSTRAINTS:')
    //      (a);
    //      call clister;
    //      end;
    // 
    // RK2=OBJ;
    // 
    // /**********  QUADRATIC EXTRAPOLATION  *******************************/
    // /*       REFER TO THESIS FIGURE  4-2                */
    // 
    // /*  FOR THE CASE THAT C1 ^= 0 :                     */
    // 
    // /* A=C1-C2;                             */
    // /* SMC=C1-C3;                           */
    // /* CAPB= C1*(RK2AB-RK3BC) -C2*(RK1AC+RK3BC) +C3*(RK2AB-RK1AC);  */
    // /* CAPC= C2*C3*RK1AC -C1*C3*RK2AB +C1*C2*RK3BC;             */
    // 
    // /*  HOWEVER IN THIS CASE C1=0, SO TERMS DROP OUT            */
    // 
    // A=-C2;
    // B=C2-C3;
    // SMC=-C3;
    // 
    // RK1AC=RK1/(A*SMC);
    // RK2AB=RK2/(A*B);
    // RK3BC=RK3/(B*SMC);
    // 
    // CAPA= RK1AC -RK2AB +RK3BC;
    // CAPB= -C2*(RK1AC+RK3BC) +C3*(RK2AB-RK1AC);
    // CAPC= RK1;
    // 
    // ARG=CAPB*CAPB-4.0*CAPA*CAPC;
    // 
    // IF ARG < 0.0 THEN DO;
    //      PUT SKIP(2) EDIT
    //     ('THERE MAY BE NO FEASIBLE SOLUTION IN THIS DIRECTION.')
    //     (A);
    // 
    //      IF IOOPT > 3 THEN DO;
    //       PUT SKIP(2) EDIT('LINEAR EXTRAPOLATION:') (A);
    //       C0=RK2*(C3-C2)/(RK2-RK3)+C2;
    // 
    //       DO I=1 TO NVIOL;
    //       J=VFLAG(I);
    //       VALUE=TC(I)+DIR(I)*TC(I)*C0;
    // /*  temporary deletion
    //       PUT SKIP EDIT
    //          (CON_NAME(J), VALUE, CON_UNIT(J))
    //          (A(16), X(4), F(16,4), X(3), A);
    // */
    //       END;
    //       END;
    // 
    //      PUT SKIP(2) EDIT
    //     ('PARABOLA AXIS OF SYMMETRY:')
    //     (A);
    //      C0= -CAPB/(2.0*CAPA);
    //      GO TO KWIKIE;
    // END;
    // 
    // C0=(-CAPB-SQRT(ARG))/(2.0*CAPA);       /* TAKE SMALLER ROOT  */
    // 
    // /**********************************************************************/
    // 
    // PUT SKIP(2) EDIT
    //    ('EXTRAPOLATION INDICATES A FEASIBLE SOLUTION AT:')
    //    (A);
    // KWIKIE:
    // DO I=1 TO NVIOL;
    // J=VFLAG(I);
    // if ldir(i) < 0 then
    //       do;
    //       Cmin(J)=TC(I)+DIR(I)*TC(I)*C0;
    //       smin(j)=sclden(x(j),cmin(j),sdlim(j),SETSTAT);
    //       if j <= n
    //      then put skip edit
    //         (parm_name(j),   ' MIN', cmin(j), parm_unit(j))
    //         (r(lvlfmt));
    //      else put skip edit
    //         (st_var_name(j-n), ' MIN', cmin(j), st_var_unit(j-n))
    //         (r(lvlfmt));
    //       end;
    //    else
    //       do;
    //       Cmax(J)=TC(I)+DIR(I)*TC(I)*C0;
    //       smax(j)=sclden(x(j),cmax(j),sdlim(j),SETSTAT);
    //       if j <= n
    //      then put skip edit
    //         (parm_name(j),   ' MAX', cmax(j), parm_unit(j))
    //         (r(lvlfmt));
    //      else put skip edit
    //         (st_var_name(j-n), ' MAX', cmax(j), st_var_unit(j-n))
    //         (r(lvlfmt));
    //       end;
    // LVLFMT: format(a(16), a(4), F(16,4), X(3), A);
    // END;
    // 
    // PUT SKIP(2) EDIT
    //    ('DO YOU WISH TO ESTABLISH THIS SET OF CONSTRAINTS ?  (y/N) : ')
    //    (A);
    // CALL READIT(op,len1);
    // if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
    // if len1(1) > 0 & op(1)=substr(yes,kone,len1(1)) then do;
    // 
    //      call SRCH(p,obj);
    // 
    //      IF OBJ <= OBJMIN THEN DO;
    //       PUT SKIP(2) EDIT('THE RESULT IS FEASIBLE.') (A);
    //       GO TO EXITT;
    //       END;
    // 
    // RRC:
    //      PUT SKIP(2) EDIT
    //     (
    //      'THE RESULT IS NOT FEASIBLE:    OBJ =', OBJ,
    //      'SPECIFY:',
    //      '<enter>  OR  0  TO MAKE ANOTHER EXTRAPOLATION SERIES',
    //      '1  TO RESTART FROM THE BEGINNING OF THIS SERIES',
    //      '2  TO RETURN TO COMMAND LEVEL WITH THESE CONSTRAINTS',
    //      ': '
    //     )
    //      (A, F(18,6), SKIP(2), A, skip, col(9), a, 2(col(22), a), skip, a);
    //      CALL READIT(op,len1);
    //      if ansisw = 1 & xeqsw = 0 then put edit(scrclr) (a);
    // 
    //      IF OP(1)= '2' THEN GO TO EXITT;
    //      IF OP(1)= '1' THEN DO;
    //       DO I=1 TO NVIOL;
    //       J=VFLAG(I);
    //       if ldir(i) < 0 then Cmin(J)=TC(I);
    //              else cmax(j)=tc(i);
    //       END;
    // 
    //       CALL RESET(p);
    //       GO TO TOP;
    //       END;
    //      IF len1(1)=0 | OP(1)= '0' THEN GO TO TOP;
    //      GO TO RRC;
    // END;
    // 
    // DO I=1 TO NVIOL;
    // J=VFLAG(I);
    // if ldir(i) < 0 then Cmin(j)=TC(I);
    //        else cmax(j)=tc(i);
    // END;
    // 
    // CALL RESET(p);
    // 
    // EXITT:
    // call despak(p,obj);
    // 
    // CLISTER: procedure;
    // PUT SKIP EDIT
    //    (
    //     'CONSTRAINT                % VIOLATION           LEVEL'
    //    )
    //    (A, skip);
    // 
    // DO I=1 TO NVIOL;
    // J=VFLAG(I);
    // if j <= n then
    // do;
    // if ldir(i) < 0 then PUT SKIP EDIT
    //    (parm_NAME(J), ' MIN', Vmin(J)*100.0, Cmin(J),
    //     '   ', parm_UNIT(J))
    //    (r(violfmt));
    //  else put skip edit
    //    (parm_NAME(J), ' MAX', Vmax(J)*100.0, Cmax(J),
    //     '   ', parm_UNIT(J))
    //    (r(violfmt));
    // end;
    // else do;
    // im=j-n;
    // if ldir(i) < 0 then PUT SKIP EDIT
    //    (st_var_NAME(im), ' MIN', Vmin(J)*100.0, Cmin(J),
    //     '   ', st_var_UNIT(im))
    //    (r(violfmt));
    //  else put skip edit
    //    (st_var_NAME(im), ' MAX', Vmax(J)*100.0, Cmax(J),
    //     '   ', st_var_UNIT(im))
    //    (r(violfmt));
    // end;
    // END;
    // 
    // VIOLFMT: format(A(16), a, F(14,4), F(18,4), A, A);
    // END CLISTER;
    // 
    // INSTRT:
    // 
    // END TRADE;
}

module.exports = trade;
