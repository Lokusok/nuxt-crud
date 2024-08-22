export default class UserDto {
  public name: string = ''
  public email: string = ''
  public avatar: string | null = null

  static check(dto: UserDto): dto is InstanceType<typeof UserDto> {
    return dto.name.length > 0 && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/.test(dto.email)
  }
}
