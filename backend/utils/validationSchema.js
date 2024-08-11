const createUserValidation = {
    username: {
        notEmpty: true,
        isString: {
            errorMessage: 'User name must be a string',
        },
        isLength: {
            options: {
                min: 2,
                max: 40,
            },
            errorMessage: 'User name should be between 2 and 40 characters',
        },
    },
    password: {
        notEmpty: true,
        isString: {
            errorMessage: 'Password must be a string',
        },
        isLength: {
            options: {
                min: 4,
            },
            errorMessage: 'Password must be at least 4 characters long',
        },
    },
    age: {
        isInt: true,
    },
    
}

const getUsersValidation = {
    filter: {
        optional: true,
        isIn: {
            options: [['username', 'id', 'age']],
        },
        errorMessage: 'Filter by username, id, age',
    },
}

const createPostValidation = {
    title: {
        notEmpty: {
            errorMessage: 'Post should have a title',
        },
        isString: {
            errorMessage: 'Title must be a string',
        },
        isLength: {
            options: {
                min: 3,
            },
            errorMessage: 'Provide a title longer than 3 characters',
        },
    },
    body: {
        notEmpty: {
            errorMessage: 'Provide a post body',
        },
    },
    userId: {
        notEmpty: {
            errorMessage: 'Post must belong to a user',
        },
    },
}

export { createPostValidation, createUserValidation, getUsersValidation };