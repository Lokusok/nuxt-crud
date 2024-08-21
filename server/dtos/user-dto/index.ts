export default class UserDto {
  public name: string = ''
  public email: string = ''

  static check(dto: UserDto): dto is InstanceType<typeof UserDto> {
    console.log('This mine dto: ', dto)
    return dto.name.length > 0 && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/.test(dto.email)
  }
}
