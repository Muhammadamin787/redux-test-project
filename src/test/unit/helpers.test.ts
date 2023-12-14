import { describe, expect, it } from "vitest";
import { byUserId, isInclude, makeUserOption, makeUserOptions, sortByLabel, sortByName } from '../../utils/helpers';
import { fakeOption1, fakeOption2, fakePost, fakeUser, fakeUser2, fakeUserIds } from "./FakeData";

describe("Helper Functions", () => {

     it.each([
          { text: "Searching key", key: "KEY", result: true },
          { text: "Searching key", key: "NO", result: false },
     ])('$key isIncludes in $text', ({ text, key, result }) => {
          expect(isInclude(text, key)).toBe(result)
     })

     it("byUserId", () => {
          const isInclude1 = byUserId(fakePost, fakeUserIds)
          const isInclude2 = byUserId(fakePost, [])

          expect(isInclude1).toBeTruthy()
          expect(isInclude2).toBeFalsy()
     })
     it("makeUserOption", () => {
          const userOption = makeUserOption(fakeUser)

          expect(userOption).toMatchObject({
               label: fakeUser.firstName,
               value: fakeUser.id
          })
     })
     it("sortByName", () => {
          const sortNumber = sortByName(fakeUser, fakeUser2)

          expect(sortNumber).not.toBe(0)
          expect(sortNumber).toBe(-1)
     })
     it("sortByLabel", () => {
          const sortNumber = sortByLabel(fakeOption1, fakeOption2)

          expect(sortNumber).not.toBe(0)
          expect(sortNumber).toBe(-1)
     })
     it("makeUserOptions", () => {
          const userOptions = makeUserOptions([fakeUser, fakeUser2])

          expect(userOptions).toMatchObject([
               makeUserOption(fakeUser2),
               makeUserOption(fakeUser),
          ].sort(sortByLabel))
     })
})