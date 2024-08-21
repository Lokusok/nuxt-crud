export default class RegisterDto {
  public username: string = ''
  public password: string = ''
  public passwordConfirm: string = ''

  static check(dto: RegisterDto): dto is InstanceType<typeof RegisterDto> {
    const { username, password, passwordConfirm } = dto

    const isNotEmpty = username.length > 0 && password.length > 0 && password.length > 0
    const isPasswordsEqual = (
      (password.length > 0 && passwordConfirm.length > 0) &&
      (password === passwordConfirm)
    )

    return isNotEmpty && isPasswordsEqual
  }
}