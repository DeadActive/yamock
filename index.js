const { evaluate } = require("./utils.js");

/**
 * 
 * @param {Object} scheme Scheme of mock object
 * @param {Number} timeout Optional timeout
 * @returns Mock function, every call of this function generates new random object discribed by scheme
 * 
 * @example
 * ```js
const person = Mock({
    id: UUID(),
    name: FullName(Bool()),
    username: Username(),
    registeredAt: DateTime(new Date(2020,1,1), new Date()),
    posts: ArrayOf({
        id: UUID(),
        title: Sentence(5, 8),
        text: Sentences(Integer(3, 5)),
        createdAt: DateTime(new Date(2020,1,1), new Date()),
    }, Integer(3, 5))
}, 500)

const result = person()
 * ```
 */
function Mock(scheme, timeout = 0) {
    return () => {
        let result = {};

        if (typeof scheme === "object" && !Array.isArray(scheme)) {
            Object.entries(scheme).forEach(([key, fn]) => {
                if (typeof fn === "object") {
                    result[key] = Mock(fn)();
                    return;
                }

                if (typeof fn === "function") {
                    result[key] = fn();
                    return;
                }

                result[key] = fn;
            });
        }

        if (typeof scheme === "object" && Array.isArray(scheme)) {
            result = [];
            scheme.forEach((fn) => {
                if (typeof fn === "object") {
                    result.push(Mock(fn)());
                    return;
                }

                if (typeof fn === "function") {
                    result.push(fn());
                    return;
                }

                result.push(fn);
            });
        }

        const _timeout = evaluate(timeout);

        if (_timeout) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(result);
                }, _timeout);
            });
        }
        return result;
    };
}

export default Mock;
