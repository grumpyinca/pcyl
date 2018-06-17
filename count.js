/**
 * Set nfixed, nstf and nfdcl by direct count
 * Insures that these values are consistent, eliminates need for bookkeeping.
 */

function count() {
    
    NFDCL  = 0;
    NFIXED = 0;
    for ( var property in design_parameters) {
        if (design_parameters.hasOwnProperty(property)) {
            var dp = design_parameters[property];
            if (dp.lmin == FIXEDSTAT) {
                NFIXED++;
            }
            if (dp.lmin < FREESTAT){
                NFDCL++;
            }
            if (dp.lmax < FREESTAT){
                NFDCL++;
            }
        }
    }

    NSTF = 0;
    for ( var property in state_variables) {
        if (state_variables.hasOwnProperty(property)) {
            var sv = state_variables[property];
            if (sv.lmin == FIXEDSTAT) {
                NSTF++;
            }
            if (sv.lmin < FREESTAT){
                NFDCL++;
            }
            if (sv.lmax < FREESTAT){
                NFDCL++;
            }
        }
    }

// console.log('design parameters = ', design_parameters);
// console.log('state variables = ', state_variables);
// console.log('FREESTAT, SETSTAT, FIXEDSTAT: ', FREESTAT, SETSTAT, FIXEDSTAT);
// console.log('count: NFIXED, NSTF, NFDCL = ', NFIXED, NSTF, NFDCL);
}

module.exports = count;
