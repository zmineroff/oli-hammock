/**
 * Reads the assets from the activity's XML data file.
 *
 * NB: As written, readAssets assumes that ALL assets are file resources that should be loaded into memory. If
 * we want to have richer behavior, I think the right approach is to modify the activity description DTD to
 * add a new attribute to signal whether the asset is plain text, a filename that should be rewritten with the
 * webContentFolder but not loaded, or a file that should be loaded.
 */
export declare function readAssets(webContentFolder: string, activityData: Element): Promise<Map<string, any>>;
