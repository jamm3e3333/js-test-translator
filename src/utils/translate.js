const request = require('axios');

const translate = async (text, src_l, targ_l, cb) => {
    const url = `${process.env.END_POINT}?auth_key=${process.env.API_KEY}&text=${encodeURI(text)}&source_lang=${src_l}&target_lang=${targ_l}`;
    request.get(url)
         .then((response) => {
            return cb(undefined, response);
         })
         .catch((e) => {
             return cb(e, undefined);
         })
}

module.exports = translate;