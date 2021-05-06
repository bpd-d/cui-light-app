/**
 * Forward: y = x
 * Backward: y = -x + 1
 */
export function getLinearTimingFunction() {
    return {
        calculateProgress: (currentTimeProgress) => {
            return currentTimeProgress;
        }
    };
}
/**
 *
 * @returns
 */
export function getSquareCalculator() {
    return {
        calculateProgress: (currentTimeProgress) => {
            return currentTimeProgress;
        }
    };
}
/**
 *
 * y = 2x - x^2
 */
export function getEaseTimingFunction() {
    return {
        calculateProgress: (currentTimeProgress) => {
            return (2 * currentTimeProgress) - Math.pow(currentTimeProgress, 2);
        }
    };
}
// export function getEaseOutCalculator(): ICuiTimingFunction {
//     function calculate(start: number, progress: number): number {
//         const a = (1 - start);
//         return -(a * getParentSqaure(progress)) + 1;
//     }
//     function calcRevert(start: number, progress: number): number {
//         return start * getParentSqaure(progress)
//     }
//     function getParentSqaure(x: number): number {
//         return Math.pow(x, 2) - 2 * x + 1;
//     }
//     return {
//         calculateProgress: (dt: number, data: ICuiAnimationPerform) => {
//             let startDist = data.velocity * data.timeout;
//             const progress = data.revert ? calcRevert(startDist, data.animationProgress) : calculate(startDist, data.animationProgress)
//             return {
//                 ...data,
//                 progress: progress + 0.0001
//             };
//         }
//     }
// }
