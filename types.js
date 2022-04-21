const {
    capitalize,
    generateUUID,
    pickArray,
    randomCity,
    randomCountry,
    randomFirstName,
    randomFloat,
    randomInt,
    randomLastName,
    randomString,
    randomWord,
    zeroPad,
    evaluate,
    randomStreet,
    randomGender,
} = require("./utils.js");

// Integer

/**
 *
 * @param {Number} min Minimum Integer value
 * @param {Number} max Maximum Integer value
 * @returns Random integer between min and max
 */
export const Integer = (min = 0, max = Number.MAX_SAFE_INTEGER) => {
    return () => randomInt(...evaluate(min, max));
};

/**
 *
 * @param {Number} max Maximum Id value
 * @returns Random integer between 0 and max
 */
export const Id = (max = Number.MAX_SAFE_INTEGER) => {
    return () => randomInt(...evaluate(0, max));
};

// Float

/**
 *
 * @param {Number} min Minimum Float value
 * @param {Number} max Maximum Float value
 * @returns Random float between min and max
 */
export const Float = (min = 0, max = Number.MAX_VALUE) => {
    return () => randomFloat(...evaluate(min, max));
};

// Date

/**
 *
 * @param {Number|Date} min Minimum Date value in milliseconds or Date object
 * @param {Number|Date} max Maximum Date value in milliseconds or Date object
 * @returns Random Date between min and max
 */
export const DateTime = (min, max) => {
    min = min || 0;
    max = max || Math.floor(Date.now() / 1000);

    min = min instanceof Date ? min.valueOf() / 1000 : min;
    max = max instanceof Date ? max.valueOf() / 1000 : max;

    return () => new Date(randomInt(...evaluate(min, max)) * 1000);
};

/**
 *
 * @param {Array} min Minimum time value array [hours, minutes, seconds]
 * @param {Array} max Maximum time value array [hours, minutes, seconds]
 * @param {Type} type Return value type ['string', 'array']
 * @returns Random Time between between min and max
 */
export const Time = (min = [0, 0, 0], max = [23, 59, 59], type = "string") => {
    return () => {
        const hours = randomInt(min[0], max[0]);
        const minutes = randomInt(min[1], max[1]);
        const seconds = randomInt(min[2], max[2]);

        if (type === "string")
            return `${zeroPad(hours, 2)}:${zeroPad(minutes, 2)}:${zeroPad(
                seconds,
                2
            )}`;

        if (type === "array") return [hours, minutes, seconds];
    };
};

// Boolean

/**
 *
 * @param {Number} chance Chance of True value between 0 and 1
 * @returns Random boolean with chance
 */
export const Bool = (chance = 0.5) => {
    return () => Math.random() < evaluate(chance);
};

// String

/**
 *
 * @param {Number} length Length of string
 * @returns Random String
 */
export const String = (length = 20) => {
    return () => randomString(evaluate(length));
};

/**
 *
 * @returns Random Word
 */
export const Word = () => {
    return () => randomWord();
};

/**
 *
 * @param {Number} length Count of words to be generated
 * @returns Random Words
 */
export const Words = (length = 5) => {
    return () =>
        Array.from({ length: evaluate(length) }, () => randomWord()).join(" ");
};

/**
 *
 * @param {Number} min Minimum count of words in sentence
 * @param {Number} max Maximum count of words in sentence
 * @returns Random sentence
 */
export const Sentence = (min = 4, max = 10) => {
    return () => {
        const length = randomInt(...evaluate(min, max));

        const _words = Words(length)()
            .split(" ")
            .map((w) => ` ${w}`);

        const result = [..._words];

        let lastComma = true;

        _words.forEach((w, i) => {
            if (Bool(0.3)() && !lastComma) {
                result.splice(i, 0, ",");
                lastComma = true;
                return;
            }
            lastComma = false;
        });

        result[0] = capitalize(result[0].trim());
        result.push(".");

        return result.join("");
    };
};

/**
 *
 * @param {Number} length Count of sentences
 * @returns Random sentences
 */
export const Sentences = (length = 2) => {
    return () =>
        Array.from({ length: evaluate(length) }, () => Sentence()()).join(" ");
};

/**
 *
 * @returns Random first name
 */
export const FirstName = () => {
    return () => randomFirstName();
};

/**
 *
 * @returns Random last name
 */
export const LastName = () => {
    return () => randomLastName();
};

/**
 *
 * @param {Boolean} doubleName Generate double name
 * @returns Random full name
 */
export const FullName = (doubleName = false) => {
    return () =>
        `${randomFirstName()}${
            evaluate(doubleName) ? " " + randomFirstName() + " " : " "
        }${randomLastName()}`;
};

/**
 *
 * @returns Random country
 */
export const Country = () => {
    return () => randomCountry();
};

/**
 *
 * @returns Random city
 */
export const City = () => {
    return () => randomCity();
};

/**
 *
 * @returns Random uuidv4
 */
export const UUID = () => {
    return () => generateUUID();
};

/**
 *
 * @param {String} provider Email provider
 * @returns Random email with provider
 */
export const Email = (provider = "email.com") => {
    return () =>
        `${randomFirstName().toLowerCase()}.${randomLastName().toLowerCase()}@${evaluate(
            provider
        )}`;
};

/**
 *
 * @param {Number} code Phone country code
 * @returns Random phone number
 */
export const Phone = (code = 1) => {
    return () =>
        `+${evaluate(code)} (${zeroPad(randomInt(0, 999), 3)}) ${zeroPad(
            randomInt(0, 999),
            3
        )}-${zeroPad(randomInt(0, 99), 2)}-${zeroPad(randomInt(0, 99), 2)}`;
};

/**
 *
 * @returns Random credit card number
 */
export const CreditCard = () => {
    return () =>
        `${zeroPad(randomInt(1000, 9999), 4)} ${zeroPad(
            randomInt(0, 9999),
            4
        )} ${zeroPad(randomInt(0, 9999), 4)} ${zeroPad(randomInt(0, 9999), 4)}`;
};

/**
 *
 * @returns Random street name
 */
export const Street = () => {
    return () => randomStreet();
};

/**
 *
 * @param {String} type Return value type ['object', 'array']
 * @returns Random WGS84 coordinates
 */
export const Coordinates = (type = "object") => {
    return () => {
        const _type = evaluate(type);

        if (_type === "object")
            return {
                lat: randomFloat(-90, 90),
                lng: randomFloat(-180, 180),
            };

        if (_type === "array")
            return [randomFloat(-90, 90), randomFloat(-180, 180)];
    };
};

/**
 *
 * @returns Random gender
 */
export const Gender = () => {
    return () => randomGender();
};

/**
 *
 * @returns Random username
 */
export const Username = () => {
    return () => `${randomFirstName()}.${randomLastName()}${randomInt(1, 99)}`;
};

// Array

/**
 *
 * @param {Array} array Array to be picked from
 * @returns Random element from array
 */
export const PickArray = (array) => {
    return () => pickArray(evaluate(array));
};

/**
 *
 * @param {any|Array|Object} type Type of value to be generated
 * @param {Number} length Count of elements to generate
 * @returns Random array of types
 */
export const ArrayOf = (type, length = 5) => {
    if (typeof type === "object" && !Array.isArray(type)) {
        return () => {
            return Array.from({ length: evaluate(length) }, () => {
                const result = {};

                Object.entries(type).forEach(([key, fn]) => {
                    result[key] = fn();
                });

                return result;
            });
        };
    }

    if (typeof type === "object" && Array.isArray(type)) {
        return () => {
            return Array.from({ length: evaluate(length) }, () => {
                return type.map((fn) => fn());
            });
        };
    }

    return () => Array.from({ length: evaluate(length) }, () => type());
};

// URIS

/**
 *
 * @param {String} locale Locale string
 * @returns Url to random Wikipedia article
 */
export const Wikipedia = (locale = "en") => {
    return () =>
        `https://${evaluate(locale)}.wikipedia.org/wiki/Special:Random`;
};

/**
 *
 * @param {Number} size Size of avatar
 * @param {Number} id Id of avatar
 * @returns Url to random avatar
 */
export const Avatar = (size = 300, id = randomInt(0, 70)) => {
    return () => `https://i.pravatar.cc/${evaluate(size)}?img=${evaluate(id)}`;
};

/**
 *
 * @param {Number} width Width of cover image
 * @param {Number} height Height of cover image
 * @param {String} text Text to be displayed on cover image
 * @param {String} format Format of image ['jpg', 'png', 'gif']
 * @returns Uri to placeholder image
 */
export const PlaceholderImage = (
    width = 150,
    height = 150,
    text = null,
    format = "png"
) => {
    return () => {
        const [_width, _height, _text, _format] = evaluate(
            width,
            height,
            text,
            format
        );
        return encodeURI(
            `https://via.placeholder.com/${_width}x${_height}.${_format}${
                _text ? "?text=" + _text : ""
            }`
        );
    };
};
