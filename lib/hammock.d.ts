import { SuperActivityClient } from "./superactivity";
import { Activity } from "./activity";
/**
 * Wrap the activity into the {@link SuperActivityClient} form that {@link SuperActivity} expects and will
 * call.
 *
 * This is the only function exported by the oli-hammock NPM package. When you are using the OLI Hammock, your
 * entry point should call this function and pass an {@link Activity} to it.
 */
export declare function hammock<UserData>(activity: Activity<UserData>): SuperActivityClient;
