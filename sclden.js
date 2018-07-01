"use strict";
//@@@ SCLDEN: procedure(value,level,sdlimit,status)  returns(float);
function sclden(value, level, sdlimit, status) {

    //@@@  
    //@@@  declare
    //@@@       value   float,
    //@@@       level   float,
    //@@@       sdlimit float,
    //@@@       status  fixed
    //@@@      ;
    //@@@  
    //@@@  %include 'maxdims.inc';
    //@@@  %include 'symbols.inc';
    //@@@  %include 'constant.inc';
    //@@@  %include 'control.inc';
    //@@@  
    //@@@  declare stemp float;
    var stemp;
    //@@@  
    //@@@  if status = FIXEDSTAT then
    if (status == FIXEDSTAT) {
        //@@@        do;
        //@@@        stemp=(1.0/FIX_WT)*abs(level);
        stemp = (1.0 / FIX_WT) * Math.abs(level);
        //@@@        if stemp < smallnum then stemp=(1.0/FIX_WT)*abs(value);
        if (stemp < SMALLNUM) {
            stemp = (1.0 / FIX_WT) * Math.abs(value);
        }
        //@@@        if stemp < smallnum then stemp= 1.0/(FIX_WT*zero_wt);
        if (stemp < SMALLNUM) {
            stemp = 1.0 / (FIX_WT * ZERO_WT);
        }
        //@@@        end;
    }
    //@@@     else
    else {
        //@@@        do;
        //@@@        stemp=(1.0/CON_WT)*abs(level);
        stemp = (1.0 / CON_WT) * Math.abs(level);
        //@@@        if stemp < smallnum then stemp=(1.0/CON_WT)*abs(value);
        if (stemp < SMALLNUM) {
            stemp = (1.0 / CON_WT) * Math.abs(value);
        }
        //@@@        if stemp < smallnum then stemp= 1.0/zero_wt;
        if (stemp < SMALLNUM) {
            stemp = 1.0 / ZERO_WT;
        }
        //@@@        end;
    }
    //@@@  
    //@@@  if stemp < sdlimit then stemp=sdlimit;
    if (stemp < sdlimit) {
        stemp = sdlimit
    }

    //@@@     console.log(`value = ${value}, level = ${level}, sdlimit = ${sdlimit}, status = ${status}: stemp = ${stemp}`);

    //@@@  return(stemp);
    return stemp;
    //@@@  
    //@@@  end sclden;
}

module.exports = sclden;