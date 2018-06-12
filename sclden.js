function sclden(value, level, sdlimit, status) {

    var stemp;

    if (status == FIXEDSTAT) {
        stemp = (1.0 / FIX_WT) * Math.abs(level);
        if (stemp < SMALLNUM) {
            stemp = (1.0 / FIX_WT) * Math.abs(value);
        }
        if (stemp < SMALLNUM) {
            stemp = 1.0 / (FIX_WT * ZERO_WT);
        }
    } else {
        stemp = (1.0 / CON_WT) * Math.abs(level);
        if (stemp < SMALLNUM) {
            stemp = (1.0 / CON_WT) * Math.abs(value);
        }
        if (stemp < SMALLNUM) {
            stemp = 1.0 / ZERO_WT;
        }
    }

    if (stemp < sdlimit) {
        stemp = sdlimit
    }

//    console.log(`value = ${value}, level = ${level}, sdlimit = ${sdlimit}, status = ${status}: stemp = ${stemp}`);

    return stemp;
}

module.exports = sclden;