/**
 * FIX command - apply fixed status to design parametyer or state variable
 */
//const eqnset1 = require('./eqnset1');
function fix(split_line) {

    console.log("FIX:");
    console.log("  The FIX command is not yet implemented.")
    
//    FIX:
//        if len1(2) = 0 then do;
//           put skip edit
//               ('FIX:',
//                'ENTER NAME OF VARIABLE TO BE FIXED')
//               (a, skip);
//           go to instrt;
//           end;
//        DO I=1 TO N;
//        IF OP(2) = SUBSTR(PARM_NAME(I),KONE,LEN1(2)) THEN DO;
//             IF OP(3) ^= '' THEN p(i)=op(3);
//             lmin(I)=2;
//             lmax(I)=2;
//             cmin(i)=p(i);
//             cmax(i)=p(i);
//             PUT SKIP EDIT
//                 (PARM_NAME(I), ' IS FIXED AT ', P(I), '   ', PARM_UNIT(I))
//                 (2A, F(14,4), 2A);
//             CALL COUNT;
//             GO TO INSTRT;
//             END;
//        END;
//        DO I=1 TO K;
//        IF OP(2) = SUBSTR(ST_VAR_NAME(I),KONE,LEN1(2)) THEN DO;
//             IM=I+N;
//             IF OP(3) ^= '' THEN do;
//                   cmin(im)=op(3);
//                   cmax(im)=op(3);
//                   end;
//                    ELSE do;
//                   cmin(IM)=X(I);
//                   cmax(IM)=X(I);
//                   end;
//             lmin(im)=FIXEDSTAT;
//             lmax(im)=FIXEDSTAT;
//             Smin(IM)=sclden(x(i),cmin(im),sdlim(im),FIXEDSTAT);
//             Smax(IM)=sclden(x(i),cmax(im),sdlim(im),FIXEDSTAT);
//             if ioopt > 2 & msgsw(1) = 0 then do;
//             put skip edit
//                 (st_var_name(i), ' IS A DEPENDENT VARIABLE.',
//                  'REMEMBER THAT A SEARCH WILL BE REQUIRED TO ',
//                  'ESTABLISH THE DESIRED VALUE.')
//                 (2a, skip);
//             msgsw(1)=1;
//             end;
//             PUT SKIP(2) EDIT
//            (ST_VAR_NAME(I), ' IS FIXED AT ', Cmin(IM),
//             '   ', ST_VAR_UNIT(I))
//            (2A, F(14,4), 2A);
//             CALL COUNT;
//             GO TO INSTRT;
//             END;
//        END;
//        PUT SKIP(2) EDIT(OP(2),   ' ? ?') (A, A);
//        GO TO instrt;

}

module.exports = fix;
