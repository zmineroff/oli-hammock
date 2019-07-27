/**
 * @internalapi (canonicalized) version of QuestionSpec
 */
export interface QuestionInt {
    readonly prompt?: string;
    readonly hints?: string[];
    readonly config?: any;
    readonly score: number;
    readonly parts: PartInt[];
    readonly match: Map<string, FeedbackInt>;
}
/**
 * @internalapi (canonicalized) version of PartSpec
 */
export interface PartInt {
    readonly prompt?: string;
    readonly hints?: string[];
    readonly score: number;
    readonly match: Map<string, FeedbackInt>;
}
/**
 * @internalapi (canonicalized) version of FeedbackSpec
 */
export interface FeedbackInt {
    readonly score: number;
    readonly message: string;
}
/**
 * Checks that the input questions object is in the correct format as specified by {@link QuestionSpec}, and
 * canonicalizes it into the more rigorous {@link QuestionInt} format used internally.
 */
export declare function validateQuestion(question: any): QuestionInt;
