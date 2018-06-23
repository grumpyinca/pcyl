"use strict";
/**
 * despak - Expand any compressed design parameters and call the equation set.
 */
var eqnset1 = require('./eqnset1');
var design = require('./design');


function despak(p) {
	
//
//%include 'maxdims.inc';
//%include 'symbols.inc';
//
//DECLARE (P(nmax), OBJ) FLOAT;
//
//%include 'state.inc';
//%include 'control.inc';
//
//
//DECLARE
//	 (i, j, kd, im) fixed,
//	 (pu(nmax), viol_sum, m_funct) float,
//	 eqnset1  entry ((nmax)float),
//	 eqnset2  entry ((nmax)float),
//	 eqnset3  entry ((nmax)float)
//	;
//
//
///********************************************************************/
///*
//    EQNSET contains an equation set providing a math model of
//    the design problem.  The values of the problem independent
//    variables (P) are input to it via the argument list.  Constraint
//    Levels (C) are input via external.  The values of the problem
//    dependent variables (X), constraint violations (V), and the
//    Merit Function (if any) are returned via external.
//*/
///********************************************************************/
///*
// P=vector of design parameters       (length=N)
// X=vector of state variables	      (      =K)
// M=K+N,
// L=vector of constraint control info (      =M)     LMIN, LMAX
// V=vector of constraint violations   (      =M)     VMIN, VMAX
// C=vector of constraint levels       (      =M)     CMIN, CMAX
// S=vector of constraint scaling denominators (=M)   SMIN, SMAX
// D=vector of externally computed quantities
//
// NFIXED = number of fixed design parameters
// NSTF	 = number of fixed state variables
//
// If constraint is set, then LMIN or LMAX = 1; otherwise = 0.
// If fixed, then LMIN = LMAX = 2;  SMIN, SMAX are biased by FIX_WT.
//
// VIOL_WT, M_NUM, M_DEN, & SOUGHT ARE PASSED IN FROM MAIN TO
//    PROVIDE AUTOMATIC AND MANUAL CONTROL OVER THE OBJECTIVE
//    FUNCTION CONSTRUCTION
//
// NSTF = NUMBER OF FIXED STATE VARIABLES
//*/
///********************************************************************/
///*
//  If the call is from SRCH, (nsrch=1) then the fixed members of the
//  design parameter vector will have been compressed out by SRCH.  In
//  this case, DESPAK expands the parameter vector by inserting the
//  proper members from the "DP" vector passed in external from SRCH.
//
//  NSRCH=0  ==> the call is from the cadsys main program and the
//  fixed members have  *** NOT ***  been compressed out of the
//  parameter vector by SRCH.
//
//  The value of NMERIT is determined by the user directly in the
//  cadsys main procedure. The correspondance to any user supplied
//  EQNSET  routine is made here.
//
//  Consider moving the code that zero's out VMIN & VMAX to a place
//  that is outside the SEARCH loop; eg. the FREE command.
//*/
///********************************************************************/
//
    // TODO: code the following for release 0.3 
    var pu = [];
//kd=0;
    var kd = 0;
//if nfixed > 0 & nsrch = 1 then
    if (NFIXED > 0 && NSRCH == true) {
//      do i=1 to n;
        for (let i = 0; i < design_parameters.length; i++) {
            var dp = design_parameters[i];
//      if lmin(i) ^= FIXEDSTAT then pu(i)=p(i-kd);
            if (dp.lmin != FIXEDSTAT) pu[i] = p[i-kd];
//			       else do;
            else {
//				    kd=kd+1;
                kd++;
//				    pu(i)=dp(i);
                pu[i] = design_parameters[i].value
//				    end;
            }
//      end;
        }
    }
//   else
    else {
//      do i=1 to n;
        for (let i = 0; i < design_parameters.length; i++) {
//      pu(i)=p(i);
            pu[i] = p[i];
//      end;
        }
    }

    eqnset1(pu);

    // TODO: code the following for release 0.6
//IF NMERIT = 1 THEN CALL eqnset1(pu);
//      ELSE if nmerit = 2 then CALL eqnset2(pu);
//      ELSE if nmerit = 3 then CALL eqnset3(pu);
//      else do;
//	   put skip list('DESPAK: NMERIT WITHOUT CORRESPONDING EQNSET');
//	   Put skip list('TERMINATING . . .');
//	   stop;
//	   end;
//
///********************************************************************/
///*
    // TODO: FDCL
//  Implement functionally determined constraint levels:
//*/
//
//if nfdcl > 0 then
//   do i=1 to m;
//   if lmin(i) < 0 then
//      if lmin(i) < -m then cmin(i)= d(-lmin(i)-m);
//	  else if lmin(i) < -n then cmin(i)= x(-lmin(i)-n);
//			       else cmin(i)=pu(-lmin(i));
//   if lmax(i) < 0 then
//      if lmax(i) < -m then cmax(i)= d(-lmax(i)-m);
//	  else if lmax(i) < -n then cmax(i)= x(-lmax(i)-n);
//			       else cmax(i)=pu(-lmax(i));
//   end;
//
///*
// The following section of code constructs the objective function
// from the constraint violations, merit function, and state
// variable fix violations.  It is not problem dependent.
//*/
//
///*  Constraint Violations					     */
//do i=1 to n;
//vmin(i)=0.0;
//vmax(i)=0.0;
//if lmin(i) = SETSTAT
// | lmin(i) < FREESTAT
//   then vmin(i)=(-pu(i)+cmin(i))/smin(i);
//if lmax(i) = SETSTAT
// | lmax(i) < FREESTAT
//   then vmax(i)=( pu(i)-cmax(i))/smax(i);
//end;

    for (let i = 0; i < design_parameters.length; i++) {
        var dp = design_parameters[i];
        dp.vmin = 0.0;
        dp.vmax = 0.0;
        if (dp.lmin == SETSTAT || dp.lmin < FREESTAT)
            dp.vmin = (-pu[i] + dp.cmin) / dp.smin;
        if (dp.lmax == SETSTAT || dp.lmax < FREESTAT)
            dp.vmax = ( pu[i] - dp.cmax) / dp.smax;
    }

    //
//				/*  reform as above ??	*/
//do i=1 to k;
//im=i+n;
//vmin(im)=0.0;
//vmax(im)=0.0;
//if lmin(im) = SETSTAT
// | lmin(im) < FREESTAT
//   then vmin(im)=(-x(i)+cmin(im))/smin(im);
//if lmax(im) = SETSTAT
// | lmax(im) < FREESTAT
//   then vmax(im)=( x(i)-cmax(im))/smax(im);
//end;
//
    for (let i = 0; i < state_variables.length; i++) {
        var sv = state_variables[i];
        sv.vmin = 0.0;
        sv.vmax = 0.0;
        if (sv.lmin == SETSTAT || sv.lmin < FREESTAT)
            sv.vmin = (-sv.value + sv.cmin) / sv.smin;
        if (sv.lmax == SETSTAT || sv.lmax < FREESTAT)
            sv.vmax = (sv.value - sv.cmax) / sv.smax;
    }

    //VIOL_SUM=0.0;
//DO I=1 TO M;
//IF Vmin(I) > 0.0 THEN VIOL_SUM=VIOL_SUM+Vmin(I)*Vmin(I);
//IF Vmax(I) > 0.0 THEN VIOL_SUM=VIOL_SUM+Vmax(I)*Vmax(I);
//END;
//
    var viol_sum = 0.0;
    for (let i = 0; i < design_parameters.length; i++) {
        var dp = design_parameters[i];
        if (dp.vmin > 0.0)
            viol_sum = viol_sum + dp.vmin * dp.vmin;
        if (dp.vmax > 0.0)
            viol_sum = viol_sum + dp.vmax * dp.vmax;
    }
    for (let i = 0; i < state_variables.length; i++) {
        var sv = state_variables[i];
        if (sv.vmin > 0.0)
            viol_sum = viol_sum + sv.vmin * sv.vmin;
        if (sv.vmax > 0.0)
            viol_sum = viol_sum + sv.vmax * sv.vmax;
    }
   
// TODO: Add the Merit Function code below before implementing the SEEK command
    ///*  Merit Function						     */
    var m_funct = 0.0;
    
    //if sought = 0 then m_funct=0.0;
//	 else if sought > 0 then
//		   if sdir < 0 then m_funct=( pu(sought)-m_num)/m_den;
//			       else m_funct=(-pu(sought)+m_num)/m_den;
//	       else
//		   if sdir < 0 then m_funct=( x(-sought)-m_num)/m_den;
//			       else m_funct=(-x(-sought)+m_num)/m_den;
//
///*  Weighting and Summation					     */
//	IF NSTF = 0 THEN DO;
//	     OBJ = VIOL_WT*VIOL_SUM + m_funct;
//	     RETURN;
//	     END;
//
    if (NSTF == 0) {
        var obj = VIOL_WT * viol_sum + m_funct;
        return obj;
    }

///*  State variable fix levels. 				     */
///*
//  The fix_wt's are automatically incorporated in the scaling
//  denominators S(I+N) by the main routine.
//
//  This version reduces penalty of large fix violations.
//*/
//
//DO I = 1 TO K;
//im=i+n;
//if lmin(im) = FIXEDSTAT then
//     DO;
//     vmin(im)=(-x(i)+cmin(im))/smin(im);
//     vmax(im)=-vmin(im);
//     if vmin(im) > 1.0 then viol_sum=viol_sum+vmin(im);
//	 else if vmin(im) < -1.0 then viol_sum=viol_sum-vmin(im);
//	      else VIOL_SUM=VIOL_SUM+Vmin(IM)*Vmin(IM);
//     END;
//END;
//OBJ = VIOL_WT*VIOL_SUM + m_funct;

    for (let i = 0; i < state_variables.length; i++) {
        var sv = state_variables[i];
        if (sv.lmin == FIXEDSTAT) {
            sv.vmin = (-sv.value + sv.cmin) / sv.smin;
            sv.vmax = -sv.vmin;
            if (sv.vmin > 1.0) {
                viol_sum = viol_sum + sv.vmin;
            } else if (sv.vmin < -1.0) {
                viol_sum = viol_sum - sv.vmin;
            } else {
                viol_sum = viol_sum + sv.vmin * sv.vmin;
            }
        }
    }
    var obj = VIOL_WT * viol_sum + m_funct;
    return obj;
    //
//END DESPAK;
//
//

}

module.exports = despak;
