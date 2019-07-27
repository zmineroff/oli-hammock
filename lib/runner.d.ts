import { SuperActivity } from "./superactivity";
import { Activity } from "./activity";
import { QuestionInt } from "./validateinput";
/**
 * The {@link Runner} object is an unfortunate bit of @internalapi, mostly created because I don't quite
 * trust the {@link SuperActivity} to maintain internal data consistency, distinguish strings and
 * numbers, etc. Also because the {@link SuperActivity} defines a very general interaction protocol,
 * and I want to document and enforce a much more rigid protocol for the sake of simplicity. The role
 * that the Runner plays in the Hammock is therefore similar to the role the SuperActivity plays in
 * other embedded activities.
 *
 * There's no clear rule for what belongs in this class, versus what belongs in the {@link hammock}
 * function, as this object should be created, and its methods should be used, only from within that
 * funciton.
 *
 * A {@link Runner} object is created by the hammock. The constructor loads all the question's
 * compiled data, and then the {@link initializeWithSavedData} method loads the runtime data,
 * figuring out whether this activity was previously initialized.
 *
 *  - Freshly initialized: it is Attempt 1, the assessment has never been visited before. The
 *    {@link SuperActivity} just called {@link startAttempt}.
 *  - Incomplete: the assessment was started previously, so there is existing {@link UserDefinedData}
 *    to be read in and used. There may be zero, one, ore more actual grade records for this attempt,
 *    but none of these attempts have a score of 100%.
 *  - Complete: the most recent attempt recieved a score of 100%. Activity submission is disabled
 *    until the RESET button is pushed.
 */
export declare class Runner<UserDefinedData> {
    private currentAttempt;
    private activity;
    private superActivity;
    private question;
    /**
     * A promise is used to avoid initializing with dummy data unnecessarily.
     */
    private stored;
    /**
     * Construct a Runner object and cause it to begin initializing with saved data.
     *
     * @param superActivity - An initialized {@link SuperActivity}
     * @param activity - The activity's internal logic
     * @param questionArray - The activity's metadata (from question.json).
     */
    constructor(superActivity: SuperActivity, activity: Activity<UserDefinedData>, question: QuestionInt);
    render(): Promise<void>;
    private grade;
    private write;
    private restart;
    submit(): Promise<void>;
    reset(): Promise<void>;
}
