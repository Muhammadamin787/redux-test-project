import { IPost, IUser, TypeOption } from "../../types"

export const fakeUserIds = [1, 2, 3]
export const fakePost: IPost = {
     id: 1,
     userId: 1,
     body: "FakePost",
     title: "PostTitle",
}
export const fakePost2: IPost = {
     id: 2,
     userId: 2,
     body: "FakePost2",
     title: "PostTitle2",
}
export const fakeUser: IUser = {
     id: 1,
     firstName: "FakeUser",
}
export const fakeUser2: IUser = {
     id: 2,
     firstName: "FakeUser2",
}

export const fakeOption1: TypeOption = {
     label: "Option 1",
     value: 1
}
export const fakeOption2: TypeOption = {
     label: "Option 2",
     value: 2
}
