export declare class FrameSizer {
    private parentIFrame;
    private knownHeight;
    private verbose;
    private needsChecks;
    private log;
    private error;
    /**
     *
     * @param opt.verbose If true, print verbose input about resizing to the console.
     * @param opt.spindebug If true, run a continuous process in the background to check that the height is correct. (THIS IS VERY EXPENSIVE.)
     */
    constructor(opt?: {
        verbose?: boolean;
        spindebug?: boolean;
    });
    private doCheck;
    check(): void;
}
