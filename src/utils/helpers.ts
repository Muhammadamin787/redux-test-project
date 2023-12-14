import type { IPost, IUser, TypeOption } from "../types"

export function isInclude(property: string, keyword: string | number) {
     return property?.toLocaleLowerCase().includes(keyword.toString().toLocaleLowerCase())
}

export function byUserId(post: IPost, userIds: IUser["id"][]): boolean {
     return userIds.includes(post.userId)
}

export function makeUserOption(user: IUser): TypeOption {
     return { label: user.firstName, value: user.id }
}

export function sortByName(prevUser: IUser, nextUser: IUser) {
     return prevUser.firstName > nextUser.firstName ? 1 : -1
}

export function sortByLabel(prevUser: TypeOption, nextUser: TypeOption) {
     return prevUser.label > nextUser.label ? 1 : -1
}

export function makeUserOptions(users: IUser[]): TypeOption[] {
     return users.map(makeUserOption).sort(sortByLabel)
}