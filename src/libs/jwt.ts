import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

export const createAccessToken = async (payload: object) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, { expiresIn: '15m' }, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
};

