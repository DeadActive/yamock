import Mock from "./index.js";
import {
    ArrayOf,
    Avatar,
    Bool,
    City,
    Coordinates,
    Country,
    CreditCard,
    DateTime,
    Email,
    FirstName,
    Float,
    FullName,
    Gender,
    Id,
    Integer,
    LastName,
    Phone,
    PickArray,
    PlaceholderImage,
    Sentence,
    Sentences,
    Street,
    String,
    Time,
    Username,
    UUID,
    Wikipedia,
    Word,
    Words,
} from "./types.js";

const person = Mock(
    {
        id: UUID(),
        name: FullName(Bool()),
        username: Username(),
        registeredAt: DateTime(new Date(2020, 1, 1), new Date()),
        posts: ArrayOf(
            {
                id: UUID(),
                title: Sentence(5, 8),
                text: Sentences(Integer(3, 5)),
                createdAt: DateTime(new Date(2020, 1, 1), new Date()),
            },
            Integer(3, 5)
        ),
    },
    0
);

console.log(JSON.stringify(await person(), null, 2));
