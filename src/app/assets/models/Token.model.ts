export default interface IToken {
    value: string,
    expires: Date,
    valid: boolean,
    expiresTimer: NodeJS.Timeout
}