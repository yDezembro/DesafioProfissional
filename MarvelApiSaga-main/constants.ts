export default class Constants {
    static readonly PUBLIC_KEY= "19d68214456b4709862841b8bf5c8b04"
    static readonly TIME_STAMP="1714585124"
    static readonly HASH= "6435450be56332cd472ea9b36a05c816"

    static readonly MARVEL_API_PARAMS = `ts=${Constants.TIME_STAMP}&apikey=${Constants.PUBLIC_KEY}&hash=${Constants.HASH}`;

    static readonly MARVEL_API_URL = 'https://gateway.marvel.com/v1/public';

    static readonly DATABASE_URL = 'mongodb://127.0.0.1:27017/marvel-api';
}