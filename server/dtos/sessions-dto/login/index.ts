export default class LoginDto {
  public username: string = ''
  public password: string = ''

  static check(dto: LoginDto): dto is InstanceType<typeof LoginDto> {
    const { username, password } = dto

    return username.length > 0 && password.length > 0
  }
}
