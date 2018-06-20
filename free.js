/**
 * Free command - set free status for design parameter or state variable
 */
//const eqnset1 = require('./eqnset1');
function free(split_line) {

    console.log("FREE:");
    console.log("  The FREE command is not yet implemented.")

    //    FREQ:
    //        if len1(2) = 0 then do;
    //           put skip edit
    //               ('FREE:',
    //                'ENTER NAME OF VARIABLE TO BE FREED')
    //               (a, skip);
    //           go to instrt;
    //           end;
    //        DO I=1 TO N;
    //        IF OP(2) = SUBSTR(PARM_NAME(I),KONE,LEN1(2)) THEN DO;
    //             lmin(I)=0;
    //             lmax(I)=0;
    //             PUT SKIP EDIT
    //             ('THE STATUS OF ', PARM_NAME(I), ' IS FREE.')
    //             (A, A, A);
    //             CALL COUNT;
    //             GO TO INSTRT;
    //             END;
    //        END;
    //        DO I=1 TO K;
    //        IF OP(2) = SUBSTR(ST_VAR_NAME(I),KONE,LEN1(2)) THEN DO;
    //             lmin(I+n)=0;
    //             lmax(I+n)=0;
    //             PUT SKIP EDIT
    //              ('THE STATUS OF ', ST_VAR_NAME(I), ' IS FREE.')
    //              (A, A, A);
    //             CALL COUNT;
    //             GO TO INSTRT;
    //             END;
    //        END;
    //        PUT SKIP(2) EDIT(OP(2),   ' ? ?') (A, A);
    //        GO TO instrt;
    //
    //
    //        SPECAL:
    //        if readok = 0 then do;
    //            put skip list('START COMMAND REQUIRED');
    //            go to instrt;
    //            end;
    //        if ioopt > 3 then PUT SKIP EDIT
    //             ('"SPECIAL" CALL TO EQNSET', NMERIT)
    //             (A, F(2,0));
    //        M_FLAG=1;
    //        if len1(2) > 0 then m_flag=op(2);
    //        CALL DESPAK(P,OBJ);
    //        M_FLAG=0;
    //        GO TO INSTRT;
    //

}

module.exports = free;
